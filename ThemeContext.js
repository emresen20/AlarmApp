import {createContext, useState} from "react";
import { darkTheme,lightTheme } from "./Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const ThemeContext = createContext();

export const ThemeContextProvider = ( props ) => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const theme = isDarkTheme ? darkTheme : lightTheme;

    return(
        <ThemeContext.Provider
            value={{
                isDarkTheme,setIsDarkTheme, theme
            }}>

            { props.children }

        </ThemeContext.Provider>
    )
}