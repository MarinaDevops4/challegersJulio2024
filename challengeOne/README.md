# Ejercicio Práctico: Sistema de Gestión de Inventario

## Descripción

Este proyecto consiste en la creación de un sistema sencillo de gestión de inventario para una tienda utilizando programación orientada a objetos y diseño web básico. El ejercicio está dividido en dos partes principales:

- **Programación Orientada a Objetos (POO):** Desarrollo de clases y métodos en el lenguaje que eligas (Javascript, PHP, Java, Python etc) para gestionar productos y el inventario.
- **Diseño Web:** Creación de una página web simple que visualiza el inventario utilizando HTML y CSS.

## Objetivos del Ejercicio

- Aprender y practicar conceptos de programación orientada a objetos.
- Implementar clases y métodos para gestionar un inventario de productos.
- Crear una página web básica para visualizar los datos del inventario.
- Utilizar HTML y CSS para diseñar una interfaz de usuario simple.

## Parte 1: Programación Orientada a Objetos

### Instrucciones

#### Definir la Clase `Producto`

**Atributos:**

- `nombre` (str)
- `precio` (float)
- `cantidad` (int)

**Métodos:**

- `mostrar_informacion`: Muestra la información del producto.
- `valor_total`: Calcula el valor total del inventario de ese producto (precio * cantidad).

#### Definir la Clase `Inventario`

**Atributos:**

- `productos` (lista de objetos `Producto`)

**Métodos:**

- `agregar_producto`: Agrega un producto al inventario.
- `eliminar_producto`: Elimina un producto del inventario por su nombre.
- `mostrar_productos`: Muestra la lista completa de productos con sus valores totales.
- `valor_total_inventario`: Calcula el valor total del inventario.

## Parte 2: Diseño Web

### Instrucciones

#### Estructura del Proyecto:

```scss
inventario/
├── index.html
├── styles.css
└── script.js (opcional)
```

#### Contenido de `index.html`:

- Crear una tabla que muestre los productos con sus nombres, precios, cantidades y valores totales.
- Incluir un botón para agregar y eliminar productos.

#### Contenido de `styles.css`:

- Estilo básico para la página y la tabla.

## ¡Disfruta del ejercicio y aprende a combinar programación orientada a objetos con diseño web!