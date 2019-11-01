exports.getElementById = function (database,table,id) {
  if (!id) throw({numero: 400, mensaje:"Faltan parámetros necesarios."});
  var result = null;
  for (c in database[table]){
    var entry = database[table][c];
    if (entry.id == id) return entry;
  }
  throw({numero: 401, mensaje: "No se encontró la entrada en la base de datos."});
}

/*
exports.putCaballo = function(params){
  return new Promise(async function(resolve,reject){
    var caballo = await getCaballo(params.id).catch((err) => {reject(err)});
    var index = database.caballos.indexOf(caballo);
    for (key in params.keys()){
      caballo[key] = param[key];
    }
    database.caballos[index] = caballo;
    resolve(caballo);
  });
}

exports.postCaballo = function(params){
  return new Promise(async function(resolve,reject){
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

exports.postTratamiento = function(params){
  return new Promise(async function(resolve,reject){
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

exports.postEmbarazo = function(params){
  return new Promise(async function(resolve,reject){
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
*/
