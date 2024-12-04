import React, { Component } from 'react';
import { Button, FormControl, Table, Form } from 'react-bootstrap';
import { Edit2, Trash2, LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import axios from 'axios'; // Asegúrate de tener axios instalado

class ProductosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      nuevoProducto: { nombre: '', categoria: '', precio: '', stock: '', descripcion: '', marca: '' },
      editando: false,
      productoEditadoId: null,
    };
  }

  componentDidMount() {
    // Suponiendo que el nombre del usuario viene de un token o API
    const usuario = localStorage.getItem('usuario'); // o desde una API que traiga el usuario logueado
    if (usuario) {
      this.setState({ usuario });
    }

    axios
      .get('http://localhost:4000/api/admin/productos')
      .then((response) => {
        this.setState({ productos: response.data.productos });
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      nuevoProducto: {
        ...this.state.nuevoProducto,
        [name]: value
      }
    });
  }

  agregarProducto = async () => {
    const { nuevoProducto, editando, productoEditadoId } = this.state;
    
    try {
      if (editando) {
        // Actualizar el producto existente
        await axios.put(`/api/productos/${productoEditadoId}`, nuevoProducto);
        this.setState((prevState) => ({
          productos: prevState.productos.map((producto) =>
            producto.id === productoEditadoId
              ? { ...producto, ...nuevoProducto }
              : producto
          ),
          nuevoProducto: { nombre: '', categoria: '', precio: '', stock: '', descripcion: '', marca: '' },
          editando: false,
          productoEditadoId: null
        }));
      } else {
        // Agregar un nuevo producto
        const response = await axios.post('/api/productos', nuevoProducto);
        this.setState((prevState) => ({
          productos: [
            ...prevState.productos,
            { id: response.data.producto_id, ...nuevoProducto }
          ],
          nuevoProducto: { nombre: '', categoria: '', precio: '', stock: '', descripcion: '', marca: '' }
        }));
      }
    } catch (error) {
      console.error("Error al agregar/editar producto:", error);
    }
  }

  iniciarEdicion = (producto) => {
    this.setState({
      nuevoProducto: { ...producto },
      editando: true,
      productoEditadoId: producto.id
    });
  }

  eliminarProducto = async (productoId) => {
    try {
      await axios.delete(`/api/productos/${productoId}`);
      this.setState((prevState) => ({
        productos: prevState.productos.filter((producto) => producto.id !== productoId)
      }));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  render() {
    return (
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="mr-4" style={{ width: '250px' }}>
          <nav className="d-flex flex-column">
            <Link to="/admin" className="text-left mb-2 d-flex align-items-center btn btn-light">
              <LayoutDashboard className="mr-2" />
              Panel de control
            </Link>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Package className="mr-2" />
              Productos
            </Button>
            <Link to="/admin/usuarios" className="text-left mb-2 d-flex align-items-center btn btn-light">
              <Users className="mr-2" />
              Usuarios
            </Link>
            <Link to="/admin/ventas" className="text-left mb-2 d-flex align-items-center btn btn-light">
              <ShoppingCart className="mr-2" />
              Ventas
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 container">
          {/* Formulario para agregar o editar producto */}
          <div className="py-4">
            <h5>{this.state.editando ? "Editar Producto" : "Agregar Nuevo Producto"}</h5>
            <Form className="d-flex flex-wrap gap-3">
              <FormControl
                placeholder="Nombre del producto"
                name="nombre"
                value={this.state.nuevoProducto.nombre}
                onChange={this.handleInputChange}
                style={{ maxWidth: '200px' }}
              />
              <FormControl
                placeholder="Categoría"
                name="categoria"
                value={this.state.nuevoProducto.categoria}
                onChange={this.handleInputChange}
                style={{ maxWidth: '150px' }}
              />
              <FormControl
                placeholder="Precio"
                name="precio"
                value={this.state.nuevoProducto.precio}
                onChange={this.handleInputChange}
                style={{ maxWidth: '100px' }}
              />
              <FormControl
                placeholder="Stock"
                name="stock"
                value={this.state.nuevoProducto.stock}
                onChange={this.handleInputChange}
                style={{ maxWidth: '100px' }}
              />
              <FormControl
                placeholder="Descripción"
                name="descripcion"
                value={this.state.nuevoProducto.descripcion}
                onChange={this.handleInputChange}
                style={{ maxWidth: '250px' }}
              />
              <FormControl
                placeholder="Marca"
                name="marca"
                value={this.state.nuevoProducto.marca}
                onChange={this.handleInputChange}
                style={{ maxWidth: '150px' }}
              />
              <Button variant="dark" onClick={this.agregarProducto}>
                {this.state.editando ? "Guardar Cambios" : "Agregar"}
              </Button>
            </Form>
          </div>

          {/* Products Table */}
          <div className="py-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Descripción</th>
                  <th>Marca</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(this.state.productos) && this.state.productos.length > 0 ? (
                this.state.productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.marca}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="light" className="p-1" onClick={() => this.iniciarEdicion(producto)}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="light" className="p-1" onClick={() => this.eliminarProducto(producto.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
            </Table>
          </div>
        </main>
      </div>
    );
  }
}

export default ProductosAdmin;