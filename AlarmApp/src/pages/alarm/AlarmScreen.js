import { View, Text, FlatList, TouchableOpacity, Platform, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useContext, } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';
import Swipeable from 'react-native-swipeable';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeContext } from '../../context/ThemeContext';
import { formatTime } from '../../helper/HelperFunctions';
import { Mybuttons } from '../../helper/mybuttons';
import Chossenvoiceimage from '../../helper/Choosenvoiceimage';
import { Header } from '../../helper/header';
export const AlarmScreen = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [notificationIds, setNotificationIds] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  let { theme } = useContext(ThemeContext);
  const { isTurkish } = useContext(ThemeContext);
  const { choosenvoice } = useContext(ThemeContext);  // voice coming from settings
  const keyproducts = (item) => item.toString()  // for product id
  useEffect(() => {
    return () => {
      // Cleanup: Remove notifications when the component unmounts
      cancelAllNotifications();


    };
  }, []);
  // choosing time
  const handleTimeChange = (event, time) => {
    if (Platform.OS === 'android' && event.type === 'set') {
      setSelectedTime(time);
    } else if (Platform.OS === 'ios') {
      setSelectedTime(time);
    }

  };
  // for add a alarm
  const addAlarm = async () => {
    if (selectedTime) {
      // Seçilen zamanın şu anki zamandan önce olup olmadığını kontrol et
      const suan = new Date();
      if (selectedTime.getTime() <= suan.getTime()) {
        // Eğer geçmişte ise, alarmı bir sonraki güne ayarla
        const yarin = new Date(suan);
        yarin.setDate(suan.getDate() + 1);
        yarin.setHours(selectedTime.getHours());
        yarin.setMinutes(selectedTime.getMinutes());
        yarin.setSeconds(0);
        setSelectedTime(yarin);
      }

      const channelId = await notifee.createChannel({
        id: choosenvoice,
        name: 'Varsayılan Kanal',
        sound: 'ronaldo',
        importance: AndroidImportance.HIGH,
      });

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: selectedTime.getTime(),
        alarmManager: {
          allowWhileIdle: true,
        },
      };

      const notification = {
        title: 'Alarm',
        body: 'Kal Yeğen Alarm Çalıyor Uyan Yeğen sabah oldu',
        android: {
          channelId,
        },
      };

      const id = await notifee.createTriggerNotification(notification, trigger);

      setAlarms([...alarms, selectedTime]);
      setNotificationIds([...notificationIds, id]);

      setSelectedTime(new Date());
    }
  };





  // remove alarm
  const removeAlarm = async (index) => {
    const newAlarms = [...alarms];
    const newNotificationIds = [...notificationIds];

    const removedAlarm = newAlarms.splice(index, 1)[0];
    const removedNotificationId = newNotificationIds.splice(index, 1)[0];

    setAlarms(newAlarms);
    setNotificationIds(newNotificationIds);

    // Cancel the removed notification
    await cancelNotification(removedNotificationId);
  };
  // cancel the notification
  const cancelNotification = async (notificationId) => {
    await notifee.cancelNotification(notificationId);
  };
  // cancel all notificition
  const cancelAllNotifications = async () => {
    await notifee.cancelAllNotifications();
  };

  // };
  // for flatlist
  const renderItem = ({ item, index }) => (
    console.log(choosenvoice),
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      margin: hp(1)

    }}>
      <View>
        <View style={{
          width: wp(80),
          height: hp(18),
          backgroundColor: theme.AlarmViewColor,
          margin: 3,
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 15,
          flexDirection: "row"


        }}>
          <View style={{ borderRadius: 15 }}>
            <Chossenvoiceimage Choosenvoice={choosenvoice} />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: theme.Textcolor,
              lineHeight: 24,
              fontFamily:"Signika-Regular",
              
            }}>
              {isTurkish ? "Çalacak Yeğen" : "Will Ring Nephew"} 
            </Text>
          <Text style={{
            color: theme.Textcolor,
            fontSize: hp("3%"),
            textAlign: "center",
            fontFamily:"Signika-Regular"
          }}>
            {formatTime(item)}
          </Text>
        </View>

      </View>

    </View>

  );
  //for swipeable
  const renderSwipeableItem = ({ item, index }) => {
    const rightButtons = [
      <TouchableOpacity
        onPress={() => removeAlarm(index)}
        style={{
          flex: 1,
          borderRadius: 13,
          backgroundColor: theme.SwipableColor,

          justifyContent: 'center',
          alignItems: 'flex-start',
          width: wp(15),
          height: hp(1)

        }}>
        <Text
          style={{
            color: 'white',
            alignSelf: "center",
            fontFamily:"Signika-Regular"
          }}>
          {isTurkish ? "Sil" : "Remove"}
        </Text>
      </TouchableOpacity>,
    ];

    return (

      <Swipeable rightButtons={rightButtons}>
        {renderItem({ item, index })}
      </Swipeable>
    );
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.mainColor

      }}>


      {showTimePicker && (
        <DateTimePicker
          style={{ backgroundColor: "red" }}
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, time) => {
            setShowTimePicker(false);
            handleTimeChange(event, time);
          }}
        />
      )}
      <Header />
      <FlatList
        data={alarms}
        renderItem={renderSwipeableItem}
        keyExtractor={keyproducts}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Mybuttons iconName={"add-outline"}  />

        </TouchableOpacity>
        <TouchableOpacity onPress={addAlarm} disabled={!selectedTime}>
          <Mybuttons iconName={"checkmark-outline"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


