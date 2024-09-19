import Cliente from '../models/Cliente.js';
import Servicio from '../models/Servicio.js';

const formatResponse = (status, code, message, data = null) => ({
  status,
  code,
  message,
  data
});

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();

    if (clientes.length === 0) {
      return res.json(formatResponse('error', 500, 'No hay clientes registrados', []));
    }

    res.json(formatResponse('success', 200, 'Clientes obtenidos exitosamente', clientes));
  
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ identificacion: req.params.id });
    
    if (!cliente) {
      return res.status(404).json(formatResponse('error', 404, 'Cliente no encontrado', null));
    }

    res.json(formatResponse('success', 200, 'Cliente obtenido exitosamente', cliente));
  
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

export const createCliente = async (req, res) => { 
  const { identificacion } = req.body;
   
  // Verificar si el cliente ya existe
  const clienteExistente = await Cliente.findOne({ identificacion });
  if (clienteExistente) {
    return res.status(400).json(formatResponse('error', 400, 'Cliente ya registrado', null));
  }

  const cliente = new Cliente(req.body);
  try {
    const nuevoCliente = await cliente.save();
    res.status(201).json(formatResponse('success', 201, 'Cliente creado exitosamente', nuevoCliente));
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

export const updateCliente = async (req, res) => {
   
  try {
    // Verificar si el cliente existe
    const cliente = await Cliente.findOne({ identificacion: req.params.id });
    if (!cliente) {
      return res.status(404).json(formatResponse('error', 404, 'Cliente no encontrado', null));
    }

    // Actualizar cliente
    const clienteActualizado = await Cliente.findOneAndUpdate({ identificacion: req.params.id }, req.body, { new: true });
    res.json(formatResponse('success', 200, 'Cliente actualizado exitosamente', clienteActualizado));
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

//no se puede eliminar---------------------------------------------------------
export const deleteCliente = async (req, res) => {
  try {
    // Verificar si el cliente existe
    const cliente = await Cliente.findOne({ identificacion: req.params.id });
    if (!cliente) {
      return res.status(404).json(formatResponse('error', 404, 'Cliente no encontrado', null));
    }

    // Eliminar cliente
    await Cliente.findOneAndDelete({ identificacion: req.params.id });
    res.json(formatResponse('success', 200, 'Cliente eliminado exitosamente', null));
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};

export const getClienteYServicios = async (req, res) => {
  try {
    // Verificar si el cliente existe
    const cliente = await Cliente.findOne({ identificacion: req.params.id });
    if (!cliente) {
      return res.status(404).json(formatResponse('error', 404, 'Cliente no encontrado', null));
    }

    const servicios = await Servicio.find({ identificacion: req.params.id });
    res.json(formatResponse('success', 200, 'Cliente y servicios obtenidos exitosamente', { cliente, servicios }));
  } catch (error) {
    res.status(500).json(formatResponse('error', 500, error.message, null));
  }
};
