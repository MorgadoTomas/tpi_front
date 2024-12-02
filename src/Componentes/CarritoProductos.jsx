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
