import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../App";

export default function SignInPage({ setToken }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const body = {
      email: email,
      password: password
  };
    axios.post(`${apiUrl}/login`, body)
      .then((res) => {
        localStorage.setItem("token", res);
        setToken(localStorage.getItem("token"));
        console.log("Successful login");
        navigate("/home");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setLoading(false);
      });
    }


  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} data-test="email"/>
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={(event)=> setPassword(event.target.value) }data-test="sign-in-submit" />
        <button type="submit" data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to='cadastro'>
        Primeira vez? Cadastre-se!
      </Link >
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
