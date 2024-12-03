import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      error: null,
      usuario: '', // Agregar el estado para el nombre del usuario
    };
  }

  componentDidMount() {
    // Obtener el nombre del usuario desde localStorage si está logueado
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.setState({ usuario });
    }
    this.fetchProductos();
  }

  fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/productos'); // Ajusta la URL si es necesario
      this.setState({ productos: response.data.productos });
    } catch (err) {
      this.setState({ error: 'Error al obtener los productos' });
      console.error(err);
    }
  };

  render() {
    const { productos, error, usuario } = this.state;

    return (
      <div className="container">
        <h2 className="my-4">Productos</h2>
        {usuario && <h3>Bienvenido, {usuario}!</h3>} {/* Mostrar el nombre del usuario si está logueado */}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                <div className="card">
                  <img
                    src={`http://localhost:4000/images/${producto.imagenes?.[0] || 'default.jpg'}`}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion.slice(0, 100)}...</p>
                    <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Inicio;