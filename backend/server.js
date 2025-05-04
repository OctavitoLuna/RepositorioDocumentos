const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Rutas de usuario
const documentRoutes = require('./routes/documentRoutes'); // Rutas de documentos
const commentRoutes = require('./routes/commentRoutes'); // Rutas de comentarios
const permissionRoutes = require('./routes/permissionRoutes'); // Rutas de permisos
const logRoutes = require('./routes/logRoutes'); // Rutas de logs

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar con MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });

// Usar las rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/documentos', documentRoutes);
app.use('/api/comentarios', commentRoutes);
app.use('/api/permisos', permissionRoutes);
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
