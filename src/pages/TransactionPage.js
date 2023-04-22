import styled from "styled-components"
import { useParams } from 'react-router-dom';
import { useState } from "react";

export default function TransactionsPage() {
  const { tipo } = useParams();

  const [value, setValue] = useState(0);
  const objeto = {
    tipo,
    email: "",
    value: value,
    date: "",
    description:""
  }
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type="text"/>
        <input placeholder="Descrição" type="text" />
        <button>Salvar TRANSAÇÃO</button>
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
