import React, { Component } from 'react';
import axios from 'axios';

class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            categoriasSeleccionadas: [],
            nombreFiltro: '',
            categorias: [
                'teclado', 'mouse', 'auricular', 'monitor', 'microfono', 'placadevideo', 'motherboard',
                'ram', 'microprocesador', 'discos', 'sillas', 'gabinetes', 'fuentes', 'joysticks',
                'webcams', 'pad', 'parlante'
            ]
        };
    }

    componentDidMount() {
        this.cargarProductos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.nombreFiltro !== this.state.nombreFiltro ||
            prevState.categoriasSeleccionadas !== this.state.categoriasSeleccionadas
        ) {
            this.cargarProductos();
        }
    }

    cargarProductos() {
        const { nombreFiltro, categoriasSeleccionadas } = this.state;
        const params = {
            nombre: nombreFiltro || undefined,
            categorias: categoriasSeleccionadas.join(',') || undefined,
        };

        axios
            .get('http://localhost:8080/api/home', { params })
            .then((response) => {
                this.setState({ productos: response.data.productos });
            })
            .catch((error) => {
                console.error('Error al cargar los productos:', error);
            });
    }

    manejarCheckbox(categoria) {
        this.setState((prevState) => {
            const { categoriasSeleccionadas } = prevState;
            if (categoriasSeleccionadas.includes(categoria)) {
                return {
                    categoriasSeleccionadas: categoriasSeleccionadas.filter(
                        (c) => c !== categoria
                    ),
                };
            } else {
                return {
                    categoriasSeleccionadas: [...categoriasSeleccionadas, categoria],
                };
            }
        });
    }

    manejarCambioFiltro(e) {
        this.setState({ nombreFiltro: e.target.value });
    }

    render() {
        const { productos, categorias, categoriasSeleccionadas, nombreFiltro } = this.state;

        return (
            <div className="container my-4">
                <h1 className="text-center mb-4">Productos</h1>

                <div className="row">
                    {/* Filtros */}
                    <div className="col-md-3">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            className="form-control mb-3"
                            value={nombreFiltro}
                            onChange={(e) => this.manejarCambioFiltro(e)}
                        />

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Filtrar por Categorías</h5>
                                {categorias.map((categoria) => (
                                    <div className="form-check" key={categoria}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`checkbox-${categoria}`}
                                            checked={categoriasSeleccionadas.includes(categoria)}
                                            onChange={() => this.manejarCheckbox(categoria)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`checkbox-${categoria}`}
                                        >
                                            {categoria}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Lista de productos */}
                    <div className="col-md-9">
                        <div className="row">
                            {productos.map((producto) => (
                                <div className="col-md-3 mb-4" key={producto.id}>
                                    <div className="card h-100">
                                        {producto.imagenes && (
                                            <img
                                                src={`http://localhost:8080/public/images/${producto.imagenes.split(',')[0]}`}
                                                className="card-img-top"
                                                alt={producto.nombre}
                                            />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>

                                            {/* Marca del producto */}
                                            {producto.marca && (
                                                <p className="card-text">
                                                    <strong>Marca:</strong> {producto.marca}
                                                </p>
                                            )}

                                            {/* Precio del producto */}
                                            {producto.precio && (
                                                <p className="card-text">
                                                    <strong>Precio:</strong> ${producto.precio}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Productos;
