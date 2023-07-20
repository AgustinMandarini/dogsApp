const { Dog } = require("../db");

const createDog = async ({ name, image, height, weight, life_span }) => {
  if (
    name.length &&
    typeof name === "string" &&
    image.length &&
    typeof image === "string" &&
    height.length &&
    typeof height === "string" &&
    weight.length &&
    typeof weight === "string" &&
    life_span.length &&
    typeof life_span === "string"
  ) {
    const newDog = await Dog.create({ name, image, height, weight, life_span });
    return newDog;
  } else {
    throw new Error("Insufficient data, or data type is incorrect");
  }
};

module.exports = createDog;
