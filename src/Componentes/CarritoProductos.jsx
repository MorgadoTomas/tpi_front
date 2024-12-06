import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarritoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrito: [],
      totalCompra: 0,
    };
  }

  componentDidMount() {
    const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const carritoInicializado = carritoGuardado.map((producto) => ({
      ...producto,
      cantidad: producto.cantidad || 1,
    }));

    const totalCompra = carritoInicializado.reduce(
      (acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad,
      0
    ).toFixed(2);

    this.setState({ carrito: carritoInicializado, totalCompra });
  }

  actualizarCantidad(index, cantidad) {
    if (cantidad < 1) return;
    const carritoActualizado = [...this.state.carrito];
    const producto = carritoActualizado[index];

    if (cantidad > producto.stock) {
      cantidad = producto.stock;
    }

    carritoActualizado[index].cantidad = cantidad;

    const totalCompra = carritoActualizado.reduce(
      (acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad,
      0
    ).toFixed(2);

    this.setState({ carrito: carritoActualizado, totalCompra });
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  }

  eliminarProducto(index) {
    const carritoActualizado = this.state.carrito.filter((_, i) => i !== index);
    const totalCompra = carritoActualizado.reduce(
      (acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad,
      0
    ).toFixed(2);

    this.setState({ carrito: carritoActualizado, totalCompra });
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  }

  render() {
    const { carrito, totalCompra } = this.state;

    return (
      <div className="container my-5">
        <h1 className="mb-4">Tu carrito de compras</h1>
        {carrito.length === 0 ? (
          <p>No tienes productos en el carrito.</p>
        ) : (
          <div>
            {carrito.map((producto, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-3">
                  <img
                    src={`http://localhost:4000/images/${producto.imagenes[0]}`}
                    alt={producto.nombre}
                    className="w-100"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-6">
                  <h4>{producto.nombre}</h4>
                  <p>Precio: ${producto.precio}</p>
                  <p>Stock disponible: {producto.stock}</p>
                </div>
                <div className="col-md-3 text-end">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => this.actualizarCantidad(index, producto.cantidad - 1)}
                      disabled={producto.cantidad <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{producto.cantidad}</span>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => this.actualizarCantidad(index, producto.cantidad + 1)}
                      disabled={producto.cantidad >= producto.stock}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.eliminarProducto(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <hr />
            <h3>Total: ${totalCompra}</h3>
            <Link
              to={{
                pathname: '/formulario-compra',
                state: {
                  carrito: carrito,
                  totalCompra: totalCompra,
                },
              }}
              className="btn btn-success mt-3"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default CarritoProductos;