import React, { useEffect, useState } from "react";
import { fetchUserLocation } from "@/utils/locationUtils";
import { calculateShabbatTimes } from "@/utils/shabbatCalc";
import { ShabbatTime } from "@/utils/types";
import { formatDate } from "@/utils/dateUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import {
  Button,
  Menu,
  Divider,
  PaperProvider,
  IconButton,
} from "react-native-paper";
import ShabbatDetailsCard from "@/components/ShabbatDetailsCard";
import TitleCard from "@/components/TitleCard";
import AlarmModal from "@/components/AlarmModal";
import EventModal from "@/components/EventModal";
import LanguageModal from "@/components/LanguageModal";
import { Audio } from "expo-av";
import Parasha from "@/components/Parasha";

const SHABBAT_TIMES_KEY = "shabbatTimes";
const SHABBAT_TIMES_EXPIRY = 2; // 2 days

// Import the images using require()
const bricksImage = require("@/assets/images/bricks.jpeg");
const HomeScreen = () => {
  const [shabbatDetails, setShabbatDetails] = useState<ShabbatTime | null>(
    null
  );
  const [activeComponent, setActiveComponent] = useState<
    "Parasha" | "TitleCard"
  >("Parasha");


  useEffect(() => {
    const fetchShabbatTimes = async () => {
      try {
        // Check if shabbat times are already cached in AsyncStorage
        const cachedShabbatTimes = await AsyncStorage.getItem(
          SHABBAT_TIMES_KEY
        );

        if (cachedShabbatTimes) {
          const { data, timestamp } = JSON.parse(cachedShabbatTimes);
          const now = new Date().getTime();
          const expirationTime =
            timestamp + SHABBAT_TIMES_EXPIRY * 24 * 60 * 60 * 1000;
          if (now < expirationTime) {
            // Use cached data if it's not expired
            setShabbatDetails(
              data.find(
                (time: { date: string | number | Date }) =>
                  new Date(time.date) >= new Date()
              )
            );
            return;
          }
        }

        // Fetch location and calculate shabbat times
        const { latitude, longitude, city } = await fetchUserLocation();
        const shabbatTimes = await calculateShabbatTimes(
          latitude,
          longitude,
          city
        );
        const nextShabbat =
          shabbatTimes?.find(
            (time: { date: string | number | Date }) =>
              new Date(time.date) >= new Date()
          ) || null;
        setShabbatDetails(nextShabbat);

        // Cache the shabbat times in AsyncStorage
        await AsyncStorage.setItem(
          SHABBAT_TIMES_KEY,
          JSON.stringify({
            data: shabbatTimes,
            timestamp: new Date().getTime(),
          })
        );
      } catch (error) {
        console.error("Error fetching Shabbat times:", error);
      }
    };

    fetchShabbatTimes();
  }, []);

  useEffect(() => {
    const checkAlarm = async () => {
      const alarm = await AsyncStorage.getItem("shabbatAlarm");
      if (!alarm || !shabbatDetails) return;

      const { time, sound } = JSON.parse(alarm);
      const candleLightingTime = new Date(
        `${shabbatDetails.date} ${shabbatDetails.candle_lighting}`
      );
      const alarmTime = new Date(candleLightingTime.getTime() - time * 60000);

      const now = new Date();
      if (now >= alarmTime && now < new Date(alarmTime.getTime() + 60000)) {
        const { sound: alarmSound } = await Audio.Sound.createAsync(sound);
        await alarmSound.playAsync();
      }
    };

    const interval = setInterval(checkAlarm, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [shabbatDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        {activeComponent === "Parasha" ? (
          <Parasha shabbatDetails={shabbatDetails} />
        ) : (
          <TitleCard />
        )}
        <Button
          icon="arrow-left-right-bold"
          onPress={() =>
            setActiveComponent(
              activeComponent === "Parasha" ? "TitleCard" : "Parasha"
            )
          }
        >
         
        </Button>
      </View>
      <View style={styles.rightColumn}>
        <ShabbatDetailsCard shabbatDetails={shabbatDetails} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
    padding: 16,
    
  },
  rightColumn: {
    flex: 1,
    padding: 16,
  },
  menuButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 4,
  },
});
export default HomeScreen;
