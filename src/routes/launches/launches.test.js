const request = require('supertest');

const app = require('../../app');


//testing the get endpoint
describe('TEST GET /api/v1/launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app).get('/api/v1/launches').expect('Content-Type', /json/).expect(200);
  });
});

describe('TEST POST /api/v1/launches', () => {
  const completeLaunchData = {
    missionName: 'Star Trek Enterprise',
    rocketType: 'Dragon 1',
    destinationPlanet: 'Kepler 442 b',
    launchDate: '23 June, 2030'
  };

  const launchDataWithoutDate = {
    missionName: 'Star Trek Enterprise',
    rocketType: 'Dragon 1',
    destinationPlanet: 'Kepler 442 b',
  };

  const InvalidlaunchData = {
    missionName: 'Star Trek Enterprise',
    rocketType: 'Dragon 1',
    destinationPlanet: 'Kepler 442 b',
    launchDate: '23 2030 f'
  };


  test('It should respond with 201 created', async () => {
    const res = await request(app).post('/api/v1/launches').send(completeLaunchData).expect('Content-Type', /json/)
      .expect(201);
    
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(res.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(res.body).toMatchObject(launchDataWithoutDate);

  });
  test('Should catch missing required info', async () => {
    const res = await request(app).post('/api/v1/launches').send(launchDataWithoutDate).expect('Content-Type', /json/)
      .expect(400);
    
    expect(res.body).toStrictEqual({
      Error: 'Missing required launch info',
    })
  });


    test('Should catch invalid date', async () => {
      const res = await request(app).post('/api/v1/launches').send(InvalidlaunchData).expect('Content-Type', /json/)
        .expect(400);
      
      expect(res.body).toStrictEqual({
        Error: 'Invalid launch date',
      });
    });
});