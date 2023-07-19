const axios = require("axios");
const { Dog } = require("../db");

// const getDogsAPI = () => {
//   return axios("https://api.thedogapi.com/v1/breeds")
//     .then((response) => response.data.map((breed) => breed.name))

//     .catch((error) => {
//       throw new Error("Error while obtaining data from API");
//     });
// };

// const getDogsDB = () => {
//   return Dog.findAll({ attributes: ["name"] })
//     .then((response) => response.map((breed) => breed.name))
//     .catch((error) => {
//       throw new Error("Error while obtaining data from database");
//     });
// };

const getDogs = async () => {
  //   return Promise.all([getDogsAPI(), getDogsDB()])
  //     .then((data) => data.flat())
  //     .catch((error) => {
  //       console.log("Internal server error");
  //     });

  const breedsAPI = await axios("https://api.thedogapi.com/v1/breeds");
  const breedsAPINames = breedsAPI.data.map((breed) => breed);

  const breedsDB = await Dog.findAll();
  const breedsDBNames = breedsDB.map((breed) => breed);

  return [...breedsAPINames, ...breedsDBNames];
};

module.exports = getDogs;
