const {
  getAllBreedsHandler,
  getBreedByIdHandler,
  getBreedByNameHandler,
  createBreedHandler,
} = require("../handlers/breedsHandlers");
const { Router } = require("express");
const dogsRouter = Router();

dogsRouter.get("", getAllBreedsHandler);

dogsRouter.get("/search", getBreedByNameHandler);

dogsRouter.get("/:id", getBreedByIdHandler);

dogsRouter.post("", createBreedHandler);

module.exports = dogsRouter;
