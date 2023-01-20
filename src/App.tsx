import React from 'react'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import dark from './styles/themes/dark'


const App = () => {
  return (
    <ThemeProvider theme={dark}>
        <GlobalStyles/>
        <Layout>
          <Dashboard/>
        </Layout>
    </ThemeProvider>
  )
}

export default App