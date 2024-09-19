import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/database/MongoDB.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import servicioRoutes from './src/routes/servicioRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas 
app.use('/api/clientes', clienteRoutes);
app.use('/api/servicios', servicioRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;