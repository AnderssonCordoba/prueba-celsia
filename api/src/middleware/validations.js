import Cliente from '../models/Cliente.js';
import Servicio from '../models/Servicio.js';

export const validateCliente = async (req, res, next) => {
  const { identificacion, nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico } = req.body;

  if (!identificacion || !nombres || !apellidos || !tipoIdentificacion || !fechaNacimiento || !numeroCelular || !correoElectronico) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (!['CC', 'TI', 'CE', 'RC'].includes(tipoIdentificacion)) {
    return res.status(400).json({ message: 'Tipo de identificación no válido' });
  }

  if (!/^\d{10}$/.test(numeroCelular)) {
    return res.status(400).json({ message: 'Número de celular no válido, debe componerse por 10 números' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
    return res.status(400).json({ message: 'Correo electrónico no válido' });
  }

  try {
    const clienteExistente = await Cliente.findOne({ identificacion });
    if (clienteExistente && req.method === 'POST') {
      return res.status(400).json({ message: 'El cliente ya existe' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar el cliente' });
  }

  next();
};

export const validateServicio = async (req, res, next) => {
  const { identificacion, servicio, fechaInicio, ultimaFacturacion, ultimoPago } = req.body;

  if (!identificacion || !servicio || !fechaInicio || !ultimaFacturacion || ultimoPago === undefined) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const serviciosValidos = ['Internet 200 MB', 'Internet 400 MB', 'Internet 600 MB', 'Directv Go', 'Paramount+', 'Win+'];
  if (!serviciosValidos.includes(servicio)) {
    return res.status(400).json({ message: 'Tipo de servicio no válido' });
  }

  if (isNaN(Date.parse(fechaInicio)) || isNaN(Date.parse(ultimaFacturacion))) {
    return res.status(400).json({ message: 'Formato de fecha no válido' });
  }

  if (typeof ultimoPago !== 'number') {
    return res.status(400).json({ message: 'El último pago debe ser un número' });
  }

  try {
    const cliente = await Cliente.findOne({ identificacion });
    if (!cliente) {
      return res.status(400).json({ message: 'El cliente no existe' });
    }

    const servicioExistente = await Servicio.findOne({ identificacion, servicio });
    if (servicioExistente && req.method === 'POST') {
      return res.status(400).json({ message: 'El servicio ya existe para este cliente' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar el servicio' });
  }

  next();
};