import React, { Component } from 'react';
import { ShoppingCart, Search } from "lucide-react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <header className="bg-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="h2 font-weight-bold text-decoration-none">
            (LOGO)
          </Link>

          <div className="flex-grow-1 mx-4 position-relative">
            <input
              type="search"
              placeholder="Buscar..."
              className="form-control"
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
            />
            <Search className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link to="/carrito" className="text-muted">
              <ShoppingCart />
            </Link>
            <Link to="/login">
              <Button variant="outline-secondary">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
