import React, { useEffect, useState } from 'react';
import { Button, Table, FormControl, Form } from 'react-bootstrap';
import { LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VentasAdmin = () => {
  const [ventas, setVentas] = useState([]);
  const [filtro, setFiltro] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVentas = () => {
      axios.get('http://localhost:4000/api/admin/ventas')
        .then((response) => {
          setVentas(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener las ventas:', error);
        });
    };

    fetchVentas();
  }, []);

  const handleFilterChange = (event) => {
    setFiltro(event.target.value);
  };

  const ventasFiltradas = ventas.filter((venta) =>
    venta.usuario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="d-flex min-vh-100 bg-light">
      <aside className="mr-4" style={{ width: '250px' }}>
        <nav className="d-flex flex-column">
          <Button variant="light" className="text-left mb-2 d-flex align-items-center" onClick={() => navigate('/admin')}>
            <LayoutDashboard className="mr-2" />
            Panel de control
          </Button>
          <Button variant="light" className="text-left mb-2 d-flex align-items-center" onClick={() => navigate('/admin/productos')}>
            <Package className="mr-2" />
            Productos
          </Button>
          <Button variant="light" className="text-left mb-2 d-flex align-items-center" onClick={() => navigate('/admin/usuarios')}>
            <Users className="mr-2" />
            Usuarios
          </Button>
          <Button variant="light" className="text-left mb-2 d-flex align-items-center">
            <ShoppingCart className="mr-2" />
            Ventas
          </Button>
        </nav>
      </aside>

      <main className="flex-grow-1 container">
        <div className="py-4">
          <h5>Administrar Ventas</h5>
          <Form className="d-flex gap-3">
            <FormControl
              placeholder="Filtrar por usuario"
              value={filtro}
              onChange={handleFilterChange}
              style={{ maxWidth: '200px' }}
            />
          </Form>
        </div>

        <div className="py-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID de Compra</th>
                <th>Método de Pago</th>
                <th>Producto</th>
                <th>Usuario</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((venta) => (
                <tr key={venta.compraId}>
                  <td>{venta.compraId}</td>
                  <td>{venta.metodoPago}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.usuario}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.precio_u}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default VentasAdmin;