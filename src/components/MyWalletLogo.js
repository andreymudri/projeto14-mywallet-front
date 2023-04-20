import { Link } from "react-router-dom"
import styled from "styled-components"

export default function MyWalletLogo() {
    return (
        <Link to='/'><Text>MyWallet</Text></Link>
    )
}

const Text = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
`

