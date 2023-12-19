
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, Button, Modal, Pressable, Switch, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { WebView } from 'react-native-webview';

export const SettingsScreen = ({ navigation }) => {

    const [isDark, setIsDark] = useState(false);
    let { setIsDarkTheme } = useContext(ThemeContext);
    let { theme } = useContext(ThemeContext);
    const { isTurkish, setIsTurkish } = useContext(ThemeContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { choosenvoice, setChoosenvoice } = useContext(ThemeContext);

    
    const MYWebview = () => {
    const videoUrl = 'https://www.youtube.com/watch?v=JAlnpmae-1c&list=PL1Jp848vxKc24eu0h8ahLm7ffIvekrCyD&ab_channel=trndby';

    return (
        <View style={{ flex:8}}>
            <WebView source={{ uri: videoUrl }} />
        </View>
    );
    };

    const toggleSwitch = () => {
        setIsDarkTheme(!isDark);

        setIsDark(!isDark);
    };

    const toggleLanguage = () => {
        // Türkçe butonuna tıklanırsa Türkçe yap
        // İngilizce butonuna tıklanırsa İngilizce yap
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
                    marginLeft: hp("19%")
                }}>
                <Text
                    style={{
                        fontSize: hp("3%"),
                        color: theme.AlarmViewColor,
                        fontWeight: "bold"
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

                }}>

                <Text style={{ color: "white" }}>
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
                    <Text style={{ color: theme.AlarmViewColor }}>{isTurkish ? "Türkçe" : "English"}</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true)
                }}>
                <View
                    style={{
                        width: wp(30),
                        height: hp(4),
                        backgroundColor: theme.AlarmViewColor,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        margin: hp(2)
                    }}>
                    <Text
                        style={{
                            color: "white"
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
                    backgroundColor: "red",
                    justifyContent: "center",
                    margin: hp(5),
                    position: "relative"
                }}>
                    <MYWebview/>

                    <View 
                            style={{
                                flex:1,
                                flexDirection:"row",
                                justifyContent:"space-between"
                            }}>
                        
                            <Button onPress={() => { setChoosenvoice("sound")} } title="Ramiz"/>
                            <Button onPress={() => { setChoosenvoice("sound2")}} title="Ronaldo"/>
                            <Button onPress={() => { setChoosenvoice("sound1")}} title="Arthur"/>

                            
                            
                        
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
                        onPress={() =>{
                           setModalVisible(false)
                        }}>
                        <View
                            style={{
                                height: hp(3),
                                width: wp(3),
                                backgroundColor: "white",
                                position: "absolute",
                                top: 0,
                                right: 0

                            }}>
                            <Text>X</Text>

                        </View>
                    </TouchableOpacity>


                </View>

            </Modal>

        </SafeAreaView>
    )
}