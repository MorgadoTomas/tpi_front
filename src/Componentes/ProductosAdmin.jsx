// ProductosAdmin.jsx
import React, { Component } from 'react';
import { Button, FormControl, Table, Form } from 'react-bootstrap';
import { Edit2, Trash2, LayoutDashboard, Package, Users, ShoppingCart, BarChart, Settings } from "lucide-react";

class ProductosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        { id: 1, nombre: "Bizo", talle: "M", color: "Negro", codigo: "999999", cantidad: 99 }
      ],
      nuevoProducto: { nombre: '', talle: '', color: '', codigo: '', cantidad: '' },
      editando: false,
      productoEditadoId: null,
    };
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

  agregarProducto = () => {
    if (this.state.editando) {
      // Actualizar el producto existente
      this.setState((prevState) => ({
        productos: prevState.productos.map((producto) =>
          producto.id === prevState.productoEditadoId
            ? { ...producto, ...prevState.nuevoProducto }
            : producto
        ),
        nuevoProducto: { nombre: '', talle: '', color: '', codigo: '', cantidad: '' },
        editando: false,
        productoEditadoId: null
      }));
    } else {
      // Agregar un nuevo producto
      this.setState((prevState) => ({
        productos: [
          ...prevState.productos,
          { id: Date.now(), ...prevState.nuevoProducto }
        ],
        nuevoProducto: { nombre: '', talle: '', color: '', codigo: '', cantidad: '' }
      }));
    }
  }

  iniciarEdicion = (producto) => {
    this.setState({
      nuevoProducto: { ...producto },
      editando: true,
      productoEditadoId: producto.id
    });
  }

  eliminarProducto = (productoId) => {
    this.setState((prevState) => ({
      productos: prevState.productos.filter((producto) => producto.id !== productoId)
    }));
  }

  render() {
    return (
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="mr-4" style={{ width: '250px' }}>
          <nav className="d-flex flex-column">
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <LayoutDashboard className="mr-2" />
              Panel de control
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Package className="mr-2" />
              Productos
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Users className="mr-2" />
              Usuarios
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <ShoppingCart className="mr-2" />
              Ventas
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <BarChart className="mr-2" />
              Análisis y Reportes
            </Button>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Settings className="mr-2" />
              Configuración
            </Button>
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
                placeholder="Talle"
                name="talle"
                value={this.state.nuevoProducto.talle}
                onChange={this.handleInputChange}
                style={{ maxWidth: '100px' }}
              />
              <FormControl
                placeholder="Color"
                name="color"
                value={this.state.nuevoProducto.color}
                onChange={this.handleInputChange}
                style={{ maxWidth: '100px' }}
              />
              <FormControl
                placeholder="C. de producto"
                name="codigo"
                value={this.state.nuevoProducto.codigo}
                onChange={this.handleInputChange}
                style={{ maxWidth: '150px' }}
              />
              <FormControl
                placeholder="Cantidad"
                name="cantidad"
                value={this.state.nuevoProducto.cantidad}
                onChange={this.handleInputChange}
                style={{ maxWidth: '100px' }}
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
                  <th>Talle</th>
                  <th>Color</th>
                  <th>C. de producto</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.talle}</td>
                    <td>{producto.color}</td>
                    <td>{producto.codigo}</td>
                    <td>{producto.cantidad}</td>
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