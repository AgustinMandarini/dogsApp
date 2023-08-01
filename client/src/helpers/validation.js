const validation = (userData) => {
  // Esta regex acepta todo el alfabeto may y min de la a-z, el caracter "-" y todos los caracteres
  // especiales de todos los idiomas, como ñ, acentos, y demas
  const regexName = /^[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\-]+$/gu;

  let errors = {};

  // Estas variables establecen valores maximos y minimos por default
  const MIN_HEIGHT = 5;
  const MAX_HEIGHT = 100;
  const MIN_WEIGHT = 1;
  const MAX_WEIGHT = 100;
  const MIN_LIFE_SPAN = 1;
  const MAX_LIFE_SPAN = 50;

  // Estas variables parsean los valores ingresados por el usuario a int para poder compararlos entre si en la validacion
  const parsed_min_height = parseInt(userData.min_height);
  const parsed_max_height = parseInt(userData.max_height);
  const parsed_min_weight = parseInt(userData.min_weight);
  const parsed_max_weight = parseInt(userData.max_weight);
  const parsed_min_life_span = parseInt(userData.min_life_span);
  const parsed_max_life_span = parseInt(userData.max_life_span);

  if (!userData.name) {
    errors.name = "Breed name is required";
  } else if (!regexName.test(userData.name)) {
    errors.name = "Only alphabets are allowed";
  } else if (userData.name.length > 40) {
    errors.name = "Breed name max size is 40 characters";
  }

  if (!parsed_min_height) {
    errors.min_height = "Must provide a min height.";
  } else if (parsed_min_height < MIN_HEIGHT) {
    errors.min_height = `Height cannot be less than ${MIN_HEIGHT}`;
  } else if (parsed_min_height > parsed_max_height) {
    errors.min_height = "Min cannot be higher or equal to max";
  }

  if (!parsed_max_height) {
    errors.max_height = "Must provide a max height.";
  } else if (parsed_max_height > MAX_HEIGHT) {
    errors.max_height = `Height cannot be more than ${MAX_HEIGHT}`;
  } else if (parsed_max_height < parsed_min_height) {
    errors.max_height = "Max cannot be lower or equal to min";
  }

  if (!parsed_min_weight) {
    errors.min_weight = "Must provide a min weight.";
  } else if (parsed_min_weight < MIN_WEIGHT) {
    errors.min_weight = `Weight cannot be less than ${MIN_WEIGHT}`;
  } else if (parsed_min_weight >= parsed_max_weight) {
    errors.min_weight = "Min cannot be higher or equal to max";
  }

  if (!parsed_max_weight) {
    errors.max_weight = "Must provide a max weight.";
  } else if (parsed_max_weight > MAX_WEIGHT) {
    errors.max_weight = `Weight cannot be more than ${MAX_WEIGHT}`;
  } else if (parsed_max_weight <= parsed_min_weight) {
    errors.max_weight = "Max cannot be lower or equal to min";
  }

  if (!parsed_min_life_span) {
    errors.min_life_span = "Must provide a min life_span.";
  } else if (parsed_min_life_span < MIN_LIFE_SPAN) {
    errors.min_life_span = `life_span cannot be less than ${MIN_LIFE_SPAN}`;
  } else if (parsed_min_life_span >= parsed_max_life_span) {
    errors.min_life_span = "Min cannot be higher or equal to max";
  }

  if (!parsed_max_life_span) {
    errors.max_life_span = "Must provide a max life_span.";
  } else if (parsed_max_life_span > MAX_LIFE_SPAN) {
    errors.max_life_span = `life_span cannot be more than ${MAX_LIFE_SPAN}`;
  } else if (parsed_max_life_span <= parsed_min_life_span) {
    errors.max_life_span = "Max cannot be lower or equal to min";
  }

  // La funcion some devuelve true si algun temp se encuentra duplicado en el array temperaments

  if (
    userData.temperaments.some((temp, index) => {
      return userData.temperaments.indexOf(temp) !== index;
    })
  ) {
    errors.temperaments = "Cannot have duplicated temperaments";
  }

  return errors;
};

export default validation;
