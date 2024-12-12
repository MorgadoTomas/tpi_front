import React, { Component } from 'react';
import { Button, FormControl, Table, Form } from 'react-bootstrap';
import { Edit2, Trash2, LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevoProducto: {
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        descripcion: '',
        marca: '',
        imagen: null,
      },
      productos: [],
      categorias: [],
      editando: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    axios.post('http://localhost:4000/api/check-admin', {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.isAdmin) {
          this.obtenerProductos();
          this.obtenerCategorias();
        } else {
          alert("No eres un administrador. Acceso denegado.");
          window.location.href = '/';
        }
      })
      .catch(error => {
        console.error('Error al verificar el admin:', error);
        alert("Hubo un error al verificar los permisos.");
      });
  }

  obtenerProductos = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    axios.get('http://localhost:4000/api/admin/productos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      this.setState({ productos: response.data.productos });
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
    });
  };

  obtenerCategorias = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/admin/categorias', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      this.setState({ categorias: response.data.categorias });
    })
    .catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      nuevoProducto: { ...this.state.nuevoProducto, [name]: value }
    });
  };

  handleFileChange = (e) => {
    this.setState({ imagenes: e.target.files });
  };

  agregarProducto = () => {
    const { nuevoProducto, imagenes } = this.state;
    const camposRequeridos = ['nombre', 'categoria', 'precio', 'stock', 'descripcion', 'marca'];
    
    for (let campo of camposRequeridos) {
      if (!nuevoProducto[campo] || nuevoProducto[campo].trim() === '') {
        alert(`Por favor, completa el campo ${campo}`);
        return;
      }
    }

    if (!imagenes || imagenes.length === 0) {
      alert('Por favor, carga al menos una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nuevoProducto.nombre);
    formData.append('stock', nuevoProducto.stock);
    formData.append('precio', nuevoProducto.precio);
    formData.append('descrip', nuevoProducto.descripcion);
    formData.append('marca', nuevoProducto.marca);
    formData.append('categoria', nuevoProducto.categoria);

    Array.from(imagenes).forEach(imagen => {
      formData.append('imagen', imagen);
    });

    const token = localStorage.getItem('token');
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    axios.post('http://localhost:4000/api/admin/productos', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      this.setState({
        nuevoProducto: {
          nombre: '',
          categoria: '',
          precio: '',
          stock: '',
          descripcion: '',
          marca: '',
          imagen: null,
        },
        imagenes: [],
      });
      this.obtenerProductos();
    })
    .catch(error => {
      console.error('Error al agregar producto:', error);
    });
  };

  iniciarEdicion = (producto) => {
    this.setState({
      nuevoProducto: { ...producto },
      editando: true,
      productoEditadoId: producto.id
    });
  };

  eliminarProducto = (productoId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    axios.delete(`http://localhost:4000/api/admin/productos/${productoId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      this.setState((prevState) => ({
        productos: prevState.productos.filter(producto => producto.id !== productoId)
      }));
    })
    .catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  };

  render() {
    return (
      <div className="d-flex min-vh-100 bg-light">
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
  
        <main className="flex-grow-1 container">
          <div className="py-4">
            <h5>{this.state.editando ? "Editar Producto" : "Agregar Nuevo Producto"}</h5>
            <Form className="d-flex flex-column gap-3">
              <FormControl
                type="text"
                placeholder="Nombre del Producto"
                name="nombre"
                value={this.state.nuevoProducto.nombre}
                onChange={this.handleInputChange}
              />
              <Form.Group controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  name="categoria"
                  value={this.state.nuevoProducto.categoria}
                  onChange={this.handleInputChange}
                >
                  <option value="">Selecciona una categoría</option>
                  {this.state.categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <FormControl
                type="number"
                placeholder="Precio"
                name="precio"
                value={this.state.nuevoProducto.precio}
                onChange={this.handleInputChange}
              />
              <FormControl
                type="number"
                placeholder="Stock"
                name="stock"
                value={this.state.nuevoProducto.stock}
                onChange={this.handleInputChange}
              />
              <FormControl
                type="text"
                placeholder="Descripción"
                name="descripcion"
                value={this.state.nuevoProducto.descripcion}
                onChange={this.handleInputChange}
              />
              <FormControl
                type="text"
                placeholder="Marca"
                name="marca"
                value={this.state.nuevoProducto.marca}
                onChange={this.handleInputChange}
              />
              <input
                type="file"
                name="imagen"
                onChange={this.handleFileChange}
                multiple
              />
              <Button
                variant="primary"
                onClick={this.state.editando ? this.editarProducto : this.agregarProducto}
              >
                {this.state.editando ? "Guardar Cambios" : "Agregar Producto"}
              </Button>
            </Form>
          </div>
  
          <div className="py-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <Button variant="warning" onClick={() => this.iniciarEdicion(producto)}>
                        <Edit2 />
                      </Button>
                      <Button variant="danger" onClick={() => this.eliminarProducto(producto.id)}>
                        <Trash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    );
  }
}

export default ProductosAdmin;