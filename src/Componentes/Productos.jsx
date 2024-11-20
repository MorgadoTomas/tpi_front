import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

class Productos extends Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchProductos();
  }

  fetchProductos() {
    axios
      .get('http://localhost:8080/api/admin/productos')
      .then((response) => {
        this.setState({ productos: response.data.productos });
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        this.setState({ error: 'No se pudieron cargar los productos.' });
      });
  }

  render() {
    const { productos, error } = this.state;

    return (
      <div className="min-vh-100 d-flex flex-column">
        {/* Main Content */}
        <main className="flex-grow container d-flex p-4">
          {/* Sidebar */}
          <aside className="w-25 mr-1">
            <h2 className="h1 font-weight-bold mb-4 text-center">CATEGORIAS</h2>
            <div className="mb-4">
              <h3 className="font-weight-semibold mb-2">Periféricos</h3>
              <div className="mb-2">
                <input type="checkbox" id="teclados" />
                <label htmlFor="teclados" className="ml-2">Teclados</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="mouse" />
                <label htmlFor="mouse" className="ml-2">Mouse</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="monitores" />
                <label htmlFor="monitores" className="ml-2">Monitores</label>
              </div>
            </div>

            <div>
              <h3 className="font-weight-semibold mb-2">Componentes</h3>
              <div className="mb-2">
                <input type="checkbox" id="procesadores" />
                <label htmlFor="procesadores" className="ml-2">Procesadores</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="motherboards" />
                <label htmlFor="motherboards" className="ml-2">Motherboards</label>
              </div>
              <div className="mb-2">
                <input type="checkbox" id="memoria-ram" />
                <label htmlFor="memoria-ram" className="ml-2">Memoria RAM</label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-grow ">
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <div key={producto.id} className=" col-md-30 mb-10">
                    <div className="border bg-warning rounded-lg shadow-sm p-3 h-200">
                      {/* Product Image */}
                      {producto.imagenes?.length > 0 ? (
                        <img
                          src={`http://localhost:8080/images/${producto.imagenes[0]}`}
                          alt={producto.nombre}
                          className="w-100 mb-3"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center bg-secondary"
                          style={{ height: '150px', color: 'white' }}
                        >
                          Sin imagen
                        </div>
                      )}
                      {/* Product Details */}
                      <h4 className="font-weight-bold mb-2">{producto.nombre}</h4>
                      <p className="text-muted mb-1">{producto.marca}</p>
                      <p className="font-weight-bold mb-3">${producto.precio}</p>
                      <Link to={`/producto/${producto.id}`} className="btn btn-primary w-200">
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Productos;
