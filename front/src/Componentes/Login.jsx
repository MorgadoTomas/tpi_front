import { Component } from "react";
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>

                <h3>   Usuario:  <input type="text" /></h3>
                <h3>  Contraseña:  <input type="text" /></h3>
                <button>Iniciar sesion</button> <br />
                <a href="">Registrarse</a> <br />
                <a href="">Olvide mi contraseña</a>


            </div>
        )
    }

}