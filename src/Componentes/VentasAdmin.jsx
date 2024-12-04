import React, { useState } from 'react';
import { Button, Table, FormControl, Form } from 'react-bootstrap';
import { Trash2, LayoutDashboard, Package, Users, ShoppingCart, BarChart, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const VentasAdmin = () => {
  const [ventas, setVentas] = useState([
    { id: 1, metodoPago: "Tarjeta de Crédito", producto: "Laptop Gamer XTreme", usuario: "Juan Perez" },
    { id: 2, metodoPago: "PayPal", producto: "Mouse Inalámbrico Pro", usuario: "Maria Garcia" },
    { id: 3, metodoPago: "Transferencia Bancaria", producto: "SSD 1TB Ultrafast", usuario: "Carlos Lopez" },
    { id: 4, metodoPago: "Tarjeta de Débito", producto: "Monitor 4K HDR", usuario: "Ana Martinez" },
  ]);
  const [filtro, setFiltro] = useState('');

  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFiltro(event.target.value);
  };

  const eliminarVenta = (ventaId) => {
    setVentas((prevState) => prevState.filter((venta) => venta.id !== ventaId));
  };

  const ventasFiltradas = ventas.filter(venta =>
    venta.usuario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-grow-1 container">
        {/* Filtro de ventas */}
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

        {/* Sales Table */}
        <div className="py-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID de Compra</th>
                <th>Método de Pago</th>
                <th>Producto</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.metodoPago}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.usuario}</td>
                  <td>
                    <Button variant="light" className="p-1" onClick={() => eliminarVenta(venta.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </td>
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