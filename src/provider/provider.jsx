//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from "react";

//IMPORTAÇÃO DOS CONTEXTOS
import { GlobalContext } from "./context";

export const GlobalProvider = ({ children }) => {

    //RESGATA O VALOR DO LOCALSTORAGE
    const userLS = localStorage.getItem('userSafeRun')

    //UTILIZAÇÃO DO HOOK useState
    const [user, setUser] = useState(
        {
            id: userLS !== null ? JSON.parse(userLS).id : 0,
            name: userLS !== null ? JSON.parse(userLS).name : "MA",
            email: userLS !== null ? JSON.parse(userLS).email : "allanmenezes880@gmail.com",
            history: userLS !== null ? JSON.parse(userLS).history : [
                { data: '9/10/2024', name: 'Caneca Porcelana', img: 'undefined', price: 19.90, quantity: 2, estampa: '', },
                { data: '24/08/2024', name: 'Caneca Mágica', img: 'undefined', price: 24.75, quantity: 4, estampa: '', }
            ],
            client_type: userLS !== null ? JSON.parse(userLS).client_type : 'client',
            logged: userLS !== null ? JSON.parse(userLS).logged : false,
            img: userLS !== null ? JSON.parse(userLS).img : undefined,
        }
    );
    const [cart, setCart] = useState(userLS !== null ? JSON.parse(userLS).cart : []);
    const [theme, setTheme] = useState(localStorage.getItem('themeSaferun') !== null ? localStorage.getItem('themeSaferun') : 'light')
    const [loading, setLoading] = useState(false);
    const [updateUserModal, setUpdateUserModal] = useState(false);
    

    //FUNÇAO RESPONSÁVEL PRO MUDAR A VARIÁVEL DE ESTADO E SALVAR NO localStorage
    function toggleTheme(tema) {
        //VERIFICA SE O ESTADO DA VARIAVEL FOI PASSADO
        if(tema){
            //MUDA O ESTADO DA VARIÁVEL
            setTheme(tema)
            
            //SALVA NO localStorage
            localStorage.setItem('themeSaferun', tema)
        }else{
            if(theme == 'light'){
                //MUDA O ESTADO DA VARIÁVEL
                setTheme('dark')
                
                //SALVA NO localStorage
                localStorage.setItem('themeSaferun', 'dark')
            }else{
                //MUDA O ESTADO DA VARIÁVEL
                setTheme('light')
                
                //SALVA NO localStorage
                localStorage.setItem('themeSaferun', 'light')
            }
        }
    }

    //FUNÇÃO RESPONSÁVEL POR MUDAR O ESTADO DE updateUserModal
    function toggleUpdateUserModal() {
        setUpdateUserModal(!updateUserModal)
    }
    
    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    function toggleUser(id, name, email, history, cart, client_type, cpf, img, logged) {
        //SALVA OS DADOS DO USUÁRIO NO localStorage
        localStorage.setItem('userSafeRun', JSON.stringify({ id: id, name: name, email: email, history: history, cart: cart, client_type: client_type, logged: logged, img: img, cpf: cpf }))
        
        //SALVA OS DADOS NO FRONTEND DA APLICAÇÃO
        setUser({ id: id, name: name, email: email, history: history, client_type: client_type, logged: logged, img: img, cpf: cpf })

        //PEGA O CARRINHO DO USUÁRIO
        setCart(cart)
    }

    //FUNÇÃO RESPONSÁVEL POR COLOCAR O MODAL NA TELA
    function toggleLogoutUser() {
        //SALVA OS DADOS DO USUÁRIO NO localStorage
        localStorage.removeItem('userculturalPassport')
        
        //SALVA OS DADOS NO FRONTEND DA APLICAÇÃO
        setUser({ id: 0, name: "MA", email: "allanmenezes880@gmail.com", client_type: "client", img: undefined, logged: false, history: [
            { data: '9/10/2024', name: 'Caneca Porcelana', img: 'undefined', price: 19.90, quantity: 2, estampa: '', },
            { data: '24/08/2024', name: 'Caneca Mágica', img: 'undefined', price: 24.75, quantity: 4, estampa: '', },
        ] })

        setCart([])
    }

    //FUNÇÃO RESPONSÁVEL POR ADICIONAR NOVO ITEM NO CARRINHO
    function addToCart(newItem) {
        //RETORNA true SE O ITEM ESTIVR NO CARRINHO E false SE NÃO ESTIVER
        const existingItem = cart.find((item) => item.id === newItem.id);

        //VERIFICA SE O ITEM JA ESTÁ NO CARRINHO OU NÃO
        if (existingItem) {
            //ADICIONA MAIS NA QUANTIDADE DO PRODUTO
            setCart(
                cart.map((item) =>
                    item.id === newItem.id
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
                )
            );
        }else {
            //COLOCA O ITEM NO CARRINHO MAIS NA QUANTIDADE DO PRODUTO
            setCart([...cart, { ...newItem, quantity: newItem.quantity }]);

            //SALVA OS DADOS DO USUÁRIO NO localStorage
            localStorage.setItem('userculturalPassport', JSON.stringify({ id: user.id, name: user.name, email: user.email, history: user.history, cart: [...cart, { ...newItem, quantity: newItem.quantity }], logged: true }))
        }
    }

    //FUNÇÃO RESPONSÁVEL POR MUDAR O ESTADO DE CARREGAMENTO DA PÁGINA
    function toggleLoading(state) {
        setLoading(state)
    }

    return (
        <GlobalContext.Provider value={{ theme, toggleTheme, user, toggleUser, toggleLogoutUser, cart, addToCart, loading, toggleLoading, updateUserModal, toggleUpdateUserModal }}>
            {children}
        </GlobalContext.Provider>
    );
};
