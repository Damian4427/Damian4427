const URL_JSON = '../backend/productos.json';

function procesarProductos(producto) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card-productos');

    cardElement.innerHTML = `
        <div class="card-image"><img src="${producto.imagen}" alt="${producto.nombre}"></div>
        <div class="card-name">${producto.nombre}</div>
        <div class="card-price">$ ${producto.precio}</div>
        <div class="card-button">
            <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">Agregar al carrito</button>
        </div>
    `;

    return cardElement;
}

document.addEventListener('DOMContentLoaded', function() {
    obtenerProductos();
});

function obtenerProductos() {
    fetch(URL_JSON)
        .then(response => response.json())
        .then(data => {
            cargarProductos(data);
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

function cargarProductos(productos) {
    const container = document.querySelector('.container'); 
    productos.forEach(producto => {
        const cardElement = procesarProductos(producto);
        container.appendChild(cardElement);
    });
    activarClickEnBotones(productos); 
}

function activarClickEnBotones(productos) {
    const botonesAgregar = document.querySelectorAll('.button.button-outline.button-add');
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoId = e.target.id;
            const producto = productos.find(producto => producto.id === parseInt(productoId));
            if (producto) {
                agregarAlCarrito(producto); 
            } else {
                console.error("El producto no fue encontrado.");
            }
        });
    });
}
