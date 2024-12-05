import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioCompra = () => {
  const [carrito, setCarrito] = useState([]);
  const [idMetodoPago, setIdMetodoPago] = useState('');
  const [direccion, setDireccion] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nombreTitular, setNombreTitular] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');

  // Obtener el carrito desde sessionStorage
  useEffect(() => {
    const carritoData = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setCarrito(carritoData);

    const carritoNormalizado = carritoData.map((producto) => ({
      ...producto,
      cantidad: producto.cantidad < 1 || isNaN(producto.cantidad) ? 1 : producto.cantidad,
    }));

    const totalCompra = carritoNormalizado
      .reduce((acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad, 0)
      .toFixed(2);

    setTotal(totalCompra);
    sessionStorage.setItem('carrito', JSON.stringify(carritoNormalizado));
  }, []);

  const handleMetodoPagoChange = (e) => {
    setIdMetodoPago(e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'direccion') setDireccion(value);
    if (id === 'nombreTitular') setNombreTitular(value);
    if (id === 'numeroTarjeta') setNumeroTarjeta(value);
    if (id === 'fechaExpiracion') setFechaExpiracion(value);
    if (id === 'codigoSeguridad') setCodigoSeguridad(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!idMetodoPago || !direccion || !total) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (idMetodoPago === '2' && (!nombreTitular || !numeroTarjeta || !fechaExpiracion || !codigoSeguridad)) {
      setError('Por favor, complete todos los campos de la tarjeta.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Obtener idUsuario desde localStorage
      const idUsuario = localStorage.getItem('userId');
      if (!idUsuario) {
        setError('Debe iniciar sesión para realizar una compra.');
        return;
      }

      const compraResponse = await axios.post('http://localhost:8080/api/admin/carrito', {
        id_usuario: idUsuario,
        id_met_de_pago: idMetodoPago,
        direccion,
        total,
      });

      const compraIdGenerada = compraResponse.data.compraId;

      const detallePromises = carrito.map((producto) => {
        const { id, cantidad, precio } = producto;
        return axios.post('http://localhost:8080/api/admin/carrito/detalle', {
          id_compra: compraIdGenerada,
          id_producto: id,
          cantidad,
          precio_u: precio,
        });
      });

      await Promise.all(detallePromises);

      const stockPromises = carrito.map((producto) => {
        const { id, cantidad } = producto;
        return axios.put('http://localhost:8080/api/admin/carrito', {
          stock: cantidad,
          id,
        });
      });

      await Promise.all(stockPromises);

      sessionStorage.removeItem('carrito');
      setCarrito([]);

      alert(`Compra registrada con éxito. ID de la compra: ${compraIdGenerada}`);
    } catch (err) {
      console.error('Error al procesar la compra:', err);
      setError('Hubo un error al registrar la compra.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Formulario de Compra</h2>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Método de Pago:</label>
          <div className="form-check">
            <input
              type="radio"
              id="metodo1"
              name="metodoPago"
              value="1"
              className="form-check-input"
              onChange={handleMetodoPagoChange}
            />
            <label htmlFor="metodo1" className="form-check-label">Método de Pago 1</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="metodo2"
              name="metodoPago"
              value="2"
              className="form-check-input"
              onChange={handleMetodoPagoChange}
            />
            <label htmlFor="metodo2" className="form-check-label">Método de Pago 2</label>
          </div>
        </div>

        {idMetodoPago === '2' && (
          <div>
            <div className="mb-3">
              <label htmlFor="nombreTitular" className="form-label">Nombre del Titular:</label>
              <input
                type="text"
                id="nombreTitular"
                className="form-control"
                value={nombreTitular}
                onChange={handleChange}
                placeholder="Ingrese el nombre del titular"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroTarjeta" className="form-label">Número de Tarjeta:</label>
              <input
                type="text"
                id="numeroTarjeta"
                className="form-control"
                value={numeroTarjeta}
                onChange={handleChange}
                placeholder="Ingrese el número de tarjeta"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaExpiracion" className="form-label">Fecha de Expiración:</label>
              <input
                type="month"
                id="fechaExpiracion"
                className="form-control"
                value={fechaExpiracion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="codigoSeguridad" className="form-label">Código de Seguridad:</label>
              <input
                type="text"
                id="codigoSeguridad"
                className="form-control"
                value={codigoSeguridad}
                onChange={handleChange}
                placeholder="Ingrese el código de seguridad"
              />
            </div>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input
            type="text"
            id="direccion"
            className="form-control"
            value={direccion}
            onChange={handleChange}
            placeholder="Ingrese su dirección"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="total" className="form-label">Total:</label>
          <input
            type="number"
            id="total"
            className="form-control"
            value={total}
            readOnly
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : 'Finalizar Compra'}
        </button>
      </form>
    </div>
  );
};

export default FormularioCompra;