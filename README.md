# Arquitectura Web - UP 2019
## Trabajo Práctico
## Participantes

- Eduardo Mitjans

### Conversión de Mensajes

Estos son algunos ejemplos de los mensajes SQL resultantes de algunos pedidos HTTP.

|Método|Path|Query (`req.query`)|Respuesta
|:--|:--|:--|:--|
|GET|/caballos|id|Objeto Caballo|
|PUT|/caballos|id y pares clave-valor|Status 200|
|POST|/caballos|objeto caballo|Status 200|
|GET|/tratamiento|id|Objeto Tratamiento|
|POST|/tratamiento|objeto tratamiento|Status 200|
|GET|/embarazo|id|Status 200|
|POST|/embarazo|objeto embarazo|Status 200|
|GET|/ventas|id|Objeto Venta|
|PUT|/ventas|id y pares clave-valor|Status 200|
|POST|/ventas|objeto venta|Status 200|
|GET|/caballo/nombres||Array con nombres de todos los caballos|

### Estados

|Situación|Nro|Descripción|
|:--|:--|:--|
|La solicitud fue procesada con éxito.|200|OK|
|No fue posible conectarse a la base de datos.|503|Service Unavailable|
|No se encontró la entrada en la base de datos.|410|Gone|
|El método DELETE no es aceptado por la API.|405|Method Not Allowed|
|Faltan parámentros necesarios en el query string.|400|Bad Request|
|La función solicitada todavía no está implementada.|501|Not Implemented|
