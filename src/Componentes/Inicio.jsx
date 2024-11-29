import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Inicio = (props) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  // Obtener el nombre del usuario
  const usuario = localStorage.getItem('usuario');

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/productos'); // Ajusta la URL si es necesario
      setProductos(response.data.productos);
    } catch (err) {
      setError('Error al obtener los productos');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Bienvenido, {usuario}</h1>
      <h2 className="my-4">Productos</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <Link to={`/producto/${producto.id}`} className="text-decoration-none">
              <div className="card">
                <img
                  src={`http://localhost:4000/images/${producto.imagenes?.[0] || 'default.jpg'}`}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion.slice(0, 100)}...</p>
                  <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;