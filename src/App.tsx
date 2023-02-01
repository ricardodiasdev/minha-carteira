import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider} from "styled-components";
import Routes from "./routes";

import { UseTheme } from "./hooks/theme";

const App: React.FC = () => {
  const { theme } = UseTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
