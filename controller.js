// mysql = require('mysql');
fs = require('fs');
var database = null;

// TODO: Reemplazar acceso a JSON con acceso a MySQL

var fetchBase = new Promise(function(resolve,reject){
  try {var plain = fs.readFileSync('datos.json');}
  catch {reject({numero: 503, mensaje: "No se pudo acceder a la base de datos."})}
  result = JSON.parse(plain);
  resolve(result);
});

exports.getCaballo = async function(id){
  return new Promise(function(resolve,reject){
    if (!database) database = await fetchBase().catch((err) => {reject(err);});
    if (!id) reject({numero: 400, mensaje:"Faltan parámetros necesarios."});
    var result = null;
    for (c in database.caballos){
      if (c.id == id) resolve(c);
    }
    if (!result) reject({numero: 401, mensaje: "No se encontró la entrada en la base de datos."});
  })
}

exports.postCaballo = async function(params){
  return new Promise(function(resolve,reject){
    var caballo = await getCaballo(params.id).catch((err) => {reject(err)});
    var index = database.caballos.indexOf(caballo);
    for (key in params.keys()){
      caballo[key] = param[key];
    }
    database.caballos[index] = caballo;
    resolve(caballo);
  });
}

exports.putCaballo = async function(params){
  return new Promise(function(resolve,reject){
    if (!database) database = await fetchBase().catch((err) => {reject(err);});
    if (params.keys() == 6){
      database.caballos.push(params);
      resolve(params);
    }
    else {
      reject({numero: 400, mensaje:"Faltan parámetros necesarios."});
    }
  });
}

exports.getTratamiento = async function(id){
  return new Promise(function(resolve,reject){
    if (!database) database = await fetchBase().catch((err) => {reject(err);});
    if (!id) reject({numero: 400, mensaje:"Faltan parámetros necesarios."});
    var result = [];
    for (t in database.tratamientos){
      if (t.id == id) result.push(t);
    }
    if (!result) reject({numero: 401, mensaje: "No se encontró la entrada en la base de datos."})
    else resolve(result);
  })
}

exports.putTratamiento = async function(params){
  return new Promise(function(resolve,reject){
    if (!database) database = await fetchBase().catch((err) => {reject(err);});
    if (params.keys() == 6){
      database.tratamientos.push(params);
      resolve(params);
    }
    else {
      reject({numero: 400, mensaje:"Faltan parámetros necesarios."});
    }
  });
}

exports.getEmbarazo = async function(id){
  return new Promise(function(resolve,reject){
    if (!database) database = await fetchBase().catch((err) => {reject(err);});
    if (!id) reject({numero: 400, mensaje:"Faltan parámetros necesarios."});
    var result = [];
    for (e in database.embarazos){
      if (e.id == id) result.push(t);
    }
    if (!result) reject({numero: 401, mensaje: "No se encontró la entrada en la base de datos."})
    else resolve(result);
  })
}

exports.putTratamientos = async function(params){
  return new Promise(function(resolve,reject){
    if (!database) database = await fetchBase().catch((err) => {reject(err);});
    if (params.keys() == 6){
      database.embarazos.push(params);
      resolve(params);
    }
    else {
      reject({numero: 400, mensaje:"Faltan parámetros necesarios."});
    }
  });
}
