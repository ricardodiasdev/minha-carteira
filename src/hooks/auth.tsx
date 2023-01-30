import React, {createContext, useState, useContext} from 'react'
import { Link } from "react-router-dom";

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

type AuthProps = {
    children: React.ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider= (props: AuthProps) => {

    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged')

        return !!isLogged

    })

    const signIn = (email: string, password: string) => {
        if(email === 'ricardo@email.com' && password === '123'){
            localStorage.setItem('@minha-carteira:logged', 'true')
            setLogged(true)
        } else {
            alert('Senha ou usuário inválidos!')
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged')
        setLogged(false)
        window.location.href = "/"
        
    }
    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
          {props.children}
        </AuthContext.Provider>
    )
}

function UseAuth():IAuthContext {
    const context = useContext(AuthContext)
    return context
}

export {AuthProvider, UseAuth}
