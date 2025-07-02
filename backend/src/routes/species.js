const express = require('express');
const router = express.Router();

// Mock species data
const species = [
  { id: 1, name: 'African Lion', category: 'Big Cat', status: 'Vulnerable' },
  { id: 2, name: 'African Elephant', category: 'Mammal', status: 'Endangered' },
  { id: 3, name: 'Leopard', category: 'Big Cat', status: 'Near Threatened' }
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    count: species.length,
    data: species
  });
});

module.exports = router;