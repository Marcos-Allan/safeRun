//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from "react";

//IMPORTAÇÃO DOS CONTEXTOS
import { GlobalContext } from "./context";

export const GlobalProvider = ({ children }) => {

    //UTILIZAÇÃO DO HOOK useState
    const [theme, setTheme] = useState(localStorage.getItem('themeSaferun') !== null ? localStorage.getItem('themeSaferun') : 'light')

    function toggleTheme(tema) {
        if(tema){
            setTheme(tema)
            localStorage.setItem('themeSaferun', tema)
        }else{
            if(theme == 'light'){
                setTheme('dark')
                localStorage.setItem('themeSaferun', 'dark')
            }else{
                setTheme('light')
                localStorage.setItem('themeSaferun', 'light')
            }
        }
    }

    return (
        <GlobalContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};
