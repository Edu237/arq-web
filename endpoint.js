const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var database = null;
const controller = require('./controller.js');

// TODO: Reemplazar los 501 por funcionalidad

function fetchBase(req,res,next){
  console.log('Solicitud: '+req.method+' '+req.path+'\n'+'Query: '+JSON.stringify(req.query));
  if (req.path = '/favicon.ico'){
    res.status(404).end();
    return;
  }
  try {
    var plain = fs.readFileSync('datos.json');
    database = JSON.parse(plain);
    next();
  }
  catch (error) {
    console.log('No se pudo leer la base de datos.\n'+error.message);
    res.status(503).end();
  }
};

function saveBase(req,res,next){
  var data = JSON.stringify(database);
  fs.writeFile('datos.js',data,(err) => {
    if (err) {
      console.log(err.message);
      res.status(500).end();
    }
    else {res.status(200).end();}
  });
}

app.use(fetchBase);

app.get('/caballos', (req,res) => {
  try {
    result = controller.getElementById(database,'caballos',req.query.id);
    res.status(200).json(result);
    console.log('Respuesta:\n'+JSON.stringify(result));
  }
  catch (err) {
    res.status(err.numero).send(err.mensaje);
  }
});

app.post('/caballos', (req, res) => {
  res.status(501).end();
});

app.put('/caballos', (req, res) => {
  res.status(501).end();
});

app.get('/veterinaria', (req, res) => {
  if(req.query.op == "tratamiento"){
    try {
      result = controller.getElementById(database,'tratamientos',req.query.id);
      res.status(200).json(result);
      console.log('Respuesta enviada:\n'+c);
    }
    catch (err) {
      res.status(err.numero).send(err.mensaje);
    }
  }
  else if(req.query.op == "embarazo"){
    try {
      result = controller.getElementById(database,'embarazos',req.query.id);
      res.status(200).json(result);
      console.log('Respuesta enviada:\n'+c);
    }
    catch (err) {
      res.status(err.numero).send(err.mensaje);
    }
  }
  else res.status(400).send("Faltan parámetros necesarios.");
});

app.post('/veterinaria', (req, res) => {
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
