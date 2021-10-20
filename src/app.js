const express = require('express');
const planetsRouter=require('./routes/planets/planetsRouter.js')


//JSON parsing middleware
const app = express();
app.use(express.json());
app.use(planetsRouter);

module.exports = app;