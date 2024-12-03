import React, { Component } from 'react';
import axios from 'axios';

class FormularioCompra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: '',
            idMetodoPago: '',
            direccion: '',
            total: '',
            compraId: null,
            carrito: [],
            error: '',
        };
    }

    componentDidMount() {
        // Obtener el carrito desde sessionStorage
        const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];
        const totalCompra = carritoGuardado
            .reduce((acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad, 0)
            .toFixed(2);

        this.setState({ carrito: carritoGuardado, total: totalCompra });
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    handleMetodoPagoChange = (e) => {
        this.setState({ idMetodoPago: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { idUsuario, idMetodoPago, direccion, total, carrito } = this.state;

        // Verificar que todos los campos estén completos
        if (!idUsuario || !idMetodoPago || !direccion || !total) {
            this.setState({ error: 'Por favor, complete todos los campos.' });
            return;
        }

        try {
            // Registrar la compra
            const compraResponse = await axios.post('http://localhost:8080/api/admin/carrito', {
                id_usuario: idUsuario,
                id_met_de_pago: idMetodoPago,
                direccion,
                total,
            });

            const compraIdGenerada = compraResponse.data.compraId;
            this.setState({ compraId: compraIdGenerada });

            // Registrar los detalles de la compra (productos del carrito)
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

            // Actualizar el stock de cada producto
            const stockPromises = carrito.map((producto) => {
                const { id, cantidad } = producto;

                return axios.put('http://localhost:8080/api/admin/carrito', {
                    stock: cantidad,
                    id,
                });
            });

            await Promise.all(stockPromises);

            // Vaciar el carrito
            sessionStorage.removeItem('carrito'); // Eliminar el carrito del almacenamiento
            this.setState({ carrito: [], error: '' }); // Actualizar el estado local

            alert(`Compra registrada con éxito. ID de la compra: ${compraIdGenerada}`);
        } catch (err) {
            console.error('Error al procesar la compra:', err);
            this.setState({ error: 'Hubo un error al registrar la compra.' });
        }
    };

    render() {
        const { idUsuario, idMetodoPago, direccion, total, compraId, error } = this.state;

        return (
            <div>
                <h2>Formulario de Compra</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="idUsuario">ID de Usuario:</label>
                        <input
                            type="number"
                            id="idUsuario"
                            value={idUsuario}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Método de Pago:</label>
                        <div>
                            <input
                                type="radio"
                                id="metodo1"
                                name="metodoPago"
                                value="1"
                                onChange={this.handleMetodoPagoChange}
                            />
                            <label htmlFor="metodo1">Método de Pago 1</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="metodo2"
                                name="metodoPago"
                                value="2"
                                onChange={this.handleMetodoPagoChange}
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
                            onChange={this.handleChange}
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
    }
}

export default FormularioCompra;
