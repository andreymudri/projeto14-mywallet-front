import styled from "styled-components"
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../App";
import dayjs from "dayjs";


export default function TransactionsPage() {
  const { tipo } = useParams();

  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('')
  const email = localStorage.getItem("email");
  const tokenlocal = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!tokenlocal) navigate('/');
  const objetoOp = {
    tipo: tipo,
    email: email,
    value: parseFloat(value),
    description: description,
    date: dayjs().format("DD/MM/YYYY")
  }


  const config = {
    headers: {
      Authorization: `Bearer ${tokenlocal}`,
    },
  };

  function sendOp(event) {
    event.preventDefault();
    axios
    .post(`${apiUrl}/nova-transacao/`,objetoOp, config)
    .then(() => navigate('/home'))
    .catch((err) => {
      console.log(err);
      alert(err);
    });

}

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={sendOp}>
        <input placeholder="Valor" type="text" onChange={(event) => setValue(event.target.value)}/>
        <input placeholder="Descrição" type="text" onChange={(event) => setDescription(event.target.value)}/>
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
