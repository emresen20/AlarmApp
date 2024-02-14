import React from "react";
import {  View, Text, FlatList, TouchableOpacity, Platform, SafeAreaView, Image } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useContext,  } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const Mybuttons=({iconName})=>{
    const { isTurkish } = useContext(ThemeContext);
    let { theme } = useContext(ThemeContext);
    return(
        <View
                style={{
                  width:wp(20),
                  height:hp(10),
                  backgroundColor: theme.ButtonColor,
                  borderRadius: 99999,
                  justifyContent:"center",
                  alignItems:"center",
                  alignSelf:"center",
                  borderWidth:2,
                  borderColor:  "white",
                  marginBottom:hp(2)}}>
                      <Ionicons name={iconName} size={wp(13)} color="white" />
              </View>
    )
}