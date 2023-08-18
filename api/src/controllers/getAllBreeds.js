const axios = require("axios");
const { Dog } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds";

const getAllBreeds = async (name) => {
  const { data } = await axios(URL);

  // Obtiene todos los perros de la API
  const breedsAPINames = data.map((breed) => {
    // Separa los valores de peso max y min que son string, los pasa a numeros y calcula el promedio
    // avgWeight solo sera utilizada por el fron para los filtros, pero no se renderizara
    let avgWeight = "Not specified";

    if (breed.weight.imperial.split(" - ").length === 1) {
      avgWeight = Number(breed.weight.metric.split(" - ")[0]);
    } else {
      avgWeight =
        (Number(breed.weight.metric.split(" - ")[0]) +
          Number(breed.weight.metric.split(" - ")[1])) /
        2;
    }
    return {
      id: breed.id,
      name: breed.name,
      image:
        "https://cdn2.thedogapi.com/images/" +
        breed.reference_image_id +
        ".jpg", // image: breed.image.url anteriormente funcionaba asi
      height: breed.height.metric,
      weight: breed.weight.metric,
      life_span: breed.life_span,
      avgWeight: avgWeight,
      temperament: breed.temperament ? breed.temperament : [], // Esto es para corregir que algunas breeds vienen sin temperamento
    };
  });

  // Obtiene todos los perros/razas guardados en la base de datos
  const breedsDB = await Dog.findAll();

  // Obtiene todos los temperamentos asociados a cada uno de los perros/razas.
  // Se utilizo Promise.all para resolver todas las promesas que son primeramente guardadas en el arreglo
  const breedsTemperaments = await Promise.all(
    breedsDB.map(async (breed) => await breed.getTemperaments())
  );

  // Crea una nueva propiedad "temperament" donde guarda un string que es una lista de cada uno de esos temperamentos
  // Como los temperamentos son guardados inicialmente como un array de strings en la ruta POST /dogs, es por eso que
  // aqui iteramos sobre cada uno de los perros/breeds y utilizamos el index para acceder a cada array de temperamentos
  // Finalemnte transformamos ese array en string para que quede exactamente con el mismo formato que devuelve la API
  breedsDB.forEach((breed, index) => {
    // Separa los valores de peso max y min que son string, los pasa a numeros y calcula el promedio
    // avgWeight solo sera utilizada por el fron para los filtros, pero no se renderizara
    breed.dataValues.avgWeight =
      (Number(breed.weight.split(" - ")[0]) +
        Number(breed.weight.split(" - ")[1])) /
      2;
    if (breedsTemperaments[index].length) {
      breed.dataValues.temperament = breedsTemperaments[index]
        .map((temp) => temp.dataValues.name)
        .join(", ");
    } else {
      // Si la raza fue creada sin temperamento o viene de la API sin el, crea un array vacio para esa propiedad
      breed.dataValues.temperament = [];
    }
  });

  breedsDB.sort((a, b) => {
    const nameA = a.dataValues.name.toLowerCase();
    const nameB = b.dataValues.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const allBreeds = [...breedsAPINames, ...breedsDB];

  if (name) {
    return allBreeds.filter((breed) =>
      breed.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return allBreeds;
};

module.exports = getAllBreeds;
