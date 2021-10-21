const express = require('express');
const {getAllPlanets}=require('./planetsController')

const planetsRouter = express.Router();

planetsRouter.get('/api/v1/planets', getAllPlanets);
module.exports = planetsRouter;