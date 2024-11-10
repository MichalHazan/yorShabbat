import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ShabbatTime } from "@/utils/types";
import { toJewishDate, formatJewishDateInHebrew } from 'jewish-date';
interface ShabbatDetailsCardProps {
  shabbatDetails: ShabbatTime | null;
}

const ShabbatDetailsCard = ({ shabbatDetails }: ShabbatDetailsCardProps) => {
  const gregorianDate = new Date(); // Use the current date or pass a custom one
  const jewishDate = toJewishDate(gregorianDate); // Converts the Gregorian date to a Jewish date
  const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate); // Formats the Jewish date in Hebrew
  const today = new Date();
  const todayDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  
  const isShabbatPeriod = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 5 = Friday, 6 = Saturday
    if (dayOfWeek === 5) {
      return true;
    }
    if (dayOfWeek === 6) {
      if (shabbatDetails) {
        // Shabbat ends on Saturday at havdalah time
        const saturdayEnd = new Date(`${shabbatDetails.date}T${shabbatDetails.havdalah}:00`);
        saturdayEnd.setDate(saturdayEnd.getDate() + 1); // Move to Saturday
    
        // Check if current time is between Friday and Saturday Havdalah
        return  now <= saturdayEnd;
      }
    }
    return false;
  };

  const getMessageByDayAndTime = () => {
    const day = new Date().getDay();
    const now = new Date();
    if (shabbatDetails) {
      const candleLightingTime = new Date(shabbatDetails.candle_lighting);
      const havdalahTime = new Date(shabbatDetails.havdalah);
      if (day === 5 && now >= candleLightingTime)
        return "שבת שלום וסוף שבוע מבורך, מלא בחוויות נעימות ומרגיעות";
      if (day === 6 && now >= havdalahTime)
        return "שיהיה שבוע טוב מלא באור, שמחה והצלחה";

      switch (day) {
        case 0:
          return "שיהיה יום נפלא, מלא בהזדמנויות חדשות והגשמה עצמית";
        case 1:
          return "שהיום הזה יביא איתו רק בשורות טובות ורגעים מתוקים";
        case 2:
          return "שיהיה יום קסום, מלא באנרגיות טובות והישגים משמחים";
        case 3:
          return "שיהיה יום פורה ומוצלח, עם המון סיבות לחייך";
        case 4:
          return "שהיום הזה יהיה מלא בהפתעות נעימות ורגעים בלתי נשכחים";
        case 5:
          return now < candleLightingTime
            ? "שבת שלום וסוף שבוע מבורך, מלא בחוויות נעימות ומרגיעות"
            : "";
        default:
          return "";
      }
    }
  };

  return (
    <View style={styles.shabbatContainer}>
      {shabbatDetails && (
        <>
          <View style={styles.orangeWave}>
        <View style={styles.waveContent}>
          <View style={styles.shabbatTimes}>
            <Text style={[styles.jewishDate, { fontFamily: 'ShmulikCLMMedium' }]}>
              <Text style={[styles.jewishDate, { fontFamily: 'ShmulikCLMMedium' }]}>{jewishDateInHebrew}</Text>, {todayDate}
            </Text>

            <Text style={[styles.candleLighting, { fontFamily: 'ShmulikCLMMedium' }]}>
              {`כניסת שבת${!isShabbatPeriod() ? ' הקרובה' : ''}: ${shabbatDetails.candle_lighting}`}
            </Text>
            <Text style={[styles.havdalah, { fontFamily: 'ShmulikCLMMedium' }]}>
              {`יציאת שבת${!isShabbatPeriod() ? ' הקרובה' : ''}: ${shabbatDetails.havdalah}`}
            </Text>
          </View>
          <View style={styles.shabbatPrayer}>
            <Text style={[styles.shabbatPrayerText, { fontFamily: 'ShmulikCLMMedium' }]}>
              {isShabbatPeriod() ? "ברוּךְ אַתָּה יי אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת" : getMessageByDayAndTime()} 
            </Text>
          </View>
        </View>
      </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  shabbatContainer: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  orangeWave: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#febd59",
    borderTopLeftRadius: 60, // Top-left corner radius
    borderTopRightRadius: 40, // Top-right corner radius
    borderBottomLeftRadius: 80, // Bottom-left corner radius
    borderBottomRightRadius: 80, // Bottom-right corner radius
    height: 300,
    zIndex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  waveContent: {
    position: "relative",
    zIndex: 2,
    width: "80%",
    marginLeft: "auto",
    padding: 20,
    color: "#000000",
    textAlign: "right",
    
  },
  shabbatTimes: {
    marginBottom: 10,
  },
  jewishDate: {
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
  },
  candleLighting: {
    fontSize: 14,
  },
  havdalah: {
    fontSize: 14,
  },
  shabbatPrayer: {
    marginTop: 20,
  },
  shabbatPrayerText: {
    fontSize: 14,
  },
});

export default ShabbatDetailsCard;
