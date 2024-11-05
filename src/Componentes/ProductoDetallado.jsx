// ProductosDetallados.jsx
import React, { Component } from 'react';
import { ShoppingCart, Search, Truck, CreditCard, Lock, User, Minus, Plus } from "lucide-react";
import { Button, Form, InputGroup } from 'react-bootstrap';

class ProductosDetallados extends Component {
  constructor() {
    super();
    this.state = { quantity: 1 };
  }

  handleQuantityChange(increment) {
    this.setState((prevState) => ({
      quantity: Math.max(1, prevState.quantity + increment),
    }));
  }

  render() {
    const { quantity } = this.state;
    return (
      <div className="min-vh-100 d-flex flex-column">


        {/* Main Content */}
        <main className="flex-grow container p-4">
          <div className="row">
            {/* Image Section */}
            <div className="col-md-6 mb-4">
              <div className="bg-secondary w-100" style={{ height: '300px' }}></div>
              <div className="d-flex gap-2 mt-4">
                <div className="bg-secondary" style={{ width: '100px', height: '100px' }}></div>
                <div className="bg-secondary" style={{ width: '100px', height: '100px' }}></div>
              </div>
            </div>

            {/* Details Section */}
            <div className="col-md-6">
              <h1 className="h3 font-weight-bold mb-3">GG Series G203</h1>
              <p className="display-4 font-weight-bold mb-2">$36,500</p>
              <p className="text-muted mb-4">3 cuotas sin interés de $12,166</p>
              <ul className="list-unstyled mb-4">
                <li>- Sensor óptico de 8000 dpi para mayor precisión y rapidez</li>
                <li>- Diseño ergonómico con 6 botones configurables</li>
                <li>- Compatible con Windows 7 (o superior) y macOS 10.11 (o superior)</li>
                <li>- Conexión USB y cable para estabilidad en la conexión</li>
                <li>- Rueda de desplazamiento para fácil navegación</li>
                <li>- Ideal para gamers que buscan mejorar su rendimiento</li>
              </ul>
              <div className="mb-4">
                <p className="font-weight-bold mb-2">Colores:</p>
                <div className="d-flex gap-2">
                  {['bg-secondary', 'bg-danger', 'bg-primary', 'bg-success', 'bg-warning'].map((colorClass, index) => (
                    <div key={index} className={`${colorClass} rounded-circle border`} style={{ width: '24px', height: '24px' }}></div>
                  ))}
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <span className="mr-4">CANTIDAD</span>
                <Button variant="outline-secondary" size="sm" onClick={() => this.handleQuantityChange(-1)}>
                  <Minus size={14} />
                </Button>
                <span className="mx-3">{quantity}</span>
                <Button variant="outline-secondary" size="sm" onClick={() => this.handleQuantityChange(1)}>
                  <Plus size={14} />
                </Button>
              </div>
              <Button variant="dark" className="w-100">AGREGAR AL CARRITO</Button>
            </div>
          </div>
        </main>

        </div>
    );
  }
}

export default ProductosDetallados;
