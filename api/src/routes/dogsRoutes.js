const { Router } = require("express");
const dogsRouter = Router();

const getAllBreeds = require("../controllers/getAllBreeds");
const getBreedById = require("../controllers/getBreedById");
const createBreed = require("../controllers/createBreed");
const getBreedByName = require("../controllers/getBreedByName");

dogsRouter.get("", async (req, res) => {
  try {
    const breeds = await getAllBreeds();
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
});

dogsRouter.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const breed = await getBreedByName(name);
    res.status(200).json(breed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const breed = await getBreedById(id);
    res.status(200).json(breed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

dogsRouter.post("", async (req, res) => {
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
});

module.exports = dogsRouter;
