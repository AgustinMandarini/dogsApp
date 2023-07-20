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
    };
  });

  const breedsDB = await Dog.findAll();
  const breedsDBNames = breedsDB.map((breed) => breed);

  return [...breedsAPINames, ...breedsDBNames];
};

module.exports = getAllBreeds;
