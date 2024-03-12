function agregarAlCarrito(producto) {
    const carrito = recuperarCarrito();
    const productoExistenteIndex = carrito.findIndex(item => item.id === producto.id);

    if (productoExistenteIndex !== -1) {
       
        carrito[productoExistenteIndex].cantidad++;
    } else {
      
        carrito.push({...producto, cantidad: 1});
    }
    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
}
const recuperarCarrito = () => {
    return JSON.parse(localStorage.getItem('carritoProductos')) || [];
}