const axios = require("axios");
const { Dog } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds";

const getAllBreeds = async () => {
  const { data } = await axios(URL);

  // Obtiene todos los perros de la API
  const breedsAPINames = data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      image: breed.image.url,
      height: breed.height.metric,
      weight: breed.weight.metric,
      life_span: breed.life_span,
      temperament: breed.temperament,
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
  // Los temperamentos son guardados inicialmente como un array de strings, en la ruta POST /dogs
  // Aqui, iteramos sobre cada uno de los perros/breeds y utilizamos el index para acceder a cada array de temperamentos
  // Finalemnte, transformamos ese array en string para que quede exactamente con el mismo formato que devuelve la API
  breedsDB.forEach((breed, index) => {
    if (breedsTemperaments[index].length) {
      breed.dataValues.temperament = breedsTemperaments[index]
        .map((temp) => temp.dataValues.name)
        .join(", ");
    }
  });

  return [...breedsAPINames, ...breedsDB];
};

module.exports = getAllBreeds;
