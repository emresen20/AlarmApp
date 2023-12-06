
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Switch, Text, View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const SettingsScreen= ({navigation})=>{

    const [isDark, setIsDark] = useState(false);
    let { setIsDarkTheme } = useContext(ThemeContext);
    let { theme } = useContext(ThemeContext);

    const toggleSwitch = () => {
        setIsDarkTheme(!isDark);

        setIsDark(!isDark);
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
                    color: "white"}}>
                        Settings
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
                    Dark Theme
                </Text>

                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDark}/>

            </View>
        </SafeAreaView>
    )
}