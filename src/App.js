import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios"

/*const usuariosLocal = [
  {
    id: 1,
    name: "Muri"
  },
  {
    id: 2,
    name: "Paulinha"
  },
  {
    id: 3,
    name: "Marcelo"
  },
  {
    id: 4,
    name: "Rodrigo"
  },
]*/

//1°parte do exercicio - pegando os dados do usuário e renderizando na tela
function App() {
  const [usuarios, setUsuarios] = useState([])

  const PegarTodosOsUsuarios = () => {

    const headers = {
      headers: {
        Authorization: "rafael-machado-barbosa"
      }
    }

    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
    
    axios.get(url,headers)
      .then((resposta) => {
        setUsuarios(resposta.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }
  useEffect(() => {
    PegarTodosOsUsuarios()
  }, [])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario  PegarTodosOsUsuarios={PegarTodosOsUsuarios()}/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} id={usuario.id} />
      })}
    </>
  )
}

export default App;
