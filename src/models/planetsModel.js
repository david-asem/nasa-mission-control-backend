const parse = require('csv-parse');
const fs = require('fs');
const { resolve } = require('path');

const habitablePlanets = [];


function readInPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/kepler_data.csv')
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data);
        }
    
      }).on('error', (err) => {
        console.log('err');
        reject(err)
      }).on('end', () => {
        console.log(`There are ${habitablePlanets.length} habitable planets found!!`)
          resolve();
    
      });
  });
}


function isHabitable(planet){
  return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    &&planet['koi_prad']<1.6;
  
}

  
module.exports = {
    planets:habitablePlanets,
  }