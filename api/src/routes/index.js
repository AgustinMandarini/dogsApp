const { Router } = require("express");
const getDogs = require("../constrollers/getDogs");
const getBreed = require("../constrollers/getBreed");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  try {
    const breeds = await getDogs();
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

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const breed = await getBreed(id);
    res.status(200).json(breed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
