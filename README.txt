ALEJANDRO CASTILLO FOTOGRAFÍA - SITIO WEB
=========================================

ARCHIVOS PRINCIPALES
--------------------
- index.html                 -> Página principal.
- css/styles.css             -> Estilos del sitio.
- js/config.js               -> Configuración general (correo y redes).
- js/gallery-data.js         -> Datos de la galería.
- actualizar-galeria.py      -> Script para actualizar la galería automáticamente.
- assets/gallery/            -> Carpeta donde puedes poner nuevas fotos.
- assets/thumbs/             -> Miniaturas que usa el sitio.
- assets/about/              -> Foto de perfil / sección “Sobre mí”.
- assets/logo/logo-white.png -> Logo blanco usado en el header y footer.

CÓMO ABRIR EL SITIO
-------------------
1. Descomprime la carpeta.
2. Abre el archivo index.html en tu navegador.

CÓMO CAMBIAR EL CORREO DEL FORMULARIO
-------------------------------------
1. Entra a js/config.js
2. Cambia el valor de contactEmail por el correo real.

CÓMO AGREGAR MÁS FOTOS
----------------------
1. Copia tus fotos dentro de assets/gallery/
2. Ejecuta el archivo actualizar-galeria.py
3. El script generará miniaturas y actualizará js/gallery-data.js
4. Recarga index.html y las nuevas fotos aparecerán en el carrete y la galería.

REQUISITO PARA EL SCRIPT
------------------------
Si no tienes Pillow instalado, abre una terminal dentro de la carpeta del proyecto y ejecuta:

pip install pillow

NOTA
----
El formulario abre el cliente de correo del usuario mediante mailto. Si después quieres que el formulario envíe directo a un correo o a WhatsApp sin depender del cliente local, se puede integrar con Formspree, EmailJS, PHP o un backend propio.


NUEVAS MEJORAS APLICADAS
------------------------
- Overlay más oscuro en el hero para mejorar legibilidad.
- Inputs con mejor contraste en el formulario.
- CTA principal resaltado con botón sólido.
- Nueva sección “Sobre mí / The Storyteller”.
- Nueva sección “Servicios a medida”.
- Footer con mejor jerarquía visual y más espacio.

- Se aumentó el tamaño del logo en header y footer.
- Se destacó la tarjeta de Bodas como servicio principal.
