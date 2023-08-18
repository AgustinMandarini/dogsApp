import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments } from "../../redux/actions/actions";
import createNewBreed from "../../helpers/createNewBreed";
import style from "./NewBreedForm.module.css";
import validation from "../../helpers/validation.js";

const NewBreedForm = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [userData, setUserData] = useState({
    name: "",
    min_height: null,
    max_height: null,
    min_weight: null,
    max_weight: null,
    min_life_span: null,
    max_life_span: null,
    temperaments: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_life_span: "",
    max_life_span: "",
    temperaments: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const updatedTemps = [...userData.temperaments];

    // Si el usuario selecciona un temperamento, y si este no es existente, agrega uno nuevo
    if (event.target.name === "temperaments") {
      if (!updatedTemps.includes(value)) {
        updatedTemps.push(value);
      }
    }

    setUserData({
      ...userData,
      [property]: value,
      temperaments: updatedTemps,
    });

    setErrors(
      validation({
        ...userData,
        [property]: value,
        temperaments: updatedTemps,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createNewBreed({
      name: userData.name,
      image: userData.image,
      height: `${userData.min_height} - ${userData.max_height}`,
      weight: `${userData.min_weight} - ${userData.max_weight}`,
      life_span: `${userData.min_life_span} - ${userData.max_life_span}`,
      temperaments: userData.temperaments,
    });
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={style.form}>
          <h1 className={style.createNewBreedTitle}>Create New Breed</h1>
          <div className={style.leftAndRightContainer}>
            <div className={style.leftContainer}>
              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="name">
                  Breed's Name:
                </label>
                <input
                  onChange={handleChange}
                  className={
                    errors.name ? style.inputInvalid : style.inputValid
                  }
                  type="text"
                  name="name"
                  placeholder="Golden Retriever, Bulldog, etc..."
                  value={userData.name}
                />
                <span className={style.errorSpan}>
                  {errors.name ? errors.name : null}
                </span>
              </div>

              <div className={style.inputPairsContainer}>
                <div className={style.labelInputSpan}>
                  <label className={style.label} htmlFor="min_height">
                    Min Height
                  </label>

                  <input
                    onChange={handleChange}
                    className={
                      errors.min_height ? style.inputInvalid : style.inputValid
                    }
                    type="number"
                    name="min_height"
                    placeholder="0"
                    value={userData.min_height}
                  />
                  <span className={style.errorSpan}>
                    {errors.min_height ? errors.min_height : null}
                  </span>
                </div>
                <div className={style.labelInputSpan}>
                  <label className={style.label} htmlFor="max_height">
                    Max Height
                  </label>
                  <input
                    onChange={handleChange}
                    className={
                      errors.max_height ? style.inputInvalid : style.inputValid
                    }
                    type="number"
                    name="max_height"
                    placeholder="0"
                    value={userData.max_height}
                  />
                  <span className={style.errorSpan}>
                    {errors.max_height ? errors.max_height : null}
                  </span>
                </div>
              </div>

              <div className={style.inputPairsContainer}>
                <div className={style.labelInputSpan}>
                  <label className={style.label} htmlFor="min_weight">
                    Min Weight
                  </label>
                  <input
                    onChange={handleChange}
                    className={
                      errors.min_weight ? style.inputInvalid : style.inputValid
                    }
                    type="number"
                    name="min_weight"
                    placeholder="0"
                    value={userData.min_weight}
                  />
                  <span className={style.errorSpan}>
                    {errors.min_weight ? errors.min_weight : null}
                  </span>
                </div>
                <div className={style.labelInputSpan}>
                  <label className={style.label} htmlFor="max_weight">
                    Max Weight
                  </label>
                  <input
                    onChange={handleChange}
                    className={
                      errors.max_weight ? style.inputInvalid : style.inputValid
                    }
                    type="number"
                    name="max_weight"
                    placeholder="0"
                    value={userData.max_weight}
                  />
                  <span className={style.errorSpan}>
                    {errors.max_weight ? errors.max_weight : null}
                  </span>
                </div>
              </div>

              <div className={style.inputPairsContainer}>
                <div className={style.labelInputSpan}>
                  <label className={style.label} htmlFor="min_life_span">
                    Min Life Span
                  </label>
                  <input
                    onChange={handleChange}
                    className={
                      errors.min_life_span
                        ? style.inputInvalid
                        : style.inputValid
                    }
                    type="number"
                    name="min_life_span"
                    placeholder="0"
                    value={userData.min_life_span}
                  />
                  <span className={style.errorSpan}>
                    {errors.min_life_span ? errors.min_life_span : null}
                  </span>
                </div>
                <div className={style.labelInputSpan}>
                  <label className={style.label} htmlFor="max_life_span">
                    Max Life Span
                  </label>
                  <input
                    onChange={handleChange}
                    className={
                      errors.max_life_span
                        ? style.inputInvalid
                        : style.inputValid
                    }
                    type="number"
                    name="max_life_span"
                    placeholder="0"
                    value={userData.max_life_span}
                  />
                  <span className={style.errorSpan}>
                    {errors.max_life_span ? errors.max_life_span : null}
                  </span>
                </div>
              </div>

              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="temperaments">
                  Temperaments
                </label>
                <select
                  onChange={handleChange}
                  className={
                    errors.temperaments ? style.inputInvalid : style.inputValid
                  }
                  name="temperaments"
                >
                  {allTemperaments.map((temp) => {
                    return <option value={temp}>{temp}</option>;
                  })}
                </select>
                <span className={style.errorSpan}>
                  {errors.temperaments ? errors.temperaments : null}
                </span>
              </div>
            </div>
            <div className={style.rightContainer}>
              <label className={style.label} htmlFor="temperaments">
                Image
              </label>
              <input
                onChange={handleChange}
                className={errors.image ? style.inputInvalid : style.inputValid}
                type="string"
                name="image"
                placeholder="Place a URL for your image"
                value={userData.image}
              />
              <div className={style.imgContainer}>
                <img
                  className={style.img}
                  alt="img"
                  name="image"
                  src={userData.image}
                ></img>
              </div>
            </div>
          </div>
          <button
            className={style.button}
            name="createNewBreedButton"
            disabled={Object.keys(errors).length > 0} // Si el estado errors, que es un objeto, no esta vacio, entonces deshabilita el boton
          >
            CREATE NEW BREED
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBreedForm;
