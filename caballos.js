mysql = require('mysql');
fs = require('fs');

// TODO: Reemplazar acceso a JSON con acceso a MySQL

exports.base = function(aafe) {
  return new Promise(function(resolve,reject) {
    var plain = fs.readFileSync('datos.json');
    var database = JSON.parse(plain);
    var result = null;
    for (caballo in database){
      if (caballo["nro-aafe"] == aafe) {
        result = caballo;
      }
    }
    if (result != null) {
      resolve(result);
    }
    else {
      reject(410);
    }
  });
}
