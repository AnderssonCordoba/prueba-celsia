import Cliente from '../models/Cliente.js';
import Servicio from '../models/Servicio.js';

const formatResponse = (status, code, message, data = null) => ({
  status,
  code,
  message,
  data
});

// Obtener todos los servicios
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();

    if (servicios.length === 0) {
      return res.json(formatResponse('error', 500, 'No hay servicios registrados', []));
    }

    res.json(formatResponse('success', 200, 'Servicios obtenidos exitosamente', servicios));
  
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

// Obtener servicios por identificacion del cliente
export const getServiciosByCliente = async (req, res) => {
  try {
    const servicios = await Servicio.find({ identificacion: req.params.id });

    if (servicios.length === 0) {
      return res.status(404).json(formatResponse('error', 404, 'No se encontraron servicios para este cliente', []));
    }

    res.json(formatResponse('success', 200, 'Servicios obtenidos exitosamente para el cliente', servicios));
  
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
  const { identificacion } = req.body;

  try {
    // Verificar si el cliente existe
    const clienteExiste = await Cliente.findOne({ identificacion });
    if (!clienteExiste) {
      return res.status(404).json(formatResponse('error', 404, 'Cliente no encontrado', null));
    }

    // Verificar si el servicio ya está registrado
    const servicioExistente = await Servicio.findOne({ identificacion, servicio: req.body.servicio });
    if (servicioExistente) {
      return res.status(400).json(formatResponse('error', 400, 'El servicio ya está registrado para este cliente', null));
    }

    const servicio = new Servicio(req.body);
    const nuevoServicio = await servicio.save();

    res.status(201).json(formatResponse('success', 201, 'Servicio creado exitosamente', nuevoServicio));
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

// Actualizar un servicio existente
export const updateServicio = async (req, res) => {
  const { id, servicio } = req.params;

  try {
    // Verificar si el servicio existe
    const servicioActualizado = await Servicio.findOneAndUpdate(
      { identificacion: id, servicio: servicio },
      req.body,
      { new: true }
    );
    if (!servicioActualizado) {
      return res.status(404).json(formatResponse('error', 404, 'Servicio no encontrado', null));
    }

    res.json(formatResponse('success', 200, 'Servicio actualizado exitosamente', servicioActualizado));
  } catch (error) {
    res.status(400).json(formatResponse('error', 400, error.message, null));
  }
};

// Eliminar un servicio
export const deleteServicio = async (req, res) => {
  const { id, servicio } = req.params;

  try {
    // Verificar si el servicio existe
    const servicioEliminado = await Servicio.findOneAndDelete(
      { identificacion: id, servicio: servicio }
    );
    if (!servicioEliminado) {
      return res.status(404).json(formatResponse('error', 404, 'Servicio no encontrado', null));
    }

    res.json(formatResponse('success', 200, 'Servicio eliminado exitosamente', null));
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

