import React, { useState, useEffect } from 'react';

const CarritoProductos = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    // Calcular el precio total
    const totalCalculado = carritoGuardado.reduce((acc, producto) => {
      return acc + parseFloat(producto.precio) * producto.cantidad;
    }, 0);
    setTotal(totalCalculado);
  }, []);

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (index, cantidad) => {
    if (cantidad < 1) return; // Evitar cantidades negativas o cero

    const carritoActualizado = [...carrito];
    carritoActualizado[index].cantidad = cantidad;
    setCarrito(carritoActualizado);
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));

    // Recalcular el total
    const totalCalculado = carritoActualizado.reduce((acc, producto) => {
      return acc + parseFloat(producto.precio) * producto.cantidad;
    }, 0);
    setTotal(totalCalculado);
  };

  const eliminarDelCarrito = (index) => {
    const carritoActualizado = carrito.filter((_, i) => i !== index);
    setCarrito(carritoActualizado);
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));

    // Recalcular el total
    const totalCalculado = carritoActualizado.reduce((acc, producto) => {
      return acc + parseFloat(producto.precio) * producto.cantidad;
    }, 0);
    setTotal(totalCalculado);
  };

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
                <p>{producto.descripcion}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
              <div className="col-md-3 text-end">
                {/* Botones para ajustar la cantidad */}
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => actualizarCantidad(index, producto.cantidad - 1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{producto.cantidad}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => actualizarCantidad(index, producto.cantidad + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarDelCarrito(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Mostrar precio total */}
          <div className="d-flex justify-content-between mt-4">
            <h3>Total:</h3>
            <p className="h4">${total.toFixed(2)}</p>
          </div>
          <br />

          <div className="text-end">
            <button className="btn btn-success">Finalizar compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoProductos;
