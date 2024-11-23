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

    // Cargar productos con filtro
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
        <div>
            <h1>Productos</h1>

            {/* Filtros */}
            <div>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={nombreFiltro}
                    onChange={(e) => setNombreFiltro(e.target.value)}
                />

                <div>
                    <h3>Filtrar por Categorías</h3>
                    {categorias.map((categoria) => (
                        <div key={categoria}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={categoriasSeleccionadas.includes(categoria)}
                                    onChange={() => manejarCheckbox(categoria)}
                                />
                                {categoria}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lista de productos */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            width: '200px',
                        }}
                    >
                        <h4>{producto.nombre}</h4>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.stock}</p>
                        {producto.imagenes && (
                            <img
                                src={`http://localhost:8080/public/images/${producto.imagenes.split(',')[0]}`}
                                alt={producto.nombre}
                                style={{ width: '100%' }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;
