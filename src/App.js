import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import { useState } from "react";
import UserContext from "./components/Context/UserContext";
import TokenContext from "./components/Context/TokenContext";

const apiUrl = process.env.REACT_APP_API_URL;

export default function App() {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState({});
  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <TokenContext.Provider value={{ token, setToken }}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/nova-transacao/:tipo"
              element={<TransactionsPage />}
            />
            </Routes>
            </TokenContext.Provider>
        </UserContext.Provider>
        
      </BrowserRouter>
    </PagesContainer>
  );
}
export { apiUrl };
const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
