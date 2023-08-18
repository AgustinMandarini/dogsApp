const axios = require("axios");
const { Dog } = require("../db");
const { Op } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds/search?q=";

const getBreedByName = async (name) => {
  const breedDB = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: name + "%",
      },
    },
  });

  if (breedDB) return [breedDB];

  const { data } = await axios(`${URL}${name}`);

  if (Object.keys(data).length) {
    const breedAPIName = {
      id: data[0].id,
      name: data[0].name,
      image:
        "https://cdn2.thedogapi.com/images/" +
        data[0].reference_image_id +
        ".jpg",
      height: data[0].height.metric,
      weight: data[0].weight.metric,
      life_span: data[0].life_span,
    };
    return [breedAPIName];
  }

  throw new Error("There are no breeds matching the requested name");
};

module.exports = getBreedByName;
