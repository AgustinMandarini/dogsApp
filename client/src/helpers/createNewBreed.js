import axios from "axios";
const REACT_APP_API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

const createNewBreed = async ({
  name,
  image,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  const endpoint = `${REACT_APP_API_SERVER_URL}/dogs`;
  const breedObject = {
    name,
    image,
    height,
    weight,
    life_span,
    temperaments,
  };
  try {
    const { data } = await axios.post(endpoint, breedObject);
    window.alert("Breed succesfully created!"); // Si no atrapa ningun error en la response del back, envia mensaje de exito al front
    return data;
  } catch (error) {
    return alert(error.response.data.error); // Captura el error ocurrido en la validacion del back
  }
};

export default createNewBreed;
