  mostrarProductosEnCarrito();

  const carrito = recuperarCarrito();


// Función para mostrar los productos en el carrito
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



const mp = new MercadoPago("TEST-fc3bf30b-95cd-48a8-afb7-e3c41bdbb0b7", {
  locale: "es-AR",
});

document.getElementById("botonPagar").addEventListener("click", async () => {
  try {
    const carrito = recuperarCarrito();

    if (carrito.length > 0) {
      const orderData = {
        productos: carrito
      };
     
      const response = await fetch("http://localhost:3000/create_preference", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData),
      })
      

      if (response.ok) {
        const preference = await response.json();
        createCheckoutButton(preference.id);
        console.log(preference);
        
      } else {
        console.error("La solicitud no fue exitosa:", response.status, response.statusText);
      }
    } else {
      console.error("El carrito está vacío.");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    alert("error :(");
  }
});


const createCheckoutButton = (PreferenceId) => {

  const renderComponent = async () => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    mp.bricks().create("wallet", "wallet_container", {
      initialization: {
          preferenceId: PreferenceId,
      },
    });
  };

  renderComponent();
};

