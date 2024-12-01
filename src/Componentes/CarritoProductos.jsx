import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarritoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrito: [],
      totalCompra: 0, // Agregamos el totalCompra en el estado
    };
  }

  componentDidMount() {
    // Cargar el carrito desde sessionStorage
    const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Asegurarse de que la cantidad de cada producto sea 1 al cargar
    const carritoInicializado = carritoGuardado.map((producto) => ({
      ...producto,
      cantidad: producto.cantidad || 1, // Si no tiene cantidad, inicializar en 1
    }));

    // Calculamos el total de la compra
    const totalCompra = carritoInicializado.reduce(
      (acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad,
      0
    ).toFixed(2);

    this.setState({ carrito: carritoInicializado, totalCompra }); // Guardamos el total en el estado
  }

  // Función para actualizar la cantidad de un producto en el carrito
  actualizarCantidad(index, cantidad) {
    if (cantidad < 1) return; // Evitar cantidades negativas
    const carritoActualizado = [...this.state.carrito];
    const producto = carritoActualizado[index];

    // Limitar la cantidad al stock disponible
    if (cantidad > producto.stock) {
      cantidad = producto.stock; // Si la cantidad es mayor que el stock, se ajusta a la cantidad máxima disponible
    }

    carritoActualizado[index].cantidad = cantidad;

    // Recalculamos el total
    const totalCompra = carritoActualizado.reduce(
      (acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad,
      0
    ).toFixed(2);

    this.setState({ carrito: carritoActualizado, totalCompra });
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  }

  // Función para eliminar un producto del carrito
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
                    src={`http://localhost:8080/images/${producto.imagenes[0]}`}
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
                  totalCompra: totalCompra, // Ahora se pasa el totalCompra
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
