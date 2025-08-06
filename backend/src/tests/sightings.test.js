const request = require('supertest');
const app = require('../server');

describe('Sightings API', () => {
  describe('GET /api/sightings', () => {
    it('should return all sightings', async () => {
      const res = await request(app).get('/api/sightings');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/sightings', () => {
    it('should create a new sighting with valid data', async () => {
      const sightingData = {
        species: 'African Elephant',
        location: { lat: -24.7761, lng: 25.8569 },
        observer: 'Test Guide',
        observerRole: 'guide', 
        notes: 'Large bull elephant'
      };

      const res = await request(app)
        .post('/api/sightings')
        .send(sightingData);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.species).toBe('African Elephant');
    });

    it('should return validation error for missing species', async () => {
      const invalidData = {
        location: { lat: -24.7761, lng: 25.8569 },
        observer: 'Test Guide'
      };

      const res = await request(app)
        .post('/api/sightings')
        .send(invalidData);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});

describe('Health Check', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});