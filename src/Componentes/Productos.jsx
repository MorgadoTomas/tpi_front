import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            categoriasSeleccionadas: [],
            ordenPrecio: '',
            categorias: [
                'teclado', 'mouse', 'auricular', 'monitor', 'microfono', 'placadevideo', 'motherboard',
                'ram', 'microprocesador', 'discos', 'sillas', 'gabinetes', 'fuentes', 'joysticks',
                'webcams', 'pad', 'parlante',
            ],
        };
    }

    componentDidMount() {
        this.cargarProductos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.categoriasSeleccionadas !== this.state.categoriasSeleccionadas ||
            prevState.ordenPrecio !== this.state.ordenPrecio
        ) {
            this.cargarProductos();
        }
    }

    cargarProductos() {
        const { categoriasSeleccionadas, ordenPrecio } = this.state;
        const params = {
            categorias: categoriasSeleccionadas.join(',') || undefined,
            orden: ordenPrecio || undefined,
        };

        axios
        .get('http://localhost:4000/api/home', { params })
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

    manejarCambioOrden(e) {
        this.setState({ ordenPrecio: e.target.value });
    }

    render() {
        const { productos, categorias, categoriasSeleccionadas, ordenPrecio } = this.state;

        return (
            <div className="container my-4">
                <h1 className="text-center mb-4">Productos</h1>

                <div className="row">
                    <div className="col-md-3">
                        <div className="card mb-3">
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

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ordenar por Precio</h5>
                                <select
                                    className="form-control"
                                    value={ordenPrecio}
                                    onChange={(e) => this.manejarCambioOrden(e)}
                                >
                                    <option value="">Sin orden</option>
                                    <option value="asc">Mayor a menor</option>
                                    <option value="desc">Menor a mayor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            {productos.map((producto) => (
                                <div className="col-md-3 mb-4" key={producto.id}>
                                    <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                                        <div className="card h-100">
                                            {producto.imagenes && (
                                                <img
                                                    src={`http://localhost:4000/public/images/${producto.imagenes.split(',')[0]}`}
                                                    className="card-img-top"
                                                    alt={producto.nombre}
                                                />
                                            )}
                                            <div className="card-body">
                                                <h5 className="card-title">{producto.nombre}</h5>
                                                {producto.precio && (
                                                    <p className="card-text">
                                                        <strong>Precio:</strong> ${producto.precio}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
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