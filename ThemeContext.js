import {createContext, useState} from "react";
import { darkTheme,lightTheme } from "./Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const ThemeContext = createContext();

export const ThemeContextProvider = ( props ) => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isTurkish, setIsTurkish] = useState(true);
    const [choosenvoice, setChoosenvoice] = useState('sound');

    const theme = isDarkTheme ? darkTheme : lightTheme;

    const toggleLanguage = () => {
        setIsTurkish((prev) => !prev);
      };

    return(
        <ThemeContext.Provider
            value={{
                isDarkTheme,setIsDarkTheme, theme,isTurkish,setIsTurkish,toggleLanguage,choosenvoice,setChoosenvoice
            }}>

            { props.children }

        </ThemeContext.Provider>
    )
}