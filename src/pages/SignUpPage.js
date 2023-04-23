import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { apiUrl } from "../App"
import axios from "axios"

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const navigate = useNavigate();

  const objeto = {
    name: nome,
    email: email,
    password: senha,
    repeat_password: confirmaSenha
  }


  function registrar(event) {
    event.preventDefault();
    if (senha !== confirmaSenha) { return alert("As senhas não são iguais.") }
    axios
    .post(`${apiUrl}/cadastro`,objeto)
    .then(() => navigate('/'))
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}

  return (
    <SingUpContainer>
      <form onSubmit={registrar}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" onChange={(event) => setNome(event.target.value)}/>
        <input placeholder="E-mail" type="email" onChange={(event) => setEmail(event.target.value)}/>
        <input placeholder="Senha" type="password" autoComplete="new-password" onChange={(event) => setSenha(event.target.value)}/>
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" onChange={(event) => setConfirmaSenha(event.target.value)}/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
