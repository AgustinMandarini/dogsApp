const { Router } = require("express");
const dogsRouter = Router();
const validateCreateNewBreed = require("../middleware/validateCreateNewBreed");
const {
  getAllBreedsHandler,
  getBreedByIdHandler,
  getBreedByNameHandler,
  createBreedHandler,
} = require("../handlers/breedsHandlers");

dogsRouter.get("", getAllBreedsHandler);

dogsRouter.get("/search", getBreedByNameHandler);

dogsRouter.get("/:id", getBreedByIdHandler);

dogsRouter.post("", validateCreateNewBreed, createBreedHandler);

module.exports = dogsRouter;
