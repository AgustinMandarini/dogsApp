const { Router } = require("express");
const getAllBreeds = require("../controllers/getAllBreeds");
const getBreedById = require("../controllers/getBreedById");
const createBreed = require("../controllers/createBreed");
const getTemperaments = require("../controllers/getTemperaments");
const getBreedByName = require("../controllers/getBreedByName");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
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

router.get("/dogs/search", async (req, res) => {
  const { name } = req.query;
  try {
    const breed = await getBreedByName(name);
    res.status(200).json(breed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const breed = await getBreedById(id);
    res.status(200).json(breed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/dogs", async (req, res) => {
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

router.get("/temperaments", async (req, res) => {
  try {
    await getTemperaments();
    res.status(200).json({ response: "Bulk of temperaments created!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
