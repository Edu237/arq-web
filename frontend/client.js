var http = new XMLHttpRequest();
var listaCaballos = {};
var vistaCaballo = {};
var vistaEmbarazo = {};

function getJSON(path,callback) {
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(http.responseText);
      callback(response);
    }
  }
  http.open("GET",path,true);
  http.send();
}

function sendJSON(method,path,object,callback) {
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callback();
    }
  }
  path+="?nuevo="+JSON.stringify(object);
  http.open(method,path,true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function getCaballos() {
  getJSON("/caballo/nombres",(nombres) => {
    listaCaballos = nombres;
    var html = "";
    for (i in nombres) {
      html += "<tr><td onclick=\"getInfoCaballo("+i+")\">"+nombres[i]+"</td></tr>\n";
    }
    document.getElementById("caballos").innerHTML = html;
  });
}

function getInfoCaballo(id) {
  document.getElementById("info-embarazos").style.visibility = "hidden";

  getJSON("/caballo?id="+id,(info) => {
    vistaCaballo = info;
    var table = `<tr><td>Nombre</td><td>${info.nombre}</td></tr>
    <tr><td>Sexo</td><td>${info.sexo}</td></tr>
    <tr><td>Pelaje</td><td>${info.pelaje}</td></tr>
    <tr><td>Número AAFE</td><td>${(info["nro-aafe"]) ? "<a href=\"https://www.fomentoequino.net/nv_pedigrees_ver.php?aafe="+info["nro-aafe"]+"\">"+info["nro-aafe"]+"</a>" : "No está registrado."}</td></tr>`

    var button = document.createElement("BUTTON");
    var text = document.createTextNode("Ver datos de la preñez");
    button.appendChild(text);
    button.addEventListener("click",() => {getEmbarazo(info.embarazo)});
    document.getElementById("info-caballos").appendChild(button);
    document.getElementById("nombre-caballo").innerHTML = info.nombre;
    document.getElementById("info").innerHTML = table;
    document.getElementById("info-caballos").style.visibility = "visible";
  });
}

function getEmbarazo(id) {
  getJSON("/embarazo?id="+id, (info) => {
    var table = `<tr><td>Padre</td><td>${listaCaballos[Number(info.padre)]}</td></tr>
    <tr><td>Madre</td><td>${listaCaballos[Number(info.madre)]}</td></tr>
    <tr><td>Madre Sustituta</td><td>${(!info.sustituta) ? "No hay sustituta." : listaCaballos[Number(info.sustituta)]}</td></tr>
    <tr><td>Fecha de Inseminación</td><td>${info.inseminacion[0]}/${info.inseminacion[1]}/${info.inseminacion[2]}</td></tr>
    <tr><td>Fecha de Confirmación</td><td>${info.confirmacion[0]}/${info.confirmacion[1]}/${info.confirmacion[2]}</td></tr>
    <tr><td>Fecha de Parto</td><td>${info.finalizacion[0]}/${info.finalizacion[1]}/${info.finalizacion[2]}</td></tr>`;

    document.getElementById("embarazo").innerHTML = table;
    document.getElementById("info-embarazos").style.visibility = "visible";
    vistaEmbarazo = info;
  })
}

function fillCaballo (method) {
  var form = document.forms["formCaballo"];
  form.method = method;
  if (method == "post") document.getElementById("editCaballo").firstChild.innerHTML = "Agregar Caballo";
  if (method == "put") {
    document.getElementById("editCaballo").firstChild.innerHTML = "Editar Caballo";
    form["nombre"].placeholder = vistaCaballo.nombre;
    form["sexo"].placeholder = vistaCaballo.sexo;
    form["pelaje"].placeholder = vistaCaballo.pelaje;
  }
  document.getElementById("editCaballo").style.display = "block";
}

function fillEmbarazo(method) {
  var form = document.forms["formEmbarazo"];
  form.method = method;
  if (method == "post") document.getElementById("editEmbarazo").firstChild.innerHTML = "Agregar Embarazo";
  if (method == "put") {
    document.getElementById("editEmbarazo").firstChild.innerHTML = "Editar Embarazo";
    form["nombre"].placeholder = vistaEmbarazo.nombre;
    form["sexo"].placeholder = vistaEmbarazo.sexo;
    form["pelaje"].placeholder = vistaEmbarazo.pelaje;
  }
  document.getElementById("editEmbarazo").style.display = "block";
}

function saveCaballo(){
  var form = document.forms["formCaballo"];
  var formData = new FormData(form);
  var message = {};
  formData.forEach((value, key) => {
    message[key]=(value) ? value : null;
  })
  sendJSON(form.method,"/caballo",message,function (){
    alert("Los datos se guardaron con éxito!");
  })
  return false;
}

function saveEmbarazo(){
  var form = document.forms["formEmbarazo"];
  var formData = new FormData(form);
  var message = {};
  formData.forEach((value, key) => {
    message[key]=(value) ? value : null;
  })
  sendJSON(form.method,"/embarazo",message,function (){
    alert("Los datos se guardaron con éxito!");
  })
  return false;
}

document.onload = getCaballos();
