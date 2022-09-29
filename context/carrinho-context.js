import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { inventario, carrinho } from "../data/data";

export const CarrinhoContext = createContext({})


export default function CarrinhoContextProvider({ children }) {

    const [listaInventario] = useState(inventario);
    const [listaCarrinho, setListaCarrinho] = useState(carrinho);


    function addItemAoCarrinho(produtoAtual) {
        var index = listaInventario
            .map((x) => {
                return x.id;
            })
            .indexOf(produtoAtual.id);

        listaCarrinho.splice(produtoAtual.id - 1, 0, listaInventario[index]);
        listaInventario.splice(index, 1);
    }

    function excluirItemAoCarrinho(id) {
        var index = listaCarrinho
            .map((x) => {
                return x.id;
            })
            .indexOf(id);
        console.log("Lista Carrinho ANTES=====>>>>>", listaCarrinho)
        listaInventario.splice(id - 1, 0, listaCarrinho[index]);
        listaCarrinho.splice(index, 1); //o splice limpa o item da lista (carrinho), então é essencial pro funcionamento
        console.log("Lista Carrinho DEPOIS=====>>>>>", listaCarrinho)

    }

    function limparItemsDoCarrinho() {
        listaCarrinho.forEach((itemDoCarrinho) => {  // cada item que está no carrinho, passamos para inventário
            var index = listaCarrinho
                .map((x) => {
                    return x.id;
                })
                .indexOf(itemDoCarrinho.id);
            listaInventario.splice(itemDoCarrinho.id - 1, 0, listaCarrinho[index]);
        });
        const filterData2 = listaCarrinho.splice(0, listaCarrinho.length); //limpa o carrinho
        // setListaCarrinho({ listaCarrinho: filterData2 }); //seta o carrinho
        setListaCarrinho([]); //seta o carrinho

    }


    return (
        <CarrinhoContext.Provider value={{ listaInventario, listaCarrinho, addItemAoCarrinho, excluirItemAoCarrinho, limparItemsDoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>)
}
