import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioCompra = () => {
    const [idUsuario, setIdUsuario] = useState('');
    const [idMetodoPago, setIdMetodoPago] = useState('');
    const [direccion, setDireccion] = useState('');
    const [total, setTotal] = useState('');
    const [compraId, setCompraId] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener el carrito desde sessionStorage
        const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];
        setCarrito(carritoGuardado);

        // Calcular el total sumando el precio de los productos
        const totalCompra = carritoGuardado.reduce(
            (acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad,
            0
        ).toFixed(2);

        setTotal(totalCompra); // Establecer el total en el estado
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar que todos los campos estén completos
        if (!idUsuario || !idMetodoPago || !direccion || !total) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Registrar la compra
        axios.post('http://localhost:8080/api/admin/carrito', {
            id_usuario: idUsuario,
            id_met_de_pago: idMetodoPago, // Enviar la ID del método de pago
            direccion: direccion,
            total: total,
        })
        .then((response) => {
            const compraIdGenerada = response.data.compraId; // Guardar el ID de la compra generada
            setCompraId(compraIdGenerada);

            // Registrar los detalles de la compra (productos del carrito)
            const promises = carrito.map((producto) => {
                const { id, cantidad, precio } = producto;

                return axios.post('http://localhost:8080/api/admin/carrito/detalle', {
                    id_compra: compraIdGenerada, // Enviar el ID de la compra
                    id_producto: id,
                    cantidad: cantidad,
                    precio_u: precio,
                });
            });

            // Manejar todas las solicitudes en paralelo
            return Promise.all(promises);
        })
        .then(() => {
            setError('');
            alert(`Compra registrada con éxito. ID de la compra: ${compraId}`);
        })
        .catch((error) => {
            console.error('Error al procesar la compra:', error);
            setError('Hubo un error al registrar la compra.');
        });
    };

    return (
        <div>
            <h2>Formulario de Compra</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idUsuario">ID de Usuario:</label>
                    <input
                        type="number"
                        id="idUsuario"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                    />
                </div>
                <div>
                    <label>Metodo de Pago:</label>
                    <div>
                        <input
                            type="radio"
                            id="metodo1"
                            name="metodoPago"
                            value="1" // ID del primer método de pago
                            onChange={(e) => setIdMetodoPago(e.target.value)}
                        />
                        <label htmlFor="metodo1">Método de Pago 1</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="metodo2"
                            name="metodoPago"
                            value="2" // ID del segundo método de pago
                            onChange={(e) => setIdMetodoPago(e.target.value)}
                        />
                        <label htmlFor="metodo2">Método de Pago 2</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="direccion">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="total">Total:</label>
                    <input
                        type="number"
                        id="total"
                        value={total}
                        readOnly // El campo es solo lectura
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Crear Compra</button>
            </form>

            {compraId && (
                <div>
                    <p>Compra creada con éxito. ID de la compra: {compraId}</p>
                </div>
            )}
        </div>
    );
};

export default FormularioCompra;
