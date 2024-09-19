// src/store/serviciosStore.js
import axios from 'axios';
import { create } from 'zustand';

// Obtener la URL base de las variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const useServiciosStore = create((set) => ({
  servicios: [],
  servicioSeleccionado: null,

  // Obtener todos los servicios
  fetchServicios: async () => {
    try {
      const response = await axios.get(`${API_URL}/servicios`);
      if (response.data.status === 'success') {
        set({ servicios: response.data.data });
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },

  // Obtener servicios por identificacion del cliente
  fetchServiciosPorCliente: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/servicios/cliente/${id}`); 
      if (response.data.status === 'success') {
        set({ servicios: response.data.data });
        return response.data
      } else {
        set({ servicios: [] });
        return response.data.message
      }
    } catch (error) {
      set({ servicios: [] });
      return {message:error.response.data.message, error: error.response.data}
    }
  },

  // Registrar un nuevo servicio
  registrarServicio: async (servicioData) => {
    try {
      const response = await axios.post(`${API_URL}/servicios`, servicioData);
      if (response.data.status === 'success') {
        set((state) => ({
          servicios: [...state.servicios, response.data.data]
        }));
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },

  // Actualizar un servicio existente
  actualizarServicio: async (id, servicioData) => {
    try {
      const response = await axios.put(`${API_URL}/servicios/${id}/${servicioData.servicio}`, servicioData);
      if (response.data.status === 'success') {
        set((state) => ({
          servicios: state.servicios.map((servicio) =>
            servicio._id === id && servicio.servicio === servicioData.servicio
              ? { ...servicio, ...servicioData }
              : servicio
          )
        }));
        return response.data
      } else {
         return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },

  // Eliminar un servicio
  eliminarServicio: async (id, servicio) => {
    try {
      const response = await axios.delete(`${API_URL}/servicios/${id}/${servicio}`);
      if (response.data.status === 'success') {
        set((state) => ({
          servicios: state.servicios.filter((s) => s._id !== id || s.servicio !== servicio)
        }));
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },

  setServicioSeleccionado: (servicio) => set({ servicioSeleccionado: servicio })
}));

export default useServiciosStore;
