import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useClientesStore from '../store/clientesStore';

const initData = {
  identificacion: '',
  nombres: '',
  apellidos: '',
  tipoIdentificacion: 'CC',
  fechaNacimiento: '',
  numeroCelular: '',
  correoElectronico: ''
}

const FormCliente = ({ show, onHide, tittle }) => {
  const { fetchClientes, registrarCliente, clienteSeleccionado, actualizarCliente} = useClientesStore();
  const [formData, setFormData] = useState(initData);
  const [error, setError] = useState('')
  
  useEffect(() => {
    if (clienteSeleccionado) {
      const formattedDate = clienteSeleccionado.fechaNacimiento 
        ? format(new Date(clienteSeleccionado.fechaNacimiento), 'yyyy-MM-dd') 
        : '';
        
      setFormData({
        identificacion: clienteSeleccionado.identificacion || '',
        nombres: clienteSeleccionado.nombres || '',
        apellidos: clienteSeleccionado.apellidos || '',
        tipoIdentificacion: clienteSeleccionado.tipoIdentificacion || 'CC',
        fechaNacimiento: formattedDate,
        numeroCelular: clienteSeleccionado.numeroCelular || '',
        correoElectronico: clienteSeleccionado.correoElectronico || ''
      });
    }
  }, [clienteSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if(tittle==='Registrar'){
        response= await registrarCliente( formData); 
      }else{
        response= await actualizarCliente( clienteSeleccionado.identificacion, formData);  
      }
      if(response.status){
        setFormData(initData)
        await fetchClientes(); 
        onHide(); 
      }else{
        setError(response.message)
      }
    } catch (error) {
      console.log(error.message)
      setError(error.message);
    }
    setError('')
  };

  const handleClose = () =>{
    setFormData(initData)
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tittle} Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="identificacion">
            <Form.Label>Identificación</Form.Label>
            <Form.Control
              type="number"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="nombres">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="apellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="tipoIdentificacion">
            <Form.Label>Tipo de Identificación</Form.Label>
            <Form.Control
              as="select"
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleChange}
              required
            >
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="CE">CE</option>
              <option value="RC">RC</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="fechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="numeroCelular">
            <Form.Label>Número de Celular</Form.Label>
            <Form.Control
              type="number"
              name="numeroCelular"
              placeholder='minimo 10 caracteres'
              value={formData.numeroCelular}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="correoElectronico">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {
            error &&<p className='text-danger'>{error}</p>
          }
          
          {
            tittle==="Registrar"?
            <Button variant="primary" type="submit">
              {tittle}
            </Button>:
            <Button variant="warning" type="submit">
              {tittle}
            </Button>
          }
        </Form>
      </Modal.Body> 
    </Modal>
  );
}

export default FormCliente