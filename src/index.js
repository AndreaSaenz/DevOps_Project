const express = require('express');

const app = express();

const students = [
  { name: 'Isaac Ehuan', id: '01' },
  { name: 'Tacos Consal', id: '02' },
  { name: 'Nombre Apellido', id: '03' },
  { name: 'Little Jesus', id: '04' }
];

app.get('/students', (req, res) => {
  res.json(students);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; 