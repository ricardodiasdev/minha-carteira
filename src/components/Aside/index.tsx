import React, { useState } from "react";

import { Link } from "react-router-dom";

import { UseAuth } from "../../hooks/auth";

import { UseTheme } from "../../hooks/theme";

import Toggle from "../Toogle";

import {
  Container,
  Header,
  LogImg,
  Title,
  MenuContainer,
  LinkButton,
  ToggleMenu,
  ThemeToggleFooter,
} from "./styles";

import logoImg from "../../assets/logo.svg";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
} from "react-icons/md";

const Aside: React.FC = () => {
 
  const { signOut } = UseAuth();

  const { toggleTheme, theme } = UseTheme();

  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>
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
      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
