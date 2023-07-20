const axios = require("axios");
const { Dog } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds/search?q=";

const getBreedByName = async (name) => {
  const breedDB = await Dog.findOne({ where: { id } });

  const { data } = await axios(`${URL}${name}`);

  const breedAPIName = {
    id: data.id,
    name: data.name,
    image:
      "https://cdn2.thedogapi.com/images/" + data.reference_image_id + ".jpg",
    height: data.height.metric,
    weight: data.weight.metric,
    life_span: data.life_span,
  };

  if (breedDB) {
    return breedDB;
  }
  console.log(data);
  if (Object.keys(data).length) {
    return breedAPIName;
  }

  throw new Error("There are no breeds matching the requested name");
};

module.exports = getBreedByName;
