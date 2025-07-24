const express = require('express');
const router = express.Router();

// Mock authentication for baseline version
router.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Authentication endpoint (mock)',
    user: { id: 1, name: 'Test User', role: 'guide' }
  });
});

router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration endpoint (mock)'
  });
});

module.exports = router;