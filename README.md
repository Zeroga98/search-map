# [Search-map](https://search-map-53af2.web.app)

## Instalación

Clonar el repositorio:

```
$ git clone https://github.com/Zeroga98/search-map
```

Descargar las dependencias

```
$ npm install
```

## Entorno de desarrollo

Con **Create-react-app** Una interfaz de línea de comandos para Reactjs

```
$ npm run start
```
Construye y sirve su aplicación, reconstruyendo en los cambios de archivos.

Acceder a http://localhost:3000 para ver por primera vez.

**Nota:** Al actualizar cualquier archivo **webpack:** automaticamente sirve de nuevo el proyecto y recarga el navegador.


## Instalación de librerías

Para la instalación de librerías usar **npm** en lo posible.

```
$ npm install [dependencia] --save
```

## Arquitectura

```javascript
	src/ /*Aqui esta todo el codigo*/
    common/ /*Servicios globales*/
      api/ /*Se alojan los servicios que consumen la api*/
    components/ /*Componentes reutilizables*/
    containers/ /*Modulos superiores */
      list-continent/ /*Contenedor de la lista de contienentes*/
		context/ /*Modulo de contexto*/
    scenes/ /*Paginas principales*/
	  assets/ /*Imagenes y demas recursos multimedia*/

  type.d.ts/ /*Interfaces principales*/
	sass/ /*Archivos bases y utilidades de estilos*/
```

**Nota:** Las carpetas o archivos que no aparecen, no hace falta especificarlos.
