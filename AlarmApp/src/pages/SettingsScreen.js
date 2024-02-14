
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, Button, Modal, Pressable, Switch, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { WebView } from 'react-native-webview';

export const SettingsScreen = ({ navigation }) => {

    const [isDark, setIsDark] = useState(false);
    let { setIsDarkTheme } = useContext(ThemeContext);
    let { theme } = useContext(ThemeContext);
    const { isTurkish, setIsTurkish } = useContext(ThemeContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { choosenvoice, setChoosenvoice } = useContext(ThemeContext);

    // for open voice (i used youtube)
    const MYWebview = () => {
        const videoUrl = 'https://www.youtube.com/watch?v=iAgtj6iCMpI&list=PLo12LO2_NWJVJIXCrVolCfTexjusJvQBi&ab_channel=MixEdit';

        return (
            <View style={{ flex: 8 }}>
                <WebView source={{ uri: videoUrl }} />
            </View>
        );
    };
    // for change the theme
    const toggleSwitch = () => {
        setIsDarkTheme(!isDark);

        setIsDark(!isDark);
    };
   // for change the language
    const toggleLanguage = () => {
       
        setIsTurkish((prev) => !prev);
    };
    return (
        <SafeAreaView
            style={{
                backgroundColor: theme.mainColor,
                flex: 1,
                justifyContent: "center",


            }}>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.mainColor,
                    alignSelf:"center"
                }}>
                <Text
                    style={{
                        fontSize: hp("3%"),
                        color: theme.HeaderColor,
                        fontFamily:"Signika-Regular",
                        fontSize:wp(6)
                    }}>
                    {isTurkish ? "Ayarlar" : "Settings"}
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
                    borderRadius:hp(2)

                }}>

                <Text style={{ 
                    color: theme.Textcolor, 
                    fontFamily:"Signika-Regular",
                    fontSize:wp(6)
                    }}>
                    {isTurkish ? "Koyu Tema" : "Dark Thema"}
                </Text>

                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDark} />

            </View>
            <View style={{
                justifyContent: "space-evenly",
                flexDirection: "row"
            }}>

                <TouchableOpacity onPress={toggleLanguage}>
                    <Text style={{
                        color: theme.HeaderColor,
                        fontFamily:"Signika-Regular",
                        fontSize:wp(6) 
                        }}>
                        {isTurkish ? "Türkçe" : "English"}
                        </Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true)  // open modal
                }}>
                <View
                    style={{
                        width: wp(30),
                        height: hp(4),
                        backgroundColor: theme.AlarmViewColor,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        margin: hp(2),
                        borderRadius:hp(2)
                    }}>
                    <Text
                        style={{
                            color: theme.Textcolor,
                            fontFamily:"Signika-Regular",
                            fontSize:wp(4)
                        }}>
                        {isTurkish ? "Ses Seç" : "Choose a Voice"}
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal

                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed');
                    setModalVisible(!modalVisible)
                }}>
                <View style={{
                    width: "80%",
                    height: "80%",
                    backgroundColor: theme.AlarmViewColor,
                    justifyContent: "center",
                    margin: hp(5),
                    position: "relative"
                }}>
                    <MYWebview />
                    
                    <View   // for choose a voice
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                        <TouchableOpacity onPress={()=>{setChoosenvoice("sound1")}}>
                            <View style={{ padding: wp(6), backgroundColor: "gray" }}>
                                <Text
                                    style={
                                        {
                                            color:
                                                "white",
                                            fontFamily:"Signika-Regular"
                                        }}>
                                    ARTHUR
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setChoosenvoice("sound2")}}>
                            <View style=
                                {{
                                    padding: wp(6),
                                    backgroundColor: "gray"
                                }}>
                                <Text style={{ color: "white",fontFamily:"Signika-Regular" }} >
                                    RONALDO
                                </Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setChoosenvoice("sound")}}>
                            <View style={{
                                padding: wp(6),
                                backgroundColor: "gray"
                            }}>
                                <Text
                                    style={{ color: "white",fontFamily:"Signika-Regular" }}>
                                    RAMİZ</Text>
                            </View>
                        </TouchableOpacity>





                    </View>

                    <TouchableOpacity
                        style={{
                            height: hp(3),
                            width: wp(3),
                            backgroundColor: "white",
                            position: "absolute",
                            top: 0,
                            right: 0

                        }}
                        onPress={() => {
                            setModalVisible(false)
                        }}>
                        <View
                            style={{
                                height: hp(4),
                                width: wp(4),
                                
                                position: "absolute",
                                top: 0,
                                right: 0,
                                alignItems:"center",
                                backgroundColor:"black"
                                

                            }}>
                            <Text style={{
                                color:"#F0F757",
                                fontSize: wp(6), 
                                fontWeight:"bold"}}>X</Text>

                        </View>
                    </TouchableOpacity>


                </View>

            </Modal>

        </SafeAreaView>
    )
}