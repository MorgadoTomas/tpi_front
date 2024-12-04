import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="text-center">
              <Nav.Link as={Link} to="/" className="mx-3" style={{ fontSize: '1.25rem', color: 'white' }}>Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos" className="mx-3" style={{ fontSize: '1.25rem', color: 'white' }}>Productos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

export default NavBar;