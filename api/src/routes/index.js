const { Router } = require("express");
const dogsRouter = require("./dogsRoutes");
const temperamentsRouter = require("./temperamentsRoutes");
const router = Router();

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);

module.exports = router;
