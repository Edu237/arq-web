const express = require('express');
const app = express();
const port = 3000;
const controller = require('./controller.js')

// TODO: Reemplazar los 501 por funcionalidad

app.get('/caballos', (req, res) => {
  result = controller.getCaballo(req.query.id).then(function(result){
    res.status(200),json(result);
  }, function(err){
    res.status(err.numero).send(err.mensaje);
  });
});

app.post('/caballos', (req, res) => {
  result = controller.postCaballo(req.query).then(function(result){
    res.status(200),json(result);
  }, function(err){
    res.status(err.numero).send(err.mensaje);
  });
});

app.put('/caballos', (req, res) => {
  result = controller.putCaballo(req.query).then(function(result){
    res.status(200),json(result);
  }, function(err){
    res.status(err.numero).send(err.mensaje);
  });
});

app.get('/veterinaria', (req, res) => {
  if(req.query.op == "tratamiento"){
    result = controller.getTratamiento(req.query.id).then(function(result){
      res.status(200),json(result);
    }, function(err){
      res.status(err.numero).send(err.mensaje);
    });
  }
  else if(req.query.op == "embarazo"){
    result = controller.getEmbarazo(req.query.id).then(function(result){
      res.status(200),json(result);
    }, function(err){
      res.status(err.numero).send(err.mensaje);
    });
  }
  else res.status(400).send("Faltan parámetros necesarios.");
});

app.put('/veterinaria', (req, res) => {
  if(req.query.op == "tratamiento"){
    result = controller.putTratamiento(req.query.tratamiento).then(function(result){
      res.status(200),json(result);
    }, function(err){
      res.status(err.numero).send(err.mensaje);
    });
  }
  else if(req.query.op == "embarazo"){
    result = controller.getEmbarazo(req.query.tratamiento).then(function(result){
      res.status(200),json(result);
    }, function(err){
      res.status(err.numero).send(err.mensaje);
    });
  }
  else res.status(400).send("Faltan parámetros necesarios.");
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
