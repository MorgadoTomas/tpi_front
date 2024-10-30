// componentes/Productos.jsx
import React, { Component } from 'react';
import { ShoppingCart, Search, Truck, CreditCard, Lock } from "lucide-react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import '../App.css';

class Productos extends Component {
  render() {
    return (
      <div className="min-vh-100 d-flex flex-column">

        {/* Main Content */}
        <main className="flex-grow container d-flex p-4">
          {/* Sidebar */}
          <aside className="w-25 mr-1">
            <h2 className="h1 font-weight-bold mb-4 text-center">CATEGORIAS</h2>
            <div className="mb-4">
              <h3 className="font-weight-semibold mb-2">Periféricos</h3>
              <div className="mb-2">
                <input type="checkbox" id="teclados" />
                <label htmlFor="teclados" className="ml-2">Teclados</label>
              </div>
              <div className="mb-2">
                <input type="checkbox"  id="mouse" />
                <label htmlFor="mouse" className="ml-2">Mouse</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="monitores" />
                <label htmlFor="monitores" className="ml-2">Monitores</label>
              </div>
            </div>

            <div>
              <h3 className="font-weight-semibold mb-2">Componentes</h3>
              <div className="mb-2">
                <input type="checkbox" id="procesadores" />
                <label htmlFor="procesadores" className="ml-2">Procesadores</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="motherboards" />
                <label htmlFor="motherboards" className="ml-2">Motherboards</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="memoria-ram" />
                <label htmlFor="memoria-ram" className="ml-2">Memoria RAM</label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-grow">
            <div className="row">
              {[...Array(3)].map((_, index) => (
                <div key={index} id="productos">
                  <div className="border rounded-lg shadow-sm d-flex align-items-center justify-content-center" style={{ height: '200px', backgroundColor: '#e0e0e0' }}>
                    {/* Placeholder for product image */}
                    <div style={{ width: '80%', height: '80%', backgroundColor: '#ccc' }}></div>
                  </div>
                  <br />
                  <div className="border rounded-lg shadow-sm d-flex align-items-center justify-content-center" style={{ height: '200px', backgroundColor: '#e0e0e0' }}>
                    {/* Placeholder for product image */}
                    <div style={{ width: '80%', height: '80%', backgroundColor: '#ccc' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        </div>
    );
  }
}

export default Productos;