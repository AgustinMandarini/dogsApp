const validateCreateNewBreed = (req, res, next) => {
  const { name, image, height, weight, life_span } = req.body;

  if (!name || name.length === 0 || typeof name !== "string") {
    return res.status(400).json({ error: "Missing breed name" });
  }
  if (!image || image.length === 0 || typeof image !== "string") {
    return res.status(400).json({ error: "Missing image" });
  }
  console.log(height);
  console.log(height.length);
  console.log(height.split(" - ")[1] - height.split(" - ")[0] <= 0);
  if (
    height.includes("null") ||
    height.length === 0 ||
    typeof height !== "string" ||
    height.split(" - ")[1] - height.split(" - ")[0] <= 0
  ) {
    return res.status(400).json({ error: "Height has incorrect values" });
  }

  if (
    weight.includes("null") ||
    weight.length === 0 ||
    typeof weight !== "string" ||
    weight.split(" - ")[1] - weight.split(" - ")[0] <= 0
  ) {
    return res.status(400).json({ error: "Weight has incorrect values" });
  }
  if (
    life_span.includes("null") ||
    life_span.length === 0 ||
    typeof life_span !== "string" ||
    life_span.split(" - ")[1] - life_span.split(" - ")[0] <= 0
  ) {
    return res.status(400).json({ error: "Life span has incorrect values" });
  }

  next();
};

module.exports = validateCreateNewBreed;
