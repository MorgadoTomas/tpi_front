// componentes/Admin.jsx
import React, { Component } from 'react';
import { LayoutDashboard, Package, Users, ShoppingCart, BarChart, Settings, User } from "lucide-react";
import { Button } from 'react-bootstrap';

class Admin extends Component {
  render() {
    return (
      <div className="min-vh-100 bg-light">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container px-4 py-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <h1 className="h5 font-weight-bold mr-4">TechStore Admin</h1>
              <div className="h2 font-weight-bold">(LOGO)</div>
            </div>
            <div className="d-flex align-items-center">
              <User className="mr-2" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container py-4 d-flex">
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

          {/* Main Dashboard Area */}
          <main className="flex-grow-1">
            <h2 className="h4 font-weight-bold mb-4">PANEL DE CONTROL</h2>
            
            {/* Dashboard Cards */}
            <div className="row mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="col-md-3 mb-3">
                  <div className="bg-white p-4 rounded shadow-sm"></div>
                </div>
              ))}
            </div>

            {/* Tables */}
            <div className="row">
              {/* Top Selling Products */}
              <div className="col-md-6 mb-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="h6 font-weight-bold mb-3">Producto Más Vendidos</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Laptop Gamer XTreme</td>
                        <td className="text-right">57 unidades</td>
                      </tr>
                      <tr>
                        <td>Mouse Inalámbrico Pro</td>
                        <td className="text-right">135 unidades</td>
                      </tr>
                      <tr>
                        <td>SSD 1TB Ultrafast</td>
                        <td className="text-right">64 unidades</td>
                      </tr>
                      <tr>
                        <td>Monitor 4K HDR</td>
                        <td className="text-right">108 unidades</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Latest Orders */}
              <div className="col-md-6 mb-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="h6 font-weight-bold mb-3">Últimos Pedidos</h3>
                  <table className="table">
                    <tbody>
                      {["Juan Perez", "Maria Garcia", "Carlos Lopez", "Ana Martinez"].map((name, index) => (
                        <tr key={index}>
                          <td>#{12345 + index} - {name}</td>
                          <td className="text-right">
                            <Button variant="link" size="sm">Ver detalles</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Admin;



