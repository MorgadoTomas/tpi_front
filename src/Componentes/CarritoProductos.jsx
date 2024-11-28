import React, { useState, useEffect } from 'react';

const CarritoProductos = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (index) => {
    const carritoActualizado = carrito.filter((_, i) => i !== index);
    setCarrito(carritoActualizado);
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));
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
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarDelCarrito(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="text-end">
            <button className="btn btn-success">Finalizar compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoProductos;
