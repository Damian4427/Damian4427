import express from "express";
import cors from "cors";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: "TEST-3034103047923843-042221-75838a10cc2c02e09527fa3d5f8fef45-334300207",
});

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Soy el server :)");
});

app.post("/create_preference", async (req, res) => {
  try {
    const { productos } = req.body;

    const items = productos.map(producto => ({
      title: producto.nombre,
      quantity: Number (producto.cantidad),
      unit_price: Number (producto.precio),
    }));

    
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items
      }
      
    });
    

    res.json({
      id: result.id
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({
      error: "Error al crear la preferencia :("
    });
  }
});

app.get("/productos", (req, res) => {
  res.json({productos});
})

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});

