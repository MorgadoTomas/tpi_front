import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductoDetallado = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/admin/productos/${id}`)
      .then((response) => {
        setProducto(response.data.producto);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar los detalles del producto.');
      });
  }, [id]);

  const agregarAlCarrito = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('Debes iniciar sesión para agregar productos al carrito.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    const existeProducto = carrito.some((item) => item.id === producto.id);

    if (existeProducto) {
      setMensaje('Este producto ya está en el carrito.');
      setTimeout(() => setMensaje(''), 3000);
    } else {
      carrito.push(producto);
      sessionStorage.setItem('carrito', JSON.stringify(carrito));
      setMensaje('Producto agregado al carrito.');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const getMensajeColor = () => {
    if (mensaje === 'Debes iniciar sesión para agregar productos al carrito.') {
      return 'red';
    }
    if (mensaje === 'Este producto ya está en el carrito.' || mensaje === 'Producto agregado al carrito.') {
      return 'green';
    }
    return 'black';
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!producto) return <p>Cargando detalles del producto...</p>;

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow container p-4">
        <div className="row">
          <div className="col-md-6">
            {producto.imagenes[0] && (
              <img
                src={`http://localhost:4000/images/${producto.imagenes[0]}`}
                alt={producto.nombre}
                className="w-100 mb-3"
                style={{ height: '300px', objectFit: 'cover' }}
              />
            )}
            <div className="d-flex gap-2 mt-4">
              {producto.imagenes.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/images/${img}`}
                  alt={`Producto ${index + 1}`}
                  className="rounded"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h1 className="h3 mb-3">{producto.nombre}</h1>
            <p className="display-4 mb-2">${producto.precio}</p>
            <p className="text-muted">{producto.descripcion}</p>
            <ul>
              <li><strong>Marca:</strong> {producto.marca}</li>
              <li><strong>Stock:</strong> {producto.stock}</li>
            </ul>
            <button
              className="btn btn-dark w-100"
              onClick={agregarAlCarrito}
            >
              Agregar al carrito
            </button>
            {mensaje && <p style={{ color: getMensajeColor(), marginTop: '10px' }}>{mensaje}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductoDetallado;