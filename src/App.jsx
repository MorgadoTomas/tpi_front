import { Component } from "react";
import Registro from "./Componentes/Registro";
import Login from "./Componentes/Login/Login";
export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  enviarregistro(){
    axios.post
  }
  render(){
    return(
      <div>
        <Registro/>
      </div>
    )
  }
}