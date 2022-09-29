import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const UsuarioContext = createContext({})

export default function UsuarioContextProvider({ children }) {

    const navigation = useNavigation()
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    function signIn(usuario) {
        setUser({
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            numeroCelular: usuario.numeroCelular,
            email: usuario.email,
            senha: usuario.senha,
            status: 'ativo',
        })
        setIsLoggedIn(true)
    }
    function signOut() {
        setUser({})
        setIsLoggedIn(false)
    }

    return (
        <UsuarioContext.Provider value={{ user, isLoggedIn, signIn, signOut }}>
            {children}
        </UsuarioContext.Provider>)
}
