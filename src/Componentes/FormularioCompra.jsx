import React, { Component } from 'react';
import axios from 'axios';

class FormularioCompra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: '', // El ID de usuario ya no será ingresado manualmente
            idMetodoPago: '',
            direccion: '',
            total: 0,
            compraId: null,
            carrito: [],
            error: '',
            isSubmitting: false,
            nombreTitular: '',
            numeroTarjeta: '',
            fechaExpiracion: '',
            codigoSeguridad: '',
        };
    }

    componentDidMount() {
        // Obtener el idUsuario desde el localStorage (el ID del usuario logueado)
        const idUsuario = localStorage.getItem('userId'); 

        // Si el usuario no está logueado, redirigir o manejar el error
        if (!idUsuario) {
            this.setState({ error: 'Debe iniciar sesión para realizar una compra.' });
            return;
        }

        // Establecer el idUsuario en el estado
        this.setState({ idUsuario });

        const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito')) || [];

        // Normalizar las cantidades de los productos (mínimo 1)
        const carritoNormalizado = carritoGuardado.map((producto) => ({
            ...producto,
            cantidad: producto.cantidad < 1 || isNaN(producto.cantidad) ? 1 : producto.cantidad,
        }));

        // Calcular el total de la misma manera que en CarritoProductos
        const totalCompra = carritoNormalizado
            .reduce((acc, producto) => acc + parseFloat(producto.precio) * producto.cantidad, 0)
            .toFixed(2);

        // Actualizar el carrito en el estado y en sessionStorage
        this.setState({ carrito: carritoNormalizado, total: totalCompra });
        sessionStorage.setItem('carrito', JSON.stringify(carritoNormalizado));
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

        const { idUsuario, idMetodoPago, direccion, total, carrito, isSubmitting } = this.state;

        // Evitar envíos múltiples
        if (isSubmitting) {
            return;
        }

        if (!idUsuario || !idMetodoPago || !direccion || !total) {
            this.setState({ error: 'Por favor, complete todos los campos.' });
            return;
        }

        // Si el método de pago es 2, verificar los datos de la tarjeta
        if (idMetodoPago === '2') {
            const { nombreTitular, numeroTarjeta, fechaExpiracion, codigoSeguridad } = this.state;
            if (!nombreTitular || !numeroTarjeta || !fechaExpiracion || !codigoSeguridad) {
                this.setState({ error: 'Por favor, complete todos los campos de la tarjeta.' });
                return;
            }
        }

        this.setState({ isSubmitting: true, error: '' }); // Desactivar el botón y limpiar errores

        try {
            const compraResponse = await axios.post('http://localhost:4000/api/admin/carrito', {
                id_usuario: idUsuario, // Aquí enviamos el idUsuario
                id_met_de_pago: idMetodoPago,
                direccion,
                total,
            });

            const compraIdGenerada = compraResponse.data.compraId;
            this.setState({ compraId: compraIdGenerada });

            const detallePromises = carrito.map((producto) => {
                const { id, cantidad, precio } = producto;
                return axios.post('http://localhost:4000/api/admin/carrito/detalle', {
                    id_compra: compraIdGenerada,
                    id_producto: id,
                    cantidad,
                    precio_u: precio,
                });
            });

            await Promise.all(detallePromises);

            const stockPromises = carrito.map((producto) => {
                const { id, cantidad } = producto;
                return axios.put('http://localhost:4000/api/admin/carrito', {
                    stock: cantidad,
                    id,
                });
            });

            await Promise.all(stockPromises);

            sessionStorage.removeItem('carrito');
            this.setState({ carrito: [] });

            alert(`Compra registrada con éxito. ID de la compra: ${compraIdGenerada}`);
        } catch (err) {
            console.error('Error al procesar la compra:', err);
            this.setState({ error: 'Hubo un error al registrar la compra.' });
        } finally {
            this.setState({ isSubmitting: false }); // Reactivar el botón solo si hubo un error
        }
    };

    render() {
        const { idMetodoPago, direccion, total, compraId, error, isSubmitting, nombreTitular, numeroTarjeta, fechaExpiracion, codigoSeguridad } = this.state;

        return (
            <div className="container mt-4">
                <h2 className="text-center mb-4">Formulario de Compra</h2>
                <form className="card p-4 shadow" onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Método de Pago:</label>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="metodo1"
                                name="metodoPago"
                                value="1"
                                className="form-check-input"
                                onChange={this.handleMetodoPagoChange}
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
                                onChange={this.handleMetodoPagoChange}
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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="codigoSeguridad" className="form-label">Código de Seguridad:</label>
                                <input
                                    type="text"
                                    id="codigoSeguridad"
                                    className="form-control"
                                    value={codigoSeguridad}
                                    onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
    }
}

export default FormularioCompra;
