const express = require('express');
const { body, validationResult, query } = require('express-validator');
const router = express.Router();

// Mock data for baseline version (later we'll replace with database)
let sightings = [
  {
    id: 1,
    species: 'African Lion',
    location: { 
      lat: -24.7761, 
      lng: 25.8569,
      name: 'Waterhole Alpha'
    },
    timestamp: new Date('2025-07-01T06:30:00Z').toISOString(),
    observer: 'Guide John Msimanga',
    observerRole: 'guide',
    notes: 'Pride of 5 lions (2 adults, 3 cubs) drinking at waterhole. Lioness appeared protective of cubs.',
    photos: [],
    weatherConditions: 'Clear, 18°C',
    groupSize: 5,
    behavior: 'drinking',
    verified: true
  },
  {
    id: 2,
    species: 'African Elephant',
    location: { 
      lat: -24.7850, 
      lng: 25.8650,
      name: 'Marula Grove'
    },
    timestamp: new Date('2025-07-01T15:45:00Z').toISOString(),
    observer: 'Guest Sarah Wilson',
    observerRole: 'guest',
    notes: 'Large bull elephant feeding on marula fruits. Estimated age 40+ years.',
    photos: [],
    weatherConditions: 'Partly cloudy, 28°C',
    groupSize: 1,
    behavior: 'feeding',
    verified: false
  }
];

// Validation rules
const sightingValidation = [
  body('species')
    .notEmpty()
    .withMessage('Species is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Species name must be between 2 and 100 characters'),
  
  body('location.lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('location.lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('observer')
    .notEmpty()
    .withMessage('Observer name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Observer name must be between 2 and 100 characters'),
  
  body('observerRole')
    .isIn(['guide', 'guest', 'researcher'])
    .withMessage('Observer role must be guide, guest, or researcher'),
  
  body('groupSize')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Group size must be a positive integer'),
  
  body('behavior')
    .optional()
    .isIn(['feeding', 'drinking', 'resting', 'moving', 'hunting', 'mating', 'playing', 'other'])
    .withMessage('Invalid behavior category')
];

// GET /api/sightings - Get all sightings with filtering and pagination
router.get('/', [
  query('species').optional().isLength({ min: 1 }).withMessage('Species filter cannot be empty'),
  query('observer').optional().isLength({ min: 1 }).withMessage('Observer filter cannot be empty'),
  query('verified').optional().isBoolean().withMessage('Verified must be true or false'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('offset').optional().isInt({ min: 0 }).withMessage('Offset must be non-negative')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Extract query parameters
    const { species, observer, verified, limit = 10, offset = 0 } = req.query;
    
    // Filter sightings
    let filteredSightings = [...sightings];
    
    if (species) {
      filteredSightings = filteredSightings.filter(s => 
        s.species.toLowerCase().includes(species.toLowerCase())
      );
    }
    
    if (observer) {
      filteredSightings = filteredSightings.filter(s => 
        s.observer.toLowerCase().includes(observer.toLowerCase())
      );
    }
    
    if (verified !== undefined) {
      filteredSightings = filteredSightings.filter(s => 
        s.verified === (verified === 'true')
      );
    }

    // Sort by timestamp (newest first)
    filteredSightings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Apply pagination
    const paginatedSightings = filteredSightings.slice(
      parseInt(offset), 
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      count: paginatedSightings.length,
      total: filteredSightings.length,
      data: paginatedSightings,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < filteredSightings.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve sightings'
    });
  }
});

// GET /api/sightings/:id - Get specific sighting
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sighting = sightings.find(s => s.id === id);
    
    if (!sighting) {
      return res.status(404).json({
        success: false,
        error: 'Sighting not found'
      });
    }

    res.json({
      success: true,
      data: sighting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve sighting'
    });
  }
});

// POST /api/sightings - Create new sighting
router.post('/', sightingValidation, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const newSighting = {
      id: Math.max(...sightings.map(s => s.id), 0) + 1,
      species: req.body.species,
      location: {
        lat: req.body.location.lat,
        lng: req.body.location.lng,
        name: req.body.location.name || 'Unknown Location'
      },
      timestamp: new Date().toISOString(),
      observer: req.body.observer,
      observerRole: req.body.observerRole,
      notes: req.body.notes || '',
      photos: req.body.photos || [],
      weatherConditions: req.body.weatherConditions || '',
      groupSize: req.body.groupSize || 1,
      behavior: req.body.behavior || 'other',
      verified: req.body.observerRole === 'guide' // Auto-verify guide sightings
    };

    sightings.push(newSighting);
    
    res.status(201).json({
      success: true,
      message: 'Sighting created successfully',
      data: newSighting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create sighting'
    });
  }
});

// PUT /api/sightings/:id - Update sighting
router.put('/:id', sightingValidation, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const id = parseInt(req.params.id);
    const sightingIndex = sightings.findIndex(s => s.id === id);
    
    if (sightingIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Sighting not found'
      });
    }

    // Update sighting while preserving id and timestamp
    const updatedSighting = {
      ...sightings[sightingIndex],
      ...req.body,
      id: sightings[sightingIndex].id,
      timestamp: sightings[sightingIndex].timestamp,
      updatedAt: new Date().toISOString()
    };

    sightings[sightingIndex] = updatedSighting;
    
    res.json({
      success: true,
      message: 'Sighting updated successfully',
      data: updatedSighting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update sighting'
    });
  }
});

// DELETE /api/sightings/:id - Delete sighting
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sightingIndex = sightings.findIndex(s => s.id === id);
    
    if (sightingIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Sighting not found'
      });
    }

    sightings.splice(sightingIndex, 1);
    
    res.json({
      success: true,
      message: 'Sighting deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete sighting'
    });
  }
});

module.exports = router;