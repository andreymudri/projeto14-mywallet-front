import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { apiUrl } from "../App";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [data, setData] = useState([]);
  const tokenlocal = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!tokenlocal) navigate("/");
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenlocal}`,
      },
    };
    axios
      .get(`${apiUrl}/transacoes`, config)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tokenlocal]);

  const sortedTransactions = data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const fixedTransactions = sortedTransactions.map((t) => {
    return { ...t, value: parseFloat(t.value) };
  });

  const entries = fixedTransactions.filter((t) => t.tipo === "inbound");
  const exits = fixedTransactions.filter((t) => t.tipo === "outbound");

  const balance =
    entries.reduce((acc, t) => acc + parseFloat(t.value), 0) -
    exits.reduce((acc, t) => acc + parseFloat(t.value), 0);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {localStorage.getItem("name")}</h1>
        <BiExit onClick={() => logout()} />
      </Header>

      <TransactionsContainer>
        <ul>
          {sortedTransactions.map((t) => (
            <ListItemContainer key={t.id}>
              <div>
                <span>{t.date}</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={t.tipo}>
                R${" "}
                {t.value.toLocaleString("pt-br", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "inbound" : "outbound"}>
            R${" "}
            {balance.toLocaleString("pt-br", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/inbound")}>
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button onClick={() => navigate("/nova-transacao/outbound")}>
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "inbound" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
