
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const SettingsScreen= ({navigation})=>{

    const [isDark, setIsDark] = useState(false);
    let { setIsDarkTheme } = useContext(ThemeContext);
    let { theme } = useContext(ThemeContext);
    const {isTurkish, setIsTurkish} =useContext(ThemeContext);


    const toggleSwitch = () => {
        setIsDarkTheme(!isDark);

        setIsDark(!isDark);
    };

    const toggleLanguage = () => {
        // Türkçe butonuna tıklanırsa Türkçe yap
        // İngilizce butonuna tıklanırsa İngilizce yap
        setIsTurkish((prev) => !prev);
      };
    return(
        <SafeAreaView
                     style={{
                        backgroundColor:theme.mainColor,
                        flex:1,
                        justifyContent:"center",
                       

        }}>
            <View 
                    style={{
                            position:"absolute",
                            top:0,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:theme.mainColor,
                            marginLeft:hp("19%")
                            }}>
                <Text 
                style={{
                    fontSize:hp("3%"),
                    color: theme.AlarmViewColor,
                    fontWeight:"bold"}}>
                            {isTurkish? "Ayarlar": "Settings"}
                        </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    width: wp(85),
                    height: hp(5),
                    backgroundColor: theme.AlarmViewColor,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: wp(5),
                    marginBottom: hp(2),
                    
                }}>

                <Text style={{color:"white"}}>
                {isTurkish? "Koyu Tema":"Dark Thema"}
                </Text>

                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDark}/>

            </View>
            <View style={{
                justifyContent:"space-evenly",
                flexDirection:"row"}}>

                    <TouchableOpacity onPress={toggleLanguage}>
                         <Text style={{color:theme.AlarmViewColor}}>{isTurkish ? "Türkçe" : "English"}</Text>
                    </TouchableOpacity>

            </View>
            
        </SafeAreaView>
    )
}