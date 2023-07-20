const axios = require("axios");
const { Dog } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds/";

const getBreed = async (id) => {
  let breed = "";
  if (Number(id)) {
    // Si el id es convertive a numero, busca en la API
    const { data } = await axios(`${URL}${id}`);
    breed = {
      id: data.id,
      name: data.name,
      image:
        "https://cdn2.thedogapi.com/images/" + data.reference_image_id + ".jpg",
      height: data.height.metric,
      weight: data.weight.metric,
      life_span: data.life_span,
    };
  }
  if (!Number(id) && id.length === 35) {
    //Si el id no es convertible a numero, entonces busca en la BD
    breed = await Dog.findOne({ where: { id } });
    breed = breed.dataValues;
  }

  if (Object.keys(breed).length) {
    return breed;
  } else {
    throw new Error("There are no breeds matching the requested ID");
  }
};

module.exports = getBreed;
