const { Dog } = require("../db");
const { Temperament } = require("../db");

const createBreed = async ({
  name,
  image,
  height,
  weight,
  life_span,
  temperaments,
}) => {
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
    // Crea una nueva raza, sin agregar aun el temperamento, que sera una relacion manyToMany con la
    // tabla Temperaments
    const newDog = await Dog.create({ name, image, height, weight, life_span });

    // Busca los registros de la tabla Temperaments que coincidan con los pasados por body, iterando sobre
    // el array contenido en la variable temperaments, y asociando uno por uno a la nueva raza creada

    temperaments.forEach(async (temp) => {
      newDog.addTemperament(
        await Temperament.findOne({
          where: { name: temp },
        })
      );
    });

    return newDog;
  } else {
    throw new Error("Insufficient data, or data type is incorrect");
  }
};

module.exports = createBreed;
