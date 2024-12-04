import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
    };
  }

  componentDidMount() {
    // Verifica si el usuario está logueado y si es admin
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';  // 'true' o 'false' en formato string
    if (token) {
      this.setState({ isLoggedIn: true, isAdmin });
    }
  }

  cerrarSesion = () => {
    // Eliminar datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('isAdmin');
    this.setState({ isLoggedIn: false, isAdmin: false });
  };

  render() {
    const { isLoggedIn, isAdmin } = this.state;

    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="text-center">
              <Nav.Link as={Link} to="/" className="mx-3" style={{ fontSize: '1.25rem', color: 'white' }}>Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos" className="mx-3" style={{ fontSize: '1.25rem', color: 'white' }}>Productos</Nav.Link>

              {/* Si es admin, muestra el enlace al panel de admin */}
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline-light" className="mx-3">Admin Panel</Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
