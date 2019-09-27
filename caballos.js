mysql = require('mysql');
fs = require('fs');

// TODO: Reemplazar acceso a JSON con acceso a MySQL

var plain = fs.readFileSync('datos.json');
var database = JSON.parse(plain);

exports.getCaballo = function(query) {
  return database.caballos[query["nro-aafe"]];
}
