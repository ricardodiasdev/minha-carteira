import React, { useMemo, useState } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toogle";
import emojis from "../../utils/emojis";

import { UseTheme } from "../../hooks/theme";

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = UseTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />
      <Profile>
        <Welcome>Olá, {emoji} </Welcome>
        <UserName>Ricardo Dias Barbosa</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
