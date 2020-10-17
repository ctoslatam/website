# CTOs Latam website

[![Netlify Status](https://api.netlify.com/api/v1/badges/778c1199-6a17-4184-bf53-5c34ad09d88b/deploy-status)](https://app.netlify.com/sites/ctoslatam/deploys)

## Proyecto

Este sitio web tiene la finalidad de crear contenido para la comunidad de CTOs
Latam. La primer versión que se encuentra aquí funcionará como un blog donde
cualquiera puede realizar aportes.

Para hacer que este proyecto sea lo más abierto posible se decidió usar un
generador de sitios estáticos gestionado mediante git. De esta forma cualquier
persona con una cuenta de GitHub puede realizar aportes al blog y revisar la
forma en que el sitio está construido.

## Caracteristicas

- Static Site Genenerator - Eleventy
- CSS Framework - Tailwindcss
- Descripciones usando `<!-- excerpt -->`
- Filtro para calcular tiempo de lectura
- Soporte para Open Graph y metadata
- Página 404
- Página de etiquetas
- Página de autores
- Sitemap
- Shorcode para agregar imágenes

## Desarrollo

Los requisitos para trabajar sobre este proyecto son NodeJS y npm. Para instalar
las dependencias solo es necesario ejecutar el comando `npm install`. Una vez
que se hayan instalado las dependencias se puede iniciar el servidor local con
el comando `npm start`.

Cualquier cambio realizado al código en javascript deberá adherirse a la guía de
estilo de este proyecto. Para verificar esto se puede usar el comando `npm run
lint` y en caso de tener errores se puede intentar solucionarlos de forma
automática con el comando `npm run lint:fix`.
