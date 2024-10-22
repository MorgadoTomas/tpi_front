import { Component } from "react";
export default class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="formulario_registro">
                <h3>   Nombre:  <input type="text" /></h3>
                <h3> Apellido:  <input type="text" /></h3>
                <h3>   Email:  <input type="text" /></h3>
                <h3>   Usuario:  <input type="text" /></h3>
                <h3>  Contraseña:  <input type="text" /></h3>
                <button>Registrar</button> <br />
                <a href="">Iniciar sesion</a>
            </div>
        )
    }

}