const axios = require("axios");
const { Dog } = require("../db");

const getBreed = async (id) => {
  const breedDB = await Dog.findOne({ where: { id } });

  const { data } = await axios(`https://api.thedogapi.com/v1/breeds/${id}`);

  if (breedDB) {
    return breedDB;
  } else if (Object.keys(data).length) {
    return data;
  } else {
    throw new Error("There are no breeds matching the requested ID");
  }
};

module.exports = getBreed;
