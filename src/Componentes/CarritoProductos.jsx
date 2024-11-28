// componentes/CarritoProductos.jsx
import React, { Component } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Minus, Plus } from 'lucide-react';

class CarritoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        {
          id: "id producto",
          nombre: 'Nombre producto',
          precio: "Precio producto",
          cantidad: "cantidad producto",
          imagen: 'url imagen',
        },
      ],
    };
  }

  incrementarCantidad = (id) => {
    this.setState((prevState) => {
      const productos = prevState.productos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      );
      const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
      return { productos, total };
    });
  };

  decrementarCantidad = (id) => {
    this.setState((prevState) => {
      const productos = prevState.productos.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      );
      const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
      return { productos, total };
    });
  };

  

  render() {
    const { productos, total, envio, codigoPostal } = this.state;
    const subtotal = total + envio;

    return (
      <div className="d-flex flex-column min-vh-100">
        {/* Main Content */}
        <main className="flex-grow-1 container p-4 position-relative">
          {/* Cart Sidebar */}
          <div
            className="position-fixed"
            style={{
              right: 0,
              top: 0,
              bottom: 0,
              width: '300px',
              backgroundColor: 'white',
              padding: '1rem',
              boxShadow: '-2px 0px 10px rgba(0,0,0,0.2)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4">Carrito de Compras</h2>
              <button className="btn-close"></button>
            </div>

            {/* Lista de Productos */}
            {productos.map((producto) => (
              <div key={producto.id} className="mb-4">
                <div className="d-flex justify-content-between">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <span>{producto.nombre} ({producto.cantidad})</span>
                  <div>
                    <Button variant="outline-secondary" onClick={() => this.decrementarCantidad(producto.id)}>
                      <Minus />
                    </Button>
                    <Button variant="outline-secondary" onClick={() => this.incrementarCantidad(producto.id)}>
                      <Plus />
                    </Button>
                  </div>
                  <span>${producto.precio * producto.cantidad}</span>
                </div>
                <hr />
              </div>
            ))}


            {/* Total */}
            <div className="d-flex justify-content-between font-weight-bold">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>



            {/* Finalizar compra */}
            <Button variant="dark" className="w-100">
              Finalizar Compra
            </Button>
          </div>
        </main>
      </div>
    );
  }
}

export default CarritoProductos;
