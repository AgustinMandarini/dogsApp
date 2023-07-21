const { Router } = require("express");
const temperamentsRouter = Router();

const getTemperaments = require("../controllers/getTemperaments");

temperamentsRouter.get("", async (req, res) => {
  try {
    await getTemperaments();
    res.status(200).json({ response: "Bulk of temperaments created!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = temperamentsRouter;
