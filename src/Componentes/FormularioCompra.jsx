import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormularioCompra = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { carrito, totalCompra } = state || {};

  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState(''); // Puede ser "tarjeta", "paypal", etc.

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombre || !direccion || !metodoPago) {
      alert('Por favor, llena todos los campos');
      return;
    }

    const compra = {
      id_usuario: 1,  // Asegúrate de enviar el ID del usuario correcto
      productos: carrito,
      totalCompra,
    };

    // Verificar el objeto antes de enviarlo
    console.log('Datos de la compra:', compra);

    // Enviar la compra al backend usando Axios
    axios
      .post('http://localhost:8080/api/compras/crear', compra, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Compra registrada:', response);
        navigate('/compra-confirmada');
      })
      .catch((error) => {
        console.error('Error al procesar la compra:', error);
        alert('Hubo un error al procesar tu compra.');
      });
  };

  return (
    <div className="container my-5">
      <h2>Formulario de Compra</h2>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre completo
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección de envío
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="metodoPago" className="form-label">
            Método de pago
          </label>
          <select
            id="metodoPago"
            className="form-control"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="efectivo">Efectivo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Realizar compra
        </button>
      </form>

      <div className="mt-4">
        <h4>Resumen de la compra</h4>
        <p>Total: ${totalCompra.toFixed(2)}</p>
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} x {producto.cantidad} = ${(
                parseFloat(producto.precio) * producto.cantidad
              ).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormularioCompra;
