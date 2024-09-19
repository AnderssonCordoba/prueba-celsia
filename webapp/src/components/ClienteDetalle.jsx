import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useClientesStore from '../store/clientesStore';
import useServiciosStore from '../store/serviciosStore';
import FormServices from './FormServices';

const ClienteDetalle = () => {
  const { id } = useParams();
  const { clienteSeleccionado, fetchClientePorId } = useClientesStore();
  const { servicios, fetchServiciosPorCliente, setServicioSeleccionado, servicioSeleccionado } = useServiciosStore();
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formTitle, setFormTitle] = useState('Registrar');

  useEffect(() => {
    const init = () => {
      fetchClientePorId(id);
      fetchServiciosPorCliente(id);
    };
    init();
  }, [id, fetchClientePorId, fetchServiciosPorCliente]);

  const handleVerMas = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowModal(true);
  };

  const handleShowFormModal = (title, servicio = null) => {
    setFormTitle(title);
    setServicioSeleccionado(servicio);
    setShowFormModal(true);
  };

  const handleHideFormModal = () => setShowFormModal(false);

  if (!clienteSeleccionado) return <div>Cargando...</div>;

  return (
    <Container className='mt-4'>
      <h2>Detalles del Cliente</h2>
      
      <Table bordered>
        <tbody>
          <tr>
            <th>Identificación</th>
            <td>{clienteSeleccionado.identificacion}</td>
          </tr>
          <tr>
            <th>Nombres</th>
            <td>{clienteSeleccionado.nombres}</td>
          </tr>
          <tr>
            <th>Apellidos</th>
            <td>{clienteSeleccionado.apellidos}</td>
          </tr>
          <tr>
            <th>Tipo de Identificación</th>
            <td>{clienteSeleccionado.tipoIdentificacion}</td>
          </tr>
          <tr>
            <th>Fecha de Nacimiento</th>
            <td>{new Date(clienteSeleccionado.fechaNacimiento).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>Número de Celular</th>
            <td>{clienteSeleccionado.numeroCelular}</td>
          </tr>
          <tr>
            <th>Correo Electrónico</th>
            <td>{clienteSeleccionado.correoElectronico}</td>
          </tr>
        </tbody>
      </Table>

      <h3 className="mt-4">Servicios del Cliente</h3>
      <Button variant="primary" onClick={() => handleShowFormModal('Registrar')} className="mb-3">
        Registrar Servicio
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Última Facturación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio._id}>
              <td>{servicio.servicio}</td>
              <td>{new Date(servicio.ultimaFacturacion).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleVerMas(servicio)}>
                  Ver más
                </Button>
                <Button variant="warning" size="sm" className="ml-2" onClick={() => handleShowFormModal('Editar', servicio)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para mostrar detalles del servicio */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {servicioSeleccionado && (
            <Table bordered>
              <tbody>
                <tr>
                  <th>Servicio</th>
                  <td>{servicioSeleccionado.servicio}</td>
                </tr>
                <tr>
                  <th>Fecha de Inicio</th>
                  <td>{new Date(servicioSeleccionado.fechaInicio).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Última Facturación</th>
                  <td>{new Date(servicioSeleccionado.ultimaFacturacion).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Último Pago</th>
                  <td>${servicioSeleccionado.ultimoPago}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <FormServices show={showFormModal} onHide={handleHideFormModal} identificacion={id} tittle={formTitle} />
    </Container>
  );
};

export default ClienteDetalle;