import express from 'express';
import { createServicio, deleteServicio, getServicios, getServiciosByCliente, updateServicio } from '../controller/servicioController.js';
import { validateServicio } from '../middleware/validations.js';
 
const router = express.Router();

router.get('/', getServicios);
router.get('/cliente/:id', getServiciosByCliente);
router.post('/', validateServicio, createServicio); 
router.put('/:id/:servicio', validateServicio, updateServicio);
router.delete('/:id/:servicio', deleteServicio);

export default router;