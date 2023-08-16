const getAllBreeds = require("../controllers/getAllBreeds");
const getBreedById = require("../controllers/getBreedById");
const createBreed = require("../controllers/createBreed");
const getBreedByName = require("../controllers/getBreedByName");

const getAllBreedsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const breeds = await getAllBreeds(name);
    res.status(200).json(breeds);
  } catch (error) {
    if (error.message === "Error while obtaining data from API") {
      res.status(500).json({ error: error.message });
    } else if (error.message === "Error while obtaining data from database") {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getBreedByNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const breed = await getBreedByName(name);
    res.status(200).json(breed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBreedByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const breed = await getBreedById(id);
    res.status(200).json(breed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createBreedHandler = async (req, res) => {
  const { name, image, height, weight, life_span, temperaments } = req.body;
  try {
    const newDog = await createBreed({
      name,
      image,
      height,
      weight,
      life_span,
      temperaments,
    });
    res.status(200).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBreedsHandler,
  getBreedByIdHandler,
  getBreedByNameHandler,
  createBreedHandler,
};
