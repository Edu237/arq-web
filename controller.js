const _ = require('underscore');

exports.nombres = function (database) {
  return _.pluck(database.caballos,"nombre");
}

exports.getItemById = function (database,table,id) {
  if(!id) throw {status:400};
  if(id >= database[table].length) throw {status:410};
  return database[table][id];
}

exports.isCaballo = function(input) {
  var keys = _.keys(input);
  var pred = _.every(keys, function(k) {
    return ["nombre","sexo","nro-aafe","pelaje","embarazo"].indexOf(k) != -1;
  });
  return pred;
}

exports.isTratamiento = function(input) {
  var keys = _.keys(input);
  var pred = _.every(keys, function(k) {
    return ["caballo","fecha","procedimiento","medicacion"].indexOf(k) != -1;
  });
  return pred;
}

exports.isVenta = function(input) {
  var keys = _.keys(input);
  var pred = _.every(keys, function(k) {
    return ["caballo","cliente","precio","fecha"].indexOf(k) != -1;
  });
  return pred;
}

exports.postItem = function(database,table,item){
  var id = database[table].length;
  database[table].push(item);
  return id;
}

exports.modCaballo = function(database,params){
  if(!params.id) throw {status:400};
  if(params.id >= database.caballos.length) throw {status:410};
  var keys = _.keys(params);
  var store = _.filter(keys,function(key) {
    let test = ["nombre","sexo","nro-aafe","pelaje","embarazo"].indexOf(key) != -1;
    return test;
  });
  if (store.length == 0) throw {status:400};
  for (i in store) {
    database.caballos[params.id][store[i]] = params[store[i]];
  }
}

exports.modEmbarazo = function(database,params){
  if(!params.id) throw {status:400};
  if(params.id >= database.embarazos.length) throw {status:410};
  var id = params.id;
  var keys = _.keys(params);
  var store = _.filter(keys,function (key) {
    return ["caballo","fecha","procedimiento","medicacion"].indexOf(key) != -1;
  });
  if (store.length == 0) throw {status:400};
  for (i in store) {
    database.embarazos[id][store[i]] = params[store];
  }
}

exports.modVenta = function(database,params){
  if(!params.id) throw {status:400};
  if(params.id >= database.ventas.length) throw {status:410};
  var id = params.id;
  var keys = _.keys(params);
  var store = _.filter(keys,function (key) {
    return ["caballo","cliente","precio","fecha"].indexOf(key) != -1;
  });
  if (store.length == 0) throw {status:400};
  for (i in store) {
    database.ventas[id][store[i]] = params[store];
  }
}
