const express = require('express');
const app = express();
const port = 80;
const caballos = require('caballos.js')

// TODO: Reemplazar los 501 por funcionalidad

app.get('/caballos', (req, res) => {
  res.json(caballos.database); //Sólo para probar el devolver un objeto como JSON.
  res.status(200).end();
});

app.post('/caballos', (req, res) => {
  res.status(501).end();
});

app.put('/caballos', (req, res) => {
  res.status(501).end();
});

app.get('/veterinaria', (req, res) => {
  res.status(501).end();
});

app.put('/veterinaria', (req, res) => {
  res.status(501).end();
});

app.get('/ventas', (req, res) => {
  res.status(501).end();
});

app.post('/ventas', (req, res) => {
  res.status(501).end();
});

app.put('/ventas', (req, res) => {
  res.status(501).end();
});

app.listen(port, () => console.log(`Escuchando en puerto ${port}!`));
