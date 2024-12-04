import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioCompra = () => {
  const [carrito, setCarrito] = useState([]);

  // Obtener el carrito desde sessionStorage
  useEffect(() => {
    const carritoData = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setCarrito(carritoData);
  }, []);

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Iterar sobre los productos del carrito
      for (let producto of carrito) {
        const { id, cantidad, precio_u } = producto;

        // Loguear los datos antes de enviarlos
        console.log('Enviando datos al backend:', {
          cantidad: cantidad,
          precio_u: producto.precio,
          id_producto: id,  // Si es necesario para el backend
        });

        // Enviar los datos de cada producto al backend
        await axios.post('http://localhost:8080/api/admin/carrito', {
          cantidad: cantidad,
          precio_u: producto.precio,
          id_producto: id,  // Si es necesario para el backend
        });
      }

      console.log('Compra registrada correctamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - {producto.cantidad} x ${producto.precio}
            </li>
          ))}
        </ul>
        <button type="submit">Finalizar compra</button>
      </form>
    </div>
  );
};

export default FormularioCompra;
