const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
var database = null;
const controller = require('./controller.js');

// TODO: Reemplazar los 501 por funcionalidad

function fetchBase(req,res,next){
  console.log('Solicitud: '+req.method+' '+req.path+'\n'+'Query: '+JSON.stringify(req.query));
  if (req.path == '/favicon.ico'){
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

function saveBase(req,res){
  var data = JSON.stringify(database);
  fs.writeFile('datos.json',data,(err) => {
    if (err) {
      console.log(err.message);
      res.status(500).end();
      logRes(500);
    }
    else {
      console.log("Se guardó la base de datos con éxito!");
      res.status(200).end();
      logRes(200);}
  });
}

function logRes(status,response){
  console.log("Se respondió a la solicitud.");
  console.log("Estado: "+status);
  if (response) console.log("Mensaje:\n"+response);
}

app.use(fetchBase);

app.get('/caballo/nombres', (req,res) => {
  nombres = controller.nombres(database);
  res.status(200).json(nombres);
  logRes(200,JSON.stringify(nombres));
})

app.get('/caballo', (req,res) => {
  try {
    result = controller.getItemById(database,"caballos",req.query.id);
    res.status(200).json(result);
    logRes(200,JSON.stringify(result));
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
});

app.post('/caballo', (req, res, next) => {
  caballo = JSON.parse(req.query.nuevo);
  if (controller.isCaballo(caballo)){
    id = controller.postItem(database,"caballos",caballo);
    next();
  }
  else {
    res.status(400).end();
    logRes(400);
  }
}, saveBase);

app.put('/caballo', (req, res, next) => {
  try {
    controller.modCaballo(database,req.query);
    next();
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
}, saveBase);

app.get('/caballo/tratamiento', (req, res) => {
  try {
    result = controller.getTratamientoByCaballo(database,req.query.id);
    res.status(200).json(result);
    logRes(200,JSON.stringify(result));
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
})

app.get('/tratamiento', (req, res) => {
  try {
    result = controller.getItemById(database,"tratamientos",req.query.id);
    res.status(200).json(result);
    logRes(200,JSON.stringify(result));
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
});

app.post('/tratamiento', (req, res, next) => {
  tratamiento = JSON.parse(req.query.nuevo);
  if (controller.isCaballo(tratamiento)){
    id = controller.postItem(database,"tratamientos",tratamiento);
    next();
  }
  else {
    res.status(400).end();
    logRes(400);
  }
}, saveBase);

app.get('/embarazo', (req, res) => {
  try {
    result = controller.getItemById(database,"embarazos",req.query.id);
    res.status(200).json(result);
    logRes(200,JSON.stringify(result));
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
});

app.post('/embarazo', (req, res, next) => {
  tratamiento = JSON.parse(req.query.nuevo);
  if (controller.isCaballo(tratamiento)){
    id = controller.postItem(database,"embarazos",tratamiento);
    next();
  }
  else {
    res.status(400).end();
    logRes(400);
  }
}, saveBase);

app.put('/embarazo', (req, res, next) => {
  try {
    controller.modEmbarazo(database,req.query);
    next();
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
}, saveBase);

app.get('/venta', (req, res) => {
  try {
    result = controller.getItemById(database,"ventas",req.query.id);
    res.status(200).json(result);
    logRes(200,JSON.stringify(result));
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
});

app.post('/venta', (req, res, next) => {
  venta = JSON.parse(req.query.nuevo);
  if (controller.isCaballo(tratamiento)){
    id = controller.postItem(database,"ventas",venta);
    next();
  }
  else {
    res.status(400).end();
    logRes(400);
  }
}, saveBase);

app.put('/venta', (req, res, next) => {
  try {
    controller.modVenta(database,req.query);
    next();
  }
  catch (err) {
    res.status(err.status).end()
    logRes(err.status);
  }
}, saveBase);

app.delete('/\*', (req,res) => {res.status(403).end();});

app.use('/', express.static('frontend'))

app.listen(port, () => console.log(`Escuchando en puerto ${port}!`));
