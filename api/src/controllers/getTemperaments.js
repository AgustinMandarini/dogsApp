const { Temperament } = require("../db");
const axios = require("axios");

const URL = "https://api.thedogapi.com/v1/breeds";

const getTemperaments = async () => {
  const { data } = await axios(URL);
  const temperaments = data.map((breed) => {
    return {
      name: breed.temperament,
    };
  });

  // Itera sobre cada lista de temperamentos obtenidos desde la API, los separa por coma y espacio ', '
  // y luego va actualizando con spread operator el arreglo allTemperaments inicialmente vacio
  // quedando un temperamento por cada indice del array
  let allTemperaments = [];
  temperaments.forEach((temp) => {
    if (temp.name) {
      allTemperaments = [...allTemperaments, ...temp.name.split(", ")];
    }
  });

  // Luego, a continuacion, se filtran los temperamentos repetidos, actualizando el array allTemperaments
  allTemperaments = allTemperaments.filter(
    (temp, index) => allTemperaments.indexOf(temp) === index
  );

  // Finalmente, se agregan uno por uno los temperamento a la base de datos
  allTemperaments.forEach((temp) => {
    Temperament.findOrCreate({ where: { name: temp } });
  });

  return allTemperaments.sort();
};

module.exports = getTemperaments;
