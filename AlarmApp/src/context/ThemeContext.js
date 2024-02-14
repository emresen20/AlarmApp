import React, { createContext, useState, useEffect } from "react";
import { darkTheme, lightTheme } from "../../Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isTurkish, setIsTurkish] = useState(true);
  const [choosenvoice, setChoosenvoice] = useState('sound');

  const theme = isDarkTheme ? darkTheme : lightTheme;

  const toggleLanguage = () => {
    setIsTurkish((prev) => !prev);
  };

  useEffect(() => {
    // Uygulama açıldığında AsyncStorage'den dil bilgisini ve dark theme bilgisini al
    const getStoredSettings = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        const storedDarkTheme = await AsyncStorage.getItem('darkTheme');

        if (storedLanguage !== null) {
          setIsTurkish(storedLanguage === 'turkish');
        }

        if (storedDarkTheme !== null) {
          setIsDarkTheme(storedDarkTheme === 'true');
        }
      } catch (error) {
        console.error('AsyncStorage Error:', error);
      }
    };

    getStoredSettings();
  }, []); // Bu etkileşim sadece bir kere çalışacak şekilde ayarlandı

  // Dil veya tema değiştiğinde AsyncStorage'ye kaydet
  useEffect(() => {
    const storeSettings = async () => {
      try {
        await AsyncStorage.setItem('language', isTurkish ? 'turkish' : 'other');
        await AsyncStorage.setItem('darkTheme', String(isDarkTheme));
      } catch (error) {
        console.error('AsyncStorage Error:', error);
      }
    };

    storeSettings();
  }, [isTurkish, isDarkTheme]); // Dil veya tema değiştiğinde bu etkileşim çalışacak

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
        theme,
        isTurkish,
        setIsTurkish,
        toggleLanguage,
        choosenvoice,
        setChoosenvoice,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
