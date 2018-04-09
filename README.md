# AM - Frontend - Challenge

#### Primisa

El exámen está compuesto por dos aplicaciones, un backend escrito en NodeJS el cual expondrá
una API REST para la interacción con la aplicación frontend.

### Ejercicio 1: API Rest NodeJS

Este punto consiste en armar un API REST en Node.js. El mismo será utilizado en el ejercicio 2.
La funcionalidad de listado y filtrado de hoteles debe estar soportada por la API y
consumida en la aplicación cliente.
A la hora de diseñar la estructura de la aplicación, tener en cuenta factores como
escalabilidad, reutilización y separación de responsabilidades.
Uso de configuraciones para ajustar como se ejecuta la aplicación en entornos productivos
y de desarrollo.


### Ejercicio 2: Frontend

Maquetar una página de resultado de hoteles, ver imágenes en el repo (solo mobile y desktop).
Consumir la API desarrollada en el ejercicio anterior, implementando las funcionalidades
necesarias para listar y filtar los hoteles.
Utilizar alguna librería o framework guiado por componentes ( AngularJS o Angular).
Utilizar algún package manager (npm, bower) para manejar dependencias externas.
Utilizar una grilla responsive o similar para el maquetado.
Optimizar todos los recursos para entornos productivos, (minificar, ofuscar, etc).

### Extras

Los puntos extras solo se tomarán en cuenta si las funcionalidades de los puntos anteriores
fueron completadas correctamente.

Añadir alguna capa de persistencia de datos.

Implementar el CRUD de hoteles (solo a nivel API).


### Diseños

##### Desktop

![alt text](https://raw.githubusercontent.com/megui88/am-frontend-challenge/master/designs/desktop.png)

##### Mobile

![alt text](https://raw.githubusercontent.com/megui88/am-frontend-challenge/master/designs/mobile.png)

## Solución por Mariano G. Egui

### Ejercicio 1: API Rest NodeJS

Se desarrollo una aplicación en NodeJs que utiliza una base de datos no relacional mongoDb, se implementaron todos los
 verbos: **GET, POST, PATCH, PUT, HEAD, DELETE**.

Se implementarion varias capaz con fin de abstraer sus algoritmos: app webserver (express), rutas (routes)  y servicios
 para gestionar los hoteles y su storage.

Se implementaron respuestas y acciones distintas para desarrollo o produccion, a nivel infraestructura el logger varía
 la verbosidad. En el caso de produccion se usa la configuración tiny del paquete morgan para producción. A su vez
 siguiendo politicas de Étical Hacking de brindar la menor información posible todos los errores en producción solo
 envian el HTTP Code correspondiente sin mensaje, pero en desarrollo envia el texto informativo.
     
Se desarrollo en un contenedor de docker configurable por docker-compose.yml el cual puede ser seteado NODE_ENV como 
**production** permitiendo generar la imagen productiva, que recibe los parametros de conectividad por varible de
 entorno, facilitando la escalabilidad. Si el docker-compose.yml setea la variable NODE_ENV en **development** no solo
 los logs y las respuesta de error seran mas verbosas, tambien el webserver se refrescara automaticamente ante el cambio
 de cualquier archivo. 

Para la gestion de dependencias se utilizo **Yarn** que genera un archivo **yarn.lock** que guarda los commits de cada
 dependencia con fin de mantener exactamente la version de cada paquete.

##### @TODO

- Filtros API multi-select.
- Implementar Test Unitarios y Funcionales Backend y Frontend.
- Agregar capaz de cache.
- Paginación endpoint GET /hotel
- Agregar swagger para tener documentado (igual se respetan los verbos de API RESTFul).

### Ejercicio 2: Frontend

Se desarrollo una aplicación en AngularJs 5 se cosume la API RESTFul del ejercicio 1, para listar, filtrar y obtener hotel. 

Para la gestion de dependencias se utilizo **Yarn** que genera un archivo **yarn.lock** que guarda los commits de cada
 dependencia con fin de mantener exactamente la version de cada paquete.

Para el desarrollo se utilizo Webpack (**@angular/cli** provee esta solución por defecto) como webserver solo se inidico
 en el archivo **.angular-cli.json** que debe tomar los CSS/JS de bootstrap y JS de Jquery desde **node_modules**. No
 vi la necesidad de usar Bower cono gestor de dependecias estasticas (aunque se puede cambiar el directorio contenedor
 de dependencias). Ya que WebPack genera los archivos productivos minificados y ofuscados.

Se utilizo el filtro de hoteles contra API con fin de realizar mas componentes integrados, pero esto se podria
 resolver por javascript segun conveniencia para no exigir tanto a la API.
 
Se utilizo Bootstrap para el control de grilla responsive.

Se agrego el componente **hotel-details** para demostrar la reutilización de componentes.
 
Para generar la aplicación en formato productivo se debe ejectur **yarn production** (dentro del contenedor docker), este ultimo genera una carpeta
 dist que es la aplicación minimizada y ofuscada.

##### @TODO

- Test.
- Filtro multiples, las estrellas de hoteles son input radio y no checkbox. Esto debido a que la API no lo soporta.
- Icono Row de apertura de filtros deberia variar segun el estado.
- Mayor detalle para igual el diseño. Se priorizo el uso de AngularJs, componentes abstraidos, uso de API.


### Resultados de Diseño

##### Desktop

![alt text](https://raw.githubusercontent.com/megui88/am-frontend-challenge/master/designs/result/desktop.png)

##### Mobile

![alt text](https://raw.githubusercontent.com/megui88/am-frontend-challenge/master/designs/result/mobile.png)


##### Details Desktop

![alt text](https://raw.githubusercontent.com/megui88/am-frontend-challenge/master/designs/result/hotel-detail-desktop.png)

##### Details Mobile

![alt text](https://raw.githubusercontent.com/megui88/am-frontend-challenge/master/designs/result/hotel-detail-mobile.png)

## Atención

La Api no utiliza el archivo data.json provisto para el examen, utiliza semillas que deben ser precargadas antes de probar
para eso antes de probar se debe hacer el paso **Load seeds**

## Dev

### Please, is necessary to have
* docker:  [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/) or [Mac](https://docs.docker.com/docker-for-mac/install/)
* docker-compose [Ubuntu](https://docs.docker.com/compose/install/) 


### How to check?

##### Clone the project:

```
git clone --recursive git@github.com:megui88/am-frontend-challenge.git
```

##### Run docker:

```
cd am-frontend-challenge
docker-compose up
```

##### Run docker:

```
cd am-frontend-challenge
docker-compose up
```

##### Configure production:

```
version: '2'
services:
    backend:
        image: node:slim
        environment:
          - NODE_ENV=production
    frontend:
        image: node:slim
        environment:
          - NODE_ENV=production
```

##### Configure development:

```
version: '2'
services:
    backend:
        image: node:slim
        environment:
          - NODE_ENV=development
    frontend:
        image: node:slim
        environment:
          - NODE_ENV=development
```

##### Load seeds:

```
docker-compose exec backend bash
$: cd /src
$: yarn seeds
```

##### Get UI Production (dist folder):

```
docker-compose exec frontend bash
$: cd /src
$: yarn production
$: ls -l dist/
```