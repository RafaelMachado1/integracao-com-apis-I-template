import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  // 2° parte do exercício - Criando função que recebe um parâmetro e retorna o
  // email do usuário
  const pegarUsuariopeloId = () => {
    const headers = {
      headers: {
        Authorization: "rafael-machado-barbosa"
      }
    }
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`
    axios.get(url, headers)
      .then((resposta) => {
        setEmail(resposta.data.email)
        setNome(resposta.data.name)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  // Exercício de fixação 1 (não consegui renderizar a alteração sem atualizar a tela)
  const editarUsuario = (id, name, email) => {

    const headers = {
      headers: {
        Authorization: "rafael-machado-barbosa"
      }
    }

    const body = {
      name,
      email
    }

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
    axios
      .put(url, body, headers)
      .then((resposta) => {
        console.log(resposta)
        alert("usuário atualizado com sucesso")
        setNome("")
        setEmail("")
        setEditar(!editar)
      })
      .catch((erro) => {
        alert(erro)
      })
      props.pegarTodosOsUsuarios()  // aqui não está funcionando!!!!!
  }

  // Exercício de fixação 2
  const deletarUsuario = (id) => {
    const headers = {
      headers: {
        Authorization: "rafael-machado-barbosa"
      }
    }
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
    axios
      .delete(url, headers)
      .then((resposta) => {
        console.log(resposta)
        alert("usuário deletado com sucesso")
        props.PegarTodosOsUsuarios()
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  useEffect(() => {
    pegarUsuariopeloId()
  }, [])

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => { editarUsuario(usuario.id, nome, email) }}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => { deletarUsuario(usuario.id) }}>Excluir</button>
    </User>
  );
}

export default Usuario;
