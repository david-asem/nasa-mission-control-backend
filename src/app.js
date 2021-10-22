const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { planetsRouter } = require('./routes/planets/planetsRouter');
const {launchesRouter} = require('./routes/launches/launchesRouter');

//JSON parsing middleware
const app = express();

app.use(cors({
  origin:'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/api/v1/planets', planetsRouter);
app.use('/api/v1/launches',launchesRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


module.exports = app;