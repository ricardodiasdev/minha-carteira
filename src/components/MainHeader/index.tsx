import React, { useMemo } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toogle";
import emojis from "../../utils/emojis";

const MainHeader = () => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle />
      <Profile>
        <Welcome>Olá, {emoji} </Welcome>
        <UserName>Ricardo Dias Barbosa</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
