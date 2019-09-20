# Arquitectura Web - UP 2019
## Trabajo Práctico
## Participantes

- Eduardo Mitjans

## Descripción

El objetivo de esta aplicación es asistir con la gestión de animales en un campo cuyo negocio es la cría de caballos.
El sistema debe llevar registro de la reproducción, nacimiento, tratamiento médico y venta de caballos.

## Despliegue

La interfaz será provista por el script `endpoint.js`, el cual utilizará Express.js para la comunicación via HTTP y el enrutamiento de los pedidos. Los pedidos, según el método HTTP y el path solicitado, serán atendidos por funciones en `caballos.js`, `veterinaria.js` y `ventas.js`. Cada uno de estos generará un mensaje SQL utilizará el driver MySQL para comunicarse con la base datos.

![Diagrama de Despliegue](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Edu237/arq-web/master/uml/despliegue.puml)

## Mensajes
### Flujo Normal

El path determinará qual control manejará la solicitud HTTP. Los argumentos del query determinarán qué datos se deben extraer, insertar o modificar en la base de datos. La conversión de argumentos en mensajes SQL y la de los resultados en objetos se realizarán en los controles; el primero como función del control y el segundo como parte del driver MySQL.

El siguiente diagrama muestra la secuencia de mensajes para un simple pedido GET. La misma no cambia demasiado con otros pedidos. Sólo cambiará cuál control será llamado y qué queries generará.

![Diagrama de Secuencia](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Edu237/arq-web/master/uml/get-sequence.puml)

### Conversión de Mensajes

|Método|Path|Query (`req.query`)|SQL (Resumida)|
|:--|:--|:--|:--|
|GET|/caballos|nro-aafe o nombre|SELECT * FROM caballos|
|POST|/caballos|nro-aafe y pares clave-valor|UPDATE caballos SET|
|PUT|/caballos|todos los pares clave-valor|INSERT INTO caballos VALUES|
|GET|/veterinaria|nro-aafe|SELECT * FROM tratamientos JOIN caballos|
|PUT|/veterinaria|todos los pares clave-valor|INSERT INTO tratamientos VALUES|
|GET|/ventas|nro-aafe|SELECT * FROM ventas JOIN caballos|
|POST|/ventas|nro-aafe y pares clave-valor|(previo SELECT) UPDATE ventas SET|
|PUT|/ventas|todos los pares clave-valor|INSERT INTO ventas VALUES|

### Estados

|Situación|Nro|Descripción|
|:--|:--|:--|
|La solicitud GET o POST fue procesada con éxito.|200|OK|
|La solicitud PUT fue procesada con éxito.|201|Created|
|No fue posible conectarse a la base de datos.|503|Service Unavailable|
|No se encontró la entrada en la base de datos.|410|Gone|
|El método DELETE no es aceptado por la API.|405|Method Not Allowed|
|Faltan parámentros necesarios en el query string.|400|Bad Request|
|La función solicitada todavía no está implementada.|501|Not Implemented|
