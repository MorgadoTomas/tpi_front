// componentes/CarritoProductos.jsx
import React, { Component } from 'react';
import { ShoppingCart, Search, User, Minus, Plus, X } from "lucide-react";
import { Button, Form, InputGroup } from 'react-bootstrap';

class CarritoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      isCartOpen: true,
    };
  }

  incrementarCantidad = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  decrementarCantidad = () => {
    this.setState((prevState) => ({ quantity: Math.max(1, prevState.quantity - 1) }));
  };

  toggleCart = () => {
    this.setState((prevState) => ({ isCartOpen: !prevState.isCartOpen }));
  };

  render() {
    const { quantity, isCartOpen } = this.state;

    return (
      <div className="d-flex flex-column min-vh-100">
   
        {/* Main Content */}
        <main className="flex-grow-1 container p-4 position-relative">
          <div className="row">
            {/* Image Gallery */}
            <div className="col-md-6">
              <div className="bg-light mb-4" style={{ width: '100%', height: '300px' }}></div>
              <div className="d-flex gap-4">
                <div className="bg-light" style={{ width: '100px', height: '100px' }}></div>
                <div className="bg-light" style={{ width: '100px', height: '100px' }}></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h1 className="h3 font-weight-bold mb-2">GG Series G203</h1>
              <p className="h2 font-weight-bold mb-2">$36.500</p>
              <p className="text-muted mb-4">3 cuotas sin interés de $12.166</p>
              <ul className="list-unstyled mb-4">
                <li>Sensor óptico de 8000 dpi para mayor precisión y rapidez</li>
                <li>Diseño ergonómico con 6 botones configurables</li>
                <li>Compatible con Windows 7 (o superior) y macOS 10.11 (o superior)</li>
                <li>Conexión USB y cable para estabilidad en la conexión</li>
                <li>Rueda de desplazamiento para fácil navegación</li>
              </ul>
              <div className="d-flex align-items-center mb-4">
                <Button variant="outline-secondary" onClick={this.decrementarCantidad}>
                  <Minus />
                </Button>
                <span className="mx-4">{quantity}</span>
                <Button variant="outline-secondary" onClick={this.incrementarCantidad}>
                  <Plus />
                </Button>
              </div>
              <Button variant="dark" className="w-100">AGREGAR AL CARRITO</Button>
            </div>
          </div>

          {/* Cart Sidebar */}
          {isCartOpen && (
            <div className="position-fixed" style={{ right: 0, top: 0, bottom: 0, width: '300px', backgroundColor: 'white', padding: '1rem', boxShadow: '-2px 0px 10px rgba(0,0,0,0.2)' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4">Carrito de Compras</h2>
                <button onClick={this.toggleCart} className="btn-close"></button>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <span>GG Series G203</span>
                  <span>1</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between font-weight-bold">
                  <span>Subtotal:</span>
                  <span>$36.500</span>
                </div>
                <Form.Control type="text" placeholder="Código de cupón" className="my-3" />
                <div className="d-flex justify-content-between font-weight-bold">
                  <span>Total:</span>
                  <span>$36.500</span>
                </div>
              </div>
              <Button variant="dark" className="w-100">Finalizar Compra</Button>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default CarritoProductos;
