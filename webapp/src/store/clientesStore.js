// src/store/clientesStore.js
import axios from 'axios';
import { create } from 'zustand';

// Obtener la URL base de las variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const useClientesStore = create((set) => ({
  clientes: [],
  clienteSeleccionado: null,
  fetchClientes: async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      if (response.data.status === 'success') {
        set({ clientes: response.data.data });
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },
  fetchClientePorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/clientes/${id}`);
      if (response.data.status === 'success') {
        set({ clienteSeleccionado: response.data.data });
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },
  registrarCliente: async (clienteData) => {
    try {
      const response = await axios.post(`${API_URL}/clientes`, clienteData);
      if (response.data.status === 'success') {
        set((state) => ({
          clientes: [...state.clientes, response.data.data]
        }));
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) {
      return {message:error.response.data.message, error: error.response.data}
    }
  },
  actualizarCliente: async (id, clienteData) => {
    try {
      const response = await axios.put(`${API_URL}/clientes/${id}`, clienteData);
      if (response.data.status === 'success') {
        set((state) => ({
          clientes: state.clientes.map((cliente) =>
            cliente.identificacion === id ? { ...cliente, ...response.data.data } : cliente
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
  eliminarCliente: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/clientes/${id}`);
      if (response.data.status === 'success') {
        set((state) => ({
          clientes: state.clientes.filter((cliente) => cliente.identificacion !== id)
        }));
        return response.data
      } else {
        return response.data.message
      }
    } catch (error) { 
      return {message:error.response.data.message, error: error.response.data}
    }
  },

  setClienteSeleccionado: (cliente) => set({ clienteSeleccionado: cliente })
}));

export default useClientesStore;
