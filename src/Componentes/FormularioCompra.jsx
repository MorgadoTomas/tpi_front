import React, { useState } from 'react';
import axios from 'axios';

const FormularioCompra = () => {
    const [idUsuario, setIdUsuario] = useState('');
    const [idMetodoPago, setIdMetodoPago] = useState('');
    const [direccion, setDireccion] = useState('');
    const [total, setTotal] = useState('');
    const [compraId, setCompraId] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que todos los campos estén completos
        if (!idUsuario || !idMetodoPago || !direccion || !total) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            // Enviar la solicitud POST al backend
            const response = await axios.post('http://localhost:8080/api/admin/carrito', {
                id_usuario: idUsuario,
                id_met_de_pago: idMetodoPago,
                direccion: direccion,
                total: total,
            });

            // Guardar el ID de la compra recién creada
            setCompraId(response.data.compraId);
            setError('');
            alert(`Compra creada con éxito. ID de la compra: ${response.data.compraId}`);
        } catch (error) {
            console.error('Error al crear la compra:', error);
            setError('Hubo un error al crear la compra.');
        }
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
                    <label htmlFor="idMetodoPago">ID de Método de Pago:</label>
                    <input
                        type="number"
                        id="idMetodoPago"
                        value={idMetodoPago}
                        onChange={(e) => setIdMetodoPago(e.target.value)}
                    />
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
                        onChange={(e) => setTotal(e.target.value)}
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
