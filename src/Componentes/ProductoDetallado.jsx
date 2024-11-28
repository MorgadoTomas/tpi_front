import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductoDetallado = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/productos/${id}`)
      .then((response) => {
        setProducto(response.data.producto);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar los detalles del producto.');
      });
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!producto) return <p>Cargando detalles del producto...</p>;

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow container p-4">
        <div className="row">
          {/* Imágenes */}
          <div className="col-md-6">
            {producto.imagenes[0] && (
              <img
                src={`http://localhost:8080/images/${producto.imagenes[0]}`}
                alt={producto.nombre}
                className="w-100 mb-3"
                style={{ height: '300px', objectFit: 'cover' }}
              />
            )}
            <div className="d-flex gap-2 mt-4">
              {producto.imagenes.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:8080/images/${img}`}
                  alt={`Producto ${index + 1}`}
                  className="rounded"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          {/* Detalles */}
          <div className="col-md-6">
            <h1 className="h3 mb-3">{producto.nombre}</h1>
            <p className="display-4 mb-2">{producto.precio}</p>
            <p className="text-muted">{producto.descripcion}</p>
            <ul>
              <li><strong>Marca:</strong> {producto.marca}</li>
              <li><strong>Stock:</strong> {producto.stock}</li>
            </ul>
            <button className="btn btn-dark w-100">Agregar al carrito</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductoDetallado;
