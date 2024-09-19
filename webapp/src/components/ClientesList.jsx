import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useClientesStore from '../store/clientesStore';
import FormCliente from './FormCliente';

const ClientesList = () => {
  const { clientes, fetchClientes, eliminarCliente, setClienteSeleccionado } = useClientesStore();
  const [showModal, setShowModal] = useState(false);
  const [tittle, setTittle] = useState('')

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleShowModal = (tittle, cliente=null) => {
    setTittle(tittle)
    setShowModal(true)
    setClienteSeleccionado(cliente)
  };
  const handleHideModal = () => setShowModal(false);

  return (
    <Container className="mt-4">
      <h2>Lista de Clientes</h2>
      <Button variant="primary" onClick={()=>handleShowModal('Registrar')} className="mb-3">
        Registrar Cliente
      </Button>
        {
          clientes.length>0?  
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Acciones</th>
                <th>Más</th>
              </tr>
            </thead>
            <tbody>
              { clientes.map((cliente) => (
                <tr key={cliente.identificacion}>
                  <td>{cliente.identificacion}</td>
                  <td>{cliente.nombres}</td>
                  <td>{cliente.apellidos}</td>
                  <td>
                    <Button variant="warning" size="sm" className='m-1' onClick={()=>handleShowModal('Editar', cliente)}>
                      Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={()=>eliminarCliente(cliente.identificacion)}>
                      Eliminar
                    </Button>
                  </td>
                  <td> 
                    <Link to={`/cliente/${cliente.identificacion}`}>
                      <Button variant="primary" size="sm" className="mb-3">
                        Ver más
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </Table> 
            :
          <p>No hay clientes registrados</p>
        }

      <FormCliente show={showModal} onHide={handleHideModal} tittle={tittle} />
    </Container>
  );
};

export default ClientesList;
