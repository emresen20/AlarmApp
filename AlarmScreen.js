import { View, Text, FlatList, TouchableOpacity, Platform, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useContext,  } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';
import Swipeable from 'react-native-swipeable';
import PropTypes from 'prop-types';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ThemeContext } from './ThemeContext';


export const AlarmScreen= ({navigation})=>{
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [alarms, setAlarms] = useState([]);
    const [notificationIds, setNotificationIds] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    let { theme } = useContext(ThemeContext);
    const { isTurkish } = useContext(ThemeContext);
    const {choosenvoice} = useContext(ThemeContext);  // voice coming from settings
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
          const channelId = await notifee.createChannel({
            id: choosenvoice,  // id name is importan for use chosen sound
            name: 'Default Channel ',
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
            body: 'Kal Yiğen Alarm Çalıyor Uyan Yiğen sabah oldu',
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
      // format time
      const formatTime = (time) => {
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(time);
      };
      // for flatlist
      const renderItem = ({ item, index }) => (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: hp("0.5%"),
          backgroundColor: theme.AlarmViewColor,
          padding: hp("1.75%"),
          borderRadius: 13
        }}>
          <Text style={{ 
            flex: 1, 
            color: "black", 
            fontSize: hp("3%"),
            marginLeft: hp("2%")
             }}>
            {formatTime(item)}
          </Text>
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
              backgroundColor: 'red', 
              
              justifyContent: 'center', 
              alignItems: 'flex-start',
              width: wp("20%"), 
              
            }}>
            <Text style={{ color: 'white' }}>{isTurkish ? "Sil" : "Remove"}</Text>
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
            backgroundColor:theme.mainColor
  
          }}>

    
          {showTimePicker && (
            <DateTimePicker
              style={{backgroundColor:"red"}}
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
    
          <FlatList 
              data={alarms} 
              renderItem={renderSwipeableItem} 
              keyExtractor={keyproducts}
              ListHeaderComponent={         //for making header on the flatlist
             <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                 
                  
                }}>
                <Image
                  style={{
                    width: wp("65%"),
                    height: hp("35%"),
                    borderRadius: 15,
    
                  }}
                  source={require("./src/assets/images/uyandıran.png")} />
              </View>} />
    
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <View
                style={{
                  padding: wp("5%"),
                  backgroundColor: theme.ButtonColor,
                  borderRadius: 13
                }}>
                <Text
                  style={{ color: "white" }}>
                  {isTurkish? "Saat Seç": "Choose Time"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={addAlarm} disabled={!selectedTime}>
              <View
                style={{
                  padding: wp("5%"),
                  backgroundColor: theme.ButtonColor,
                  borderRadius: 13
                }}>
                <Text
                  style={{
                    color: "white"
                  }}>
                   {isTurkish? "Alarm Ekle":"Add Alarm"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    

