import React from "react";
import { Link } from "react-router-dom";

import { UseAuth } from "../../hooks/auth"; 
import { Container, Header, LogImg, Title, MenuContainer, LinkButton} from "./styles";
import logoImg from "../../assets/logo.svg";
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";

const Aside:React.FC = () => {
  const {signOut} = UseAuth();
  return (
    <Container>
      <Header>
        <LogImg src={logoImg} alt="Logo Minha Carteira" />
        <Title>Minha Carteira</Title>
      </Header>
      <MenuContainer>
        <Link to="/">
          <MdDashboard />
          Dashboard
        </Link>
        <Link to="/list/entry-balance">
          <MdArrowUpward />
          Entradas
        </Link>
        <Link to="/list/exit-balance">
          <MdArrowDownward />
          Saídas
        </Link>
        <LinkButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </LinkButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
