import React, {useState} from 'react'

import { UseAuth } from '../../hooks/auth'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { 
  Container, 
  Logo, 
  Form, 
  FormTitle } from './styles'

const Signin:React.FC = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {signIn} = UseAuth()

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt='Minha Carteira'/>
        <h2>Minha Carteira</h2>
      </Logo>
      <Form onSubmit={()=> signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>
        <Input 
          type="email" 
          placeholder="Digite seu email" 
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password" 
          placeholder="Digite sua senha" 
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Acessar</Button>
      </Form>
        
    </Container>
  )
}

export default Signin
