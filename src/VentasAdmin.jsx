// VentasAdmin.jsx
import React, { Component } from 'react';
import { Button, Table, FormControl, Form } from 'react-bootstrap';
import { Trash2, LayoutDashboard, Package, Users, ShoppingCart, BarChart, Settings } from "lucide-react";

class VentasAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ventas: [
        { id: 1, metodoPago: "Tarjeta de Crédito", producto: "Laptop Gamer XTreme", usuario: "Juan Perez" },
        { id: 2, metodoPago: "PayPal", producto: "Mouse Inalámbrico Pro", usuario: "Maria Garcia" },
        { id: 3, metodoPago: "Transferencia Bancaria", producto: "SSD 1TB Ultrafast", usuario: "Carlos Lopez" },
        { id: 4, metodoPago: "Tarjeta de Débito", producto: "Monitor 4K HDR", usuario: "Ana Martinez" },
      ],
      filtro: '',
    };
  }

  handleFilterChange = (event) => {
    this.setState({ filtro: event.target.value });
  }

  eliminarVenta = (ventaId) => {
    this.setState((prevState) => ({
      ventas: prevState.ventas.filter((venta) => venta.id !== ventaId)
    }));
  }

  render() {
    const ventasFiltradas = this.state.ventas.filter(venta =>
      venta.usuario.toLowerCase().includes(this.state.filtro.toLowerCase())
    );

    return (
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="mr-4" style={{ width: '250px' }}>
          <nav className="d-flex flex-column">
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <LayoutDashboard className="mr-2" />
              Panel de control
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Package className="mr-2" />
              Productos
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Users className="mr-2" />
              Usuarios
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <ShoppingCart className="mr-2" />
              Ventas
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <BarChart className="mr-2" />
              Análisis y Reportes
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Settings className="mr-2" />
              Configuración
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
                value={this.state.filtro}
                onChange={this.handleFilterChange}
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
                      <Button variant="light" className="p-1" onClick={() => this.eliminarVenta(venta.id)}>
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
  }
}

export default VentasAdmin;
