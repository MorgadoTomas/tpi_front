import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [nombreFiltro, setNombreFiltro] = useState('');

    const categorias = [
        'teclado', 'mouse', 'auricular', 'monitor', 'microfono', 'placadevideo', 'motherboard',
        'ram', 'microprocesador', 'discos', 'sillas', 'gabinetes', 'fuentes', 'joysticks',
        'webcams', 'pad', 'parlante'
    ];

    const cargarProductos = async () => {
        try {
            const params = {
                nombre: nombreFiltro || undefined,
                categorias: categoriasSeleccionadas.join(',') || undefined,
            };
            const { data } = await axios.get('http://localhost:8080/api/home', { params });
            setProductos(data.productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, [categoriasSeleccionadas, nombreFiltro]);

    const manejarCheckbox = (categoria) => {
        setCategoriasSeleccionadas((prev) =>
            prev.includes(categoria)
                ? prev.filter((c) => c !== categoria)
                : [...prev, categoria]
        );
    };

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
                        onChange={(e) => setNombreFiltro(e.target.value)}
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
                                        onChange={() => manejarCheckbox(categoria)}
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
                                        <p className="card-text">
                                            <strong>Precio:</strong> ${producto.precio}
                                        </p>
                                        <p className="card-text">
                                            <strong>Stock:</strong> {producto.stock}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productos;
