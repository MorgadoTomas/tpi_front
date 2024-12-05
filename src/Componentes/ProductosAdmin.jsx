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
      editando: false,
    };
  }

  obtenerProductos = () => {
    axios.get('http://localhost:4000/api/admin/productos')
      .then(response => {
        console.log("Respuesta de la API:", response.data); // Verifica la respuesta aquí
  
        if (Array.isArray(response.data.productos)) { // Accedemos a la propiedad 'productos'
          this.setState({ productos: response.data.productos });
        } else {
          console.error("La respuesta de la API no tiene la propiedad 'productos' como un arreglo.");
        }
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
      });
  };  

  componentDidMount() {
    this.obtenerProductos(); // Cargar los productos cuando el componente se monta
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      nuevoProducto: {
        ...this.state.nuevoProducto,
        [name]: value
      }
    });
  };

  handleFileChange = (e) => {
    this.setState({ imagenes: e.target.files });
  };

  agregarProducto = () => {
    const { nuevoProducto, imagenes } = this.state;
  
    // Validación: Verificar que todos los campos obligatorios estén completos
    const camposRequeridos = ['nombre', 'categoria', 'precio', 'stock', 'descripcion', 'marca'];
    for (let campo of camposRequeridos) {
      if (!nuevoProducto[campo] || nuevoProducto[campo].trim() === '') {
        alert(`Por favor, completa el campo ${campo}`);
        return; // Detener la ejecución si hay campos vacíos
      }
    }
  
    // Validación: Verificar que se haya cargado al menos una imagen
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
  
    axios.post('http://localhost:4000/api/admin/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Producto agregado con éxito:', response);
  
        // Vaciar los campos de input
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
  
  // Función para obtener los productos actualizados
  obtenerProductos = () => {
    axios.get('http://localhost:4000/api/admin/productos')
      .then(response => {
        if (response.data.status === 'ok') {
          this.setState({ productos: response.data.productos });
        }
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }
  

  iniciarEdicion = (producto) => {
    this.setState({
      nuevoProducto: { ...producto },
      editando: true,
      productoEditadoId: producto.id
    });
  };

  eliminarProducto = (productoId) => {
    axios.delete(`http://localhost:4000/api/admin/productos/${productoId}`)
        .then(response => {
            console.log('Producto eliminado con éxito:', response);
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

        <main className="flex-grow-1 container">
          {/* Formulario para agregar o editar producto */}
          <div className="py-4">
            <h5>{this.state.editando ? "Editar Producto" : "Agregar Nuevo Producto"}</h5>
            <Form className="d-flex flex-column gap-3">
              <div className="d-flex flex-wrap gap-3">
                <FormControl
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={this.state.nuevoProducto.nombre || ''}
                  onChange={this.handleInputChange}
                  style={{ maxWidth: '300px' }}
                />
                <Form.Group className="w-100">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    name="categoria"
                    value={this.state.nuevoProducto.categoria || ''}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="1">Teclado</option>
                    <option value="2">Mouse</option>
                    <option value="3">Auricular</option>
                    <option value="4">Monitor</option>
                    <option value="5">Micrófono</option>
                    <option value="6">Placa de video</option>
                    <option value="7">Motherboard</option>
                    <option value="8">RAM</option>
                    <option value="9">Microprocesador</option>
                    <option value="10">Discos</option>
                    <option value="11">Sillas</option>
                    <option value="12">Gabinetes</option>
                    <option value="13">Fuentes</option>
                    <option value="14">Joysticks</option>
                    <option value="15">Webcams</option>
                    <option value="16">Pad</option>
                    <option value="17">Parlante</option>
                  </Form.Control>
                </Form.Group>
                <FormControl
                  placeholder="Precio"
                  name="precio"
                  value={this.state.nuevoProducto.precio || ''}
                  onChange={this.handleInputChange}
                  style={{ maxWidth: '150px' }}
                />
                <FormControl
                  placeholder="Stock"
                  name="stock"
                  value={this.state.nuevoProducto.stock || ''}
                  onChange={this.handleInputChange}
                  style={{ maxWidth: '150px' }}
                />
              </div>

              <div className="d-flex flex-wrap gap-3">
                <FormControl
                  placeholder="Descripción"
                  name="descripcion"
                  value={this.state.nuevoProducto.descripcion || ''}
                  onChange={this.handleInputChange}
                  style={{ maxWidth: '350px' }}
                />
                <FormControl
                  placeholder="Marca"
                  name="marca"
                  value={this.state.nuevoProducto.marca || ''}
                  onChange={this.handleInputChange}
                  style={{ maxWidth: '200px' }}
                />
              </div>

              {/* Campo para seleccionar imagen */}
              <Form.Group>
                <Form.Label>Cargar Imagen</Form.Label>
                <Form.Control
                  type="file"
                  onChange={this.handleFileChange}
                  multiple
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="dark" onClick={this.agregarProducto}>
                  {this.state.editando ? "Guardar Cambios" : "Agregar"}
                </Button>
              </div>
            </Form>
          </div>

          {/* Tabla de productos */}
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
                {this.state.productos.length > 0 ? (
                  this.state.productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.stock}</td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.marca}</td>
                      <td>
                        <div className="d-flex justify-content-around">
                          <Button
                            variant="warning"
                            onClick={() => this.iniciarEdicion(producto)}
                          >
                            <Edit2 />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => this.eliminarProducto(producto.id)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay productos disponibles.</td>
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