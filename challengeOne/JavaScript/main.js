// Definición de la clase Producto
class Producto {
    constructor(nombre, categoria, precio, cantidad) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    mostrarInformacion() {
        console.log(`Nombre: ${this.nombre}, Categoría: ${this.categoria}, Precio: ${this.precio}, Cantidad: ${this.cantidad}`);
    }

    valorTotal() {
        return this.precio * this.cantidad;
    }
}

// Definición de la clase Inventario
class Inventario {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.actualizarTabla();
    }

    eliminarProducto(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
        this.actualizarTabla();
    }

    mostrarProductos() {
        const tablaBody = document.getElementById('tabla-productos').getElementsByTagName('tbody')[0];
        tablaBody.innerHTML = ''; // Limpiar la tabla

        this.productos.forEach(producto => {
            const fila = tablaBody.insertRow();
            fila.insertCell(0).textContent = producto.nombre;
            fila.insertCell(1).textContent = producto.categoria;
            fila.insertCell(2).textContent = producto.precio;
            fila.insertCell(3).textContent = producto.cantidad;
            fila.insertCell(4).textContent = producto.valorTotal();
        });
    }

    valorTotalInventario() {
        return this.productos.reduce((total, producto) => total + producto.valorTotal(), 0);
    }

    actualizarTabla() {
        this.mostrarProductos();
    }
}

// Inicializar inventario
let inventario = new Inventario();

// Manejar formulario de agregar producto
document.getElementById('form-agregar-producto').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    let nuevoProducto = new Producto(nombre, categoria, precio, cantidad);
    inventario.agregarProducto(nuevoProducto);

    this.reset();
});

// Manejar formulario de eliminar producto
document.getElementById('form-eliminar-producto').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre-eliminar').value;
    inventario.eliminarProducto(nombre);

    this.reset();
});
