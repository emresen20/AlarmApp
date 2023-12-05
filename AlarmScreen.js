import { View, Text, FlatList, TouchableOpacity, Platform, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import Swipeable from 'react-native-swipeable';
import PropTypes from 'prop-types';


export const AlarmScreen= ({navigation})=>{
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [alarms, setAlarms] = useState([]);
    const [notificationIds, setNotificationIds] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        return () => {
          // Cleanup: Remove notifications when the component unmounts
          cancelAllNotifications();
        };
      }, []);

      const handleTimeChange = (event, time) => {
        if (Platform.OS === 'android' && event.type === 'set') {
          setSelectedTime(time);
        } else if (Platform.OS === 'ios') {
          setSelectedTime(time);
        }
      };
      const addAlarm = async () => {
        if (selectedTime) {
          const channelId = await notifee.createChannel({
            id: 'sound',
            name: 'Default Channel',
            sound: 'ramiz',
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

      const cancelNotification = async (notificationId) => {
        await notifee.cancelNotification(notificationId);
      };

      const cancelAllNotifications = async () => {
        await notifee.cancelAllNotifications();
      };
    
      const formatTime = (time) => {
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(time);
      };

      const renderItem = ({ item, index }) => (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          backgroundColor: "orange",
          padding: 15,
          borderRadius: 13
        }}>
          <Text style={{ 
            flex: 1, 
            color: "black", 
            fontSize: 25,
            marginLeft:10
             }}>
            {formatTime(item)}
          </Text>
        </View>
      );
    
      const renderSwipeableItem = ({ item, index }) => {
        const rightButtons = [
          <TouchableOpacity
            onPress={() => removeAlarm(index)} 
            style={{
              flex: 1,
              borderRadius: 13,
              backgroundColor: 'red', 
              padding: 10, 
              justifyContent: 'center', 
              alignItems: 'flex-start',
              width: 100, // veya istediğiniz genişlik
            }}>
            <Text style={{ color: 'white' }}>Sil</Text>
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
            backgroundColor:"black"
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 3
            }}>
            <Image
              style={{
                width: 250,
                height: 250,
                borderRadius: 15
              }}
              source={require("./src/assets/images/uyandıran.png")} />
          </View>
    
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
    
          <FlatList data={alarms} renderItem={renderSwipeableItem} keyExtractor={(item) => item.toString()} />
    
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <View
                style={{
                  padding: 15,
                  backgroundColor: "orange",
                  borderRadius: 13
                }}>
                <Text
                  style={{ color: "white" }}>
                  Saat Seç
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={addAlarm} disabled={!selectedTime}>
              <View
                style={{
                  padding: 15,
                  backgroundColor: "orange",
                  borderRadius: 13
                }}>
                <Text
                  style={{
                    color: "white"
                  }}>
                  Alarm Ekle
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    

