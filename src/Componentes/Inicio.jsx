// Inicio.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Inicio = ({ searchTerm }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/admin/productos')
      .then((response) => {
        setProductos(response.data.productos);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  // Filtrar los productos según el término de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="my-4">Productos</h1>
      <div className="row">
        {productosFiltrados.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <Link to={`/producto/${producto.id}`} className="text-decoration-none">
              <div className="card">
                <img
                  src={`http://localhost:8080/images/${producto.imagenes ? producto.imagenes[0] : 'default.jpg'}`}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion.slice(0, 100)}...</p>
                  <p className="card-text"><strong>Precio: $</strong> {producto.precio}</p>
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
