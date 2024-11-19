import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/productos');
      console.log(response.data); // Verifica la estructura de la respuesta
      setProductos(response.data.productos); // Asegúrate de que la propiedad 'productos' existe
    } catch (err) {
      setError('Error al obtener los productos');
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Productos Disponibles</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              key={producto.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <h2>{producto.nombre}</h2>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Stock:</strong> {producto.stock}</p>
              <p><strong>Marca:</strong> {producto.marca}</p>
              <p>{producto.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Inicio;