import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { LayoutDashboard, Package, Users, ShoppingCart, BarChart, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importa Link

class Admin extends Component {
  render() {
    return (
      <div className="min-vh-100 bg-light">
        {/* Main Content */}
        <div className="container py-4 d-flex">
          {/* Sidebar */}
          <aside className="mr-4" style={{ width: '250px' }}>
            <nav className="d-flex flex-column">
              <Link to="/admin" className="text-left mb-2 d-flex align-items-center btn btn-light">
                <LayoutDashboard className="mr-2" />
                Panel de control
              </Link>
              <Link to="/admin/productos" className="text-left mb-2 d-flex align-items-center btn btn-light">
                <Package className="mr-2" />
                Productos
              </Link>
              <Link to="/admin/usuarios" className="text-left mb-2 d-flex align-items-center btn btn-light">
                <Users className="mr-2" />
                Usuarios
              </Link>
              <Link to="/admin/ventas" className="text-left mb-2 d-flex align-items-center btn btn-light">
                <ShoppingCart className="mr-2" />
                Ventas
              </Link>
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
                      {["Juan Perez", "Maria Garcia", "Carlos Lopez", "Ana Martinez"].map((cliente, i) => (
                        <tr key={i}>
                          <td>{cliente}</td>
                          <td className="text-right">#1000{i}</td>
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