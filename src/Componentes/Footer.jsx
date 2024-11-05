// components/Footer.jsx
import React, { Component } from 'react';
import { Truck, CreditCard, Lock } from "lucide-react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-light py-3 mt-4">
        <div className="container d-flex justify-content-center gap-5 text-muted">
          <div className="d-flex align-items-center">
            <Truck className="mr-2" />
            <span>ENVIAMOS TU COMPRA</span>
          </div>
          <div className="d-flex align-items-center">
            <CreditCard className="mr-2" />
            <span>PAGA COMO QUIERAS</span>
          </div>
          <div className="d-flex align-items-center">
            <Lock className="mr-2" />
            <span>COMPRA CON SEGURIDAD</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
