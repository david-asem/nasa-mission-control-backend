const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter=require('./routes/planets/planetsRouter.js')

//JSON parsing middleware
const app = express();

app.use(cors({
  origin:'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//setting default route to index,html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})
//lauch route
app.get('/launch', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.use(planetsRouter);

module.exports = app;