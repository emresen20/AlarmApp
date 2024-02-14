import { Text, View } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useState } from "react";
export const Header=()=>{
    const { isTurkish, setIsTurkish } = useContext(ThemeContext);
    const { choosenvoice } = useContext(ThemeContext);
    let { theme } = useContext(ThemeContext);
    return(
        <View 
            style={{
                width:wp(100),
                height:hp(5),
                margin:hp(1),
                marginLeft:hp(2),
                marginTop:hp(2)

            }}>
                <Text 
                    style={{
                            color:theme.HeaderColor,
                            fontSize:hp(3),
                            fontFamily:"Signika-Regular"}}>
                    {isTurkish ? "Alarmlar" : "Alarms"}
                </Text>
        </View>
    )
}