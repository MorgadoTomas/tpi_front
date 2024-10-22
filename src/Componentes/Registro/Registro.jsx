import { Component } from "react";
export default class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
            contrasena: ""
        }
    }
    registrar() {

    }
    render() {
        return (
            <div className="formulario_registro">
                <h3>   Nombre:  <input type="text"
                    value={this.state.nombre}
                    onChange={(e) => this.setState({ nombre: e.target.value })} />
                </h3>
                <h3> Apellido:  <input type="text"
                    value={this.state.nombre}
                    onChange={(e) => this.setState({ nombre: e.target.value })} />
                </h3>
                <h3>   Email:  <input type="text"
                    value={this.state.nombre}
                    onChange={(e) => this.setState({ nombre: e.target.value })} />
                </h3>
                <h3>   Usuario:  <input type="text"
                    value={this.state.nombre}
                    onChange={(e) => this.setState({ nombre: e.target.value })} />
                </h3>
                <h3>  Contraseña:  <input type="text"
                    value={this.state.nombre}
                    onChange={(e) => this.setState({ nombre: e.target.value })} />
                </h3>
                <button>Registrar</button> <br />
                <a href="">Iniciar sesion</a>
            </div>
        )
    }

}