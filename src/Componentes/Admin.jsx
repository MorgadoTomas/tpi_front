import React, { Component } from 'react';
import { Package, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importa Link

class Admin extends Component {
  render() {
    return (
      <div className="d-flex flex-column min-vh-10 bg-light">
        {/* Main Content */}
        <main className="d-flex justify-content-center align-items-center" style={{ height: '50vh'}}>
          <div className="text-center">
            <h2 className="h4 font-weight-bold mb-4">PANEL DE CONTROL</h2>

            {/* Centered Buttons */}
            <div>
              <Link to="/admin/productos" className="btn btn-primary mb-3 d-block">
                <Package className="mr-2" />
                Productos
              </Link>
              <Link to="/admin/usuarios" className="btn btn-primary mb-3 d-block">
                <Users className="mr-2" />
                Usuarios
              </Link>
              <Link to="/admin/ventas" className="btn btn-primary mb-3 d-block">
                <ShoppingCart className="mr-2" />
                Ventas
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Admin;