import React, { Component } from 'react';
import axios from 'axios';

class ProductoDetallado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: null,
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; // Obtenemos el ID desde los parámetros de la URL
    axios
      .get(`http://localhost:4000/api/admin/productos/${id}`)
      .then((response) => {
        this.setState({ producto: response.data.producto });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: 'Error al cargar los detalles del producto.' });
      });
  }

  render() {
    const { producto, error } = this.state;

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!producto) return <p>Cargando detalles del producto...</p>;

    return (
      <div className="min-vh-100 d-flex flex-column">
        <main className="flex-grow container p-4">
          <div className="row">
            {/* Imágenes */}
            <div className="col-md-6">
              {producto.imagenes[0] && (
                <img
                  src={`http://localhost:4000/images/${producto.imagenes[0]}`}
                  alt={producto.nombre}
                  className="w-100 mb-3"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              )}
              <div className="d-flex gap-2 mt-4">
                {producto.imagenes.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4000/images/${img}`}
                    alt={`Producto ${index + 1}`}
                    className="rounded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>

            {/* Detalles */}
            <div className="col-md-6">
              <h1 className="h3 mb-3">{producto.nombre}</h1>
              <p className="display-4 mb-2">${producto.precio}</p>
              <p className="text-muted">{producto.descripcion}</p>
              <ul>
                <li><strong>Marca:</strong> {producto.marca}</li>
                <li><strong>Stock:</strong> {producto.stock}</li>
              </ul>
              <button className="btn btn-dark w-100">Agregar al carrito</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ProductoDetallado;