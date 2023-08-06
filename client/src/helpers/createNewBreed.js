import axios from "axios";
import { URL_DEV, URL_PROD } from "../fakeEnv";

const URL = URL_DEV;

const createNewBreed = async ({
  name,
  image,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  const endpoint = `${URL}/dogs`;

  try {
    const { data } = await axios.post(endpoint, {
      name,
      image,
      height,
      weight,
      life_span,
      temperaments,
    });
    return data;
  } catch (error) {
    return alert(error.response.data.error);
  }
};

export default createNewBreed;
