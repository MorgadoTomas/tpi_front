import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inicio = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Hacer la solicitud GET al backend
        axios.get('http://localhost:8080/api/productos')
        .then(response => {
                // Guardar los productos obtenidos en el estado
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los productos:', error);
            });
    }, []); // Se ejecuta una vez al montar el componente

    return (
        <div>
            <h1>Productos Disponibles</h1>
            <div className="productos">
                {productos.length > 0 ? (
                    productos.map(producto => (
                        <div key={producto.id} className="producto">
                            <h3>{producto.nombre}</h3>
                            <p>Stock: {producto.stock}</p>
                            <p>Precio: ${producto.precio}</p>
                            <p>Descripción: {producto.descripcion}</p>
                            <p>Marca: {producto.marca}</p>
                            {/* Aquí puedes agregar imágenes u otros detalles */}
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Inicio;
