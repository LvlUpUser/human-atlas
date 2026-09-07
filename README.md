# Atlas Humano

Explorador interactivo de anatomía 3D desarrollado con React, Three.js y shadcn/ui. Permite explorar la anatomía masculina adulta de referencia de BodyParts3D mediante **2.234 mallas seleccionables individualmente**, recorrer **15 sistemas anatómicos** y buscar entre **3.432 conceptos anatómicos con nombre**.

## Explorar

* Orbita, amplía y selecciona estructuras directamente sobre el cuerpo.
* Activa o desactiva sistemas anatómicos individualmente o utiliza las vistas predefinidas de esqueleto y órganos.
* Pasa de la anatomía ensamblada a una vista separada de cada estructura visible.
* Busca nombres anatómicos e identificadores de la fuente.
* Aísla una estructura seleccionada y consulta sus detalles.
* Utiliza controles compactos y paneles de información adaptados a dispositivos móviles.

## Ejecutar localmente

Requiere Node.js 22.13 o posterior. No se necesitan claves API ni cuentas adicionales.

```sh
npm ci
npm run dev
```

Abre `http://localhost:3016`. Para generar el sitio estático ejecuta `npm run build`. El resultado se encuentra en `dist/`.

## Validación

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

La validación comprueba las mallas, los nombres y la pertenencia a conceptos, la distribución de estructuras en las vistas separadas, la búsqueda, la inspección y la interacción táctil. Se han comprobado controles de selección, sistemas, búsqueda, aislamiento y rotación en distintos formatos de pantalla.

## Datos anatómicos

El visor utiliza **BodyParts3D 4.0**, una anatomía masculina adulta de referencia con licencia **CC BY 4.0**. No representa todas las estructuras ni todas las variaciones anatómicas humanas. Las mallas individuales de la fuente son distintas de los conceptos anatómicos con nombre, que pueden agrupar varias mallas.

La geometría está simplificada para mejorar el rendimiento en el navegador conservando las mallas de la fuente. El modelo incluye 2.288.268 triángulos y aproximadamente 33 MB de geometría comprimida. Los créditos, fuentes y detalles de adaptación se encuentran en `public/ATTRIBUTION.md`.

**Este proyecto tiene finalidad educativa y de consulta anatómica. No es una herramienta diagnóstica ni quirúrgica.**

## Funcionamiento

La geometría se agrupa en lotes. Las texturas de GPU controlan la traslación, visibilidad y selección de cada estructura, mientras que la geometría de componentes permite una selección precisa. Las distribuciones separadas incluyen únicamente las piezas visibles.

Las herramientas WebMCP opcionales permiten búsqueda e inspección anatómica en navegadores compatibles. La interfaz visible funciona sin ellas.

## Reconstrucción de la geometría

El repositorio ya incluye la geometría preparada para navegador. Para reconstruirla se necesita el archivo OBJ oficial de BodyParts3D y las tablas de metadatos correspondientes. Después se ejecutan `scripts/convert-anatomy.py`, `node scripts/optimize-anatomy.mjs` y `node scripts/compress-models.mjs`.

## Despliegue

Puede importarse este repositorio en Vercel como proyecto Vite. El archivo `vercel.json` incluido configura `npm ci`, `npm run build` y el directorio de salida `dist`. También puede alojarse en cualquier servidor de contenido estático compatible.

## Licencias y atribución

El código original de la aplicación se distribuye bajo la **licencia MIT**. Los datos anatómicos tienen su propia licencia **CC BY 4.0** y debe conservarse su atribución al redistribuirlos. Las dependencias de terceros mantienen sus respectivas licencias.

Versión en español basada en el proyecto original `ashemag/human-atlas`.
