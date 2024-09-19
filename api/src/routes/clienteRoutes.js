import express from 'express';
import { createCliente, deleteCliente, getClienteById, getClientes, getClienteYServicios, updateCliente } from '../controller/clienteController.js';
import { validateCliente } from '../middleware/validations.js';

const router = express.Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', validateCliente, createCliente);
router.put('/:id', validateCliente, updateCliente);
router.delete('/:id', deleteCliente);
router.get('/:id/servicios', getClienteYServicios);

export default router;