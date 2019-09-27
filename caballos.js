mysql = require('mysql');
fs = require('fs');

// TODO: Reemplazar acceso a JSON con acceso a MySQL

exports.base = function(callback) {
  var plain = fs.readFileSync('datos.json');
  var database = JSON.parse(plain);
  callback(database);
}
