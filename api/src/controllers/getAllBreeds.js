const axios = require("axios");
const { Dog } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds";

const getAllBreeds = async () => {
  const { data } = await axios(URL);
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

  const breedsDB = await Dog.findAll();

  const breedsTemperaments = await Promise.all(
    breedsDB.map(async (breed) => await breed.getTemperaments())
  );

  breedsDB.forEach((breed, index) => {
    if (breedsTemperaments[index].length) {
      // console.log(breedsTemperaments[index]);
      breed.dataValues.temperament = breedsTemperaments[index]
        .map((temp) => temp.dataValues.name)
        .join(", ");
      // console.log(breed.dataValues.name);
      // console.log(breed.dataValues.temperament.join(", "));
    } else {
      breed.dataValues.temperament = [];
    }
  });

  return [...breedsAPINames, ...breedsDB];
};

module.exports = getAllBreeds;
