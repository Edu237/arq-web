const express = require('express');
const app = express();
const port = 80;
const fs = require('fs');

function getdatos(aafe,result){
  return fs.readFileSync('datos.json','utf-8');
}

app.get('/datos', (req, res) => {
  res.type("json");
  var response = getdatos(req.query.aafe);
  res.end(response);
});

app.listen(port, () => console.log(`Escuchando en puerto ${port}!`))
