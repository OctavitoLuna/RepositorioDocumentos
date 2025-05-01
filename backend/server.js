const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); // Cargar variables de entorno
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para manejar peticiones con JSON

// Conectar con MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Detener el proceso si no puede conectar
  });

const PORT = process.env.PORT || 5000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
