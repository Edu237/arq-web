const express = require('express');
const app = express();
const port = 3000;
const caballos = require('./caballos.js')

// TODO: Reemplazar los 501 por funcionalidad

app.get('/caballos', (req, res) => {
  caballos.base(req.query.aafe).then(function(result) {
    res.status(200),json(result);
  }, function(err){
    res.status(err).send();
  });
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
