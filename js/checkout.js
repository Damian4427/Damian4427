document.addEventListener('DOMContentLoaded', function() {
    const botonPagar = document.querySelector('#botonPagar');
    const mensajeCompra = document.querySelector('#mensajeCompra');
    
    botonPagar.addEventListener('click', function() {
        localStorage.clear();
        mostrarProductosEnCarrito(); 
        mensajeCompra.style.display = 'block';
        setTimeout(function() {
            mensajeCompra.style.display = 'none';
        }, 3000);
    });
});
function mostrarProductosEnCarrito() {
    const tabla = document.getElementById('tablaCarrito');
    const totalElement = document.getElementById('totalCarrito');
    let total = 0;

    tabla.getElementsByTagName('tbody')[0].innerHTML = '';

    const carrito = recuperarCarrito();

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
       

        const fila = `
            <tr>
                <td>${producto.nombre}</td>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 400px;"></td>
                <td>$${producto.precio}</td>
                <td><span class="cantidad">${producto.cantidad}</span></td>
            </tr>
        `;

   
        tabla.getElementsByTagName('tbody')[0].innerHTML += fila;
    });

    totalElement.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarProductosEnCarrito();
});