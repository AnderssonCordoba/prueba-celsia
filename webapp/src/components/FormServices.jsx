import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useServiciosStore from '../store/serviciosStore';

const initData = {
  identificacion: "",
  servicio: "Internet 200 MB",
  fechaInicio: "",
  ultimaFacturacion: "",
  ultimoPago: 0,
};

const FormServices = ({ show, onHide, tittle, identificacion }) => {
  const [formData, setFormData] = useState(initData);
  const [error, setError] = useState('');

  const { fetchServiciosPorCliente, registrarServicio, actualizarServicio, servicioSeleccionado } = useServiciosStore();

  useEffect(() => {
    if (servicioSeleccionado) {
      setFormData({
        identificacion: servicioSeleccionado.identificacion || '',
        servicio: servicioSeleccionado.servicio || 'Internet 200 MB',
        fechaInicio: servicioSeleccionado.fechaInicio ? format(new Date(servicioSeleccionado.fechaInicio), 'yyyy-MM-dd') : '',
        ultimaFacturacion: servicioSeleccionado.ultimaFacturacion ? format(new Date(servicioSeleccionado.ultimaFacturacion), 'yyyy-MM-dd') : '',
        ultimoPago: servicioSeleccionado.ultimoPago || 0,
      });
    }
  }, [servicioSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.identificacion = identificacion;

    // Asegúrate de que el valor de 'ultimoPago' es un número
    formData.ultimoPago = Number(formData.ultimoPago);

    try {
      let response;
      if (tittle === 'Registrar') {
        response = await registrarServicio(formData);
      } else {
        response = await actualizarServicio(servicioSeleccionado.identificacion, formData);
      }
      if (response.status) {
        setFormData(initData);
        await fetchServiciosPorCliente(identificacion); // Fetch services for the specific client
        onHide();
      } else {
        setError(response.message);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setError('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{tittle} Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="servicio">
            <Form.Label>Servicio</Form.Label>
            <Form.Control
              as="select"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              required
            >
              <option value="Internet 200 MB">Internet 200 MB</option>
              <option value="Internet 400 MB">Internet 400 MB</option>
              <option value="Internet 600 MB">Internet 600 MB</option>
              <option value="Directv Go">Directv Go</option>
              <option value="Paramount+">Paramount+</option>
              <option value="Win+">Win+</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="fechaInicio">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="ultimaFacturacion">
            <Form.Label>Ultima Facturacion</Form.Label>
            <Form.Control
              type="date"
              name="ultimaFacturacion"
              value={formData.ultimaFacturacion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="ultimoPago">
            <Form.Label>Último Pago</Form.Label>
            <Form.Control
              type="number"
              name="ultimoPago"
              value={formData.ultimoPago}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <p className='text-danger'>{error}</p>}

          <Button variant="primary" type="submit">
            {tittle}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormServices;