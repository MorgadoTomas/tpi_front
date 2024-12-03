import React, { Component } from 'react';
import { Button, FormControl, Table, Form } from 'react-bootstrap';
import { Trash2, LayoutDashboard, Package, Users, ShoppingCart, BarChart, Settings } from "lucide-react";
import { withRouter } from 'react-router-dom';

class UsuariosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [
        { id: 1, nombre: "Juan Perez", email: "juanperez@example.com" },
        { id: 2, nombre: "Maria Garcia", email: "mariagarcia@example.com" },
        { id: 3, nombre: "Carlos Lopez", email: "carloslopez@example.com" },
        { id: 4, nombre: "Ana Martinez", email: "anamartinez@example.com" }
      ],
      filtro: ''
    };
  }

  handleFilterChange = (event) => {
    this.setState({ filtro: event.target.value });
  };

  eliminarUsuario = (usuarioId) => {
    this.setState((prevState) => ({
      usuarios: prevState.usuarios.filter((usuario) => usuario.id !== usuarioId)
    }));
  };

  navigate = (path) => {
    this.props.history.push(path);
  };

  render() {
    const { usuarios, filtro } = this.state;
    const usuariosFiltrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="mr-4" style={{ width: '250px' }}>
          <nav className="d-flex flex-column">
            <Button
              variant="light"
              className="text-left mb-2 d-flex align-items-center"
              onClick={() => this.navigate('/admin')} // Redirige a Admin
            >
              <LayoutDashboard className="mr-2" />
              Panel de control
            </Button>
            <Button
              variant="light"
              className="text-left mb-2 d-flex align-items-center"
              onClick={() => this.navigate('/admin/productos')} // Redirige a ProductosAdmin
            >
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
          {/* Filtro de usuarios */}
          <div className="py-4">
            <h5>Administrar Usuarios</h5>
            <Form className="d-flex gap-3">
              <FormControl
                placeholder="Filtrar por nombre"
                value={filtro}
                onChange={this.handleFilterChange}
                style={{ maxWidth: '200px' }}
              />
            </Form>
          </div>

          {/* Users Table */}
          <div className="py-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="light"
                          className="p-1"
                          onClick={() => this.eliminarUsuario(usuario.id)}
                        >
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

export default withRouter(UsuariosAdmin);