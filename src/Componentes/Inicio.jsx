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
    axios
      .get('http://localhost:8080/api/admin/productos')
      .then((response) => {
        this.setState({ productos: response.data.productos });
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }

  render() {
    const { productos } = this.state;
    const { searchTerm } = this.props;

    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="container">
        <h1 className="my-4">Productos</h1>
        <div className="row">
          {productosFiltrados.map((producto) => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                <div className="card">
                  <img
                    src={`http://localhost:8080/images/${producto.imagenes ? producto.imagenes[0] : 'default.jpg'}`}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion.slice(0, 100)}...</p>
                    <p className="card-text"><strong>Precio: $</strong> {producto.precio}</p>
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