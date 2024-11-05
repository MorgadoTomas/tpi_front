// componentes/Inicio.jsx
import React, { Component } from "react";
import { ShoppingCart, Search, Truck, CreditCard, Lock } from "lucide-react";
import { Button, Form } from "react-bootstrap";


class Inicio extends Component {
  render() {
    return (
      <div className="min-h-screen d-flex flex-column">

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">INICIO</h1>
          <div className="row">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`col-6 col-md-3 d-flex align-items-center justify-content-center my-2`}
              >
                <div
                  className={`border border-gray-300 p-4 rounded-lg shadow-sm flex flex-column items-center bg-white aspect-square ${
                    index === 2 ? 'border border-primary' : ''
                  }`}
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: index === 2 ? '#f0f8ff' : '#fff', // Example color for highlighted box
                  }}
                >
                  {/* Placeholder for product image */}
                  <div style={{ width: "80%", height: "80%", backgroundColor: "#e0e0e0" }}></div>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    );
  }
}

export default Inicio;
