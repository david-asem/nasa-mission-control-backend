const express = require('express');

const planetsRouter = express.Router();

planetsRouter.get('/api/v1/planets', getAllPlanets);
module.exports = planetsRouter;