import React, { useState } from "react";
import axios from "axios";

function AddUsuario(props) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // 3° parte do exercício - criando usuário
  const criarUsuario = () => {
    const headers = {
      headers:{
        Authorization: "rafael-machado-barbosa"
      }
    }

    const body = {
      name: nome,
      email: email
    }

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", 
    body, headers)
    .then((resposta)=>{
      console.log(resposta)
      alert("Pessoa adicionada com sucesso")
      setNome("")
      setEmail("")
      props.pegarTodosOsUsuarios() //assim não precisa atualizar a página toda vez que adicionar um usuário
    })
    .catch((erro)=> {
      console.log(erro)
    })
  }

  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={()=> criarUsuario(nome, email)}>Enviar</button>
    </>
  );
}

export default AddUsuario;

