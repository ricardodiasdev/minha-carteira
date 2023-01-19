import React from 'react'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import Layout from './components/Layout'
import dark from './styles/themes/dark'
import light from './styles/themes/light'

const App = () => {
  return (
    <ThemeProvider theme={dark}>
        <GlobalStyles/>
        <Layout/>
    </ThemeProvider>
  )
}

export default App