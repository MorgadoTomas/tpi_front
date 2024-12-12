import React, { Component } from 'react';
import axios from 'axios';

class ProductosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      productoSeleccionado: null,
      categorias: [],
      formulario: {
        id: '',
        nombre: '',
        stock: '',
        precio: '',
        descripcion: '',
        marca: '',
        categoria: '',
        imagenes: []
      }
    };
  }

  componentDidMount() {
    axios.get('/api/productos')
      .then(response => this.setState({ productos: response.data.productos }))
      .catch(error => console.error('Error al obtener productos:', error));

    axios.get('/api/categorias')
      .then(response => this.setState({ categorias: response.data.categorias }))
      .catch(error => console.error('Error al obtener categorías:', error));
  }

  manejarCambio = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formulario: {
        ...prevState.formulario,
        [name]: value
      }
    }));
  };

  seleccionarProducto = (producto) => {
    this.setState({
      productoSeleccionado: producto.id,
      formulario: {
        id: producto.id,
        nombre: producto.nombre,
        stock: producto.stock,
        precio: producto.precio,
        descripcion: producto.descripcion,
        marca: producto.marca,
        categoria: producto.categoria || '',
        imagenes: producto.imagenes || []
      }
    });
  };

  actualizarProducto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { formulario } = this.state;

    formData.append('id', formulario.id);
    formData.append('nuevonombre', formulario.nombre);
    formData.append('stock', formulario.stock);
    formData.append('precio', formulario.precio);
    formData.append('descripcion', formulario.descripcion);
    formData.append('marca', formulario.marca);
    formData.append('categoria', formulario.categoria);

    formulario.imagenes.forEach((imagen, index) => {
      formData.append(`imagen${index}`, imagen);
    });

    axios.put('/api/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        alert('Producto actualizado con éxito');
        this.setState({ productoSeleccionado: null });
        axios.get('/api/productos') // Refrescar lista de productos
          .then(response => this.setState({ productos: response.data.productos }))
          .catch(error => console.error('Error al refrescar productos:', error));
      })
      .catch(error => console.error('Error al actualizar producto:', error));
  };

  render() {
    const { productos, productoSeleccionado, formulario, categorias } = this.state;

    return (
      <div>
        <h1>Gestión de Productos</h1>

        {productoSeleccionado ? (
          <form onSubmit={this.actualizarProducto}>
            <h2>Editar Producto</h2>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={this.manejarCambio}
              placeholder="Nombre"
            />
            <input
              type="number"
              name="stock"
              value={formulario.stock}
              onChange={this.manejarCambio}
              placeholder="Stock"
            />
            <input
              type="number"
              name="precio"
              value={formulario.precio}
              onChange={this.manejarCambio}
              placeholder="Precio"
            />
            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={this.manejarCambio}
              placeholder="Descripción"
            ></textarea>
            <input
              type="text"
              name="marca"
              value={formulario.marca}
              onChange={this.manejarCambio}
              placeholder="Marca"
            />
            <select
              name="categoria"
              value={formulario.categoria}
              onChange={this.manejarCambio}
            >
              <option value="">Seleccionar Categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => this.setState({ productoSeleccionado: null })}>Cancelar</button>
          </form>
        ) : (
          <div>
            {productos.map(producto => (
              <div key={producto.id}>
                <h3>{producto.nombre}</h3>
                <p>Precio: {producto.precio}</p>
                <button onClick={() => this.seleccionarProducto(producto)}>Editar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ProductosAdmin;