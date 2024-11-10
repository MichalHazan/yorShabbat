import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ShabbatTime } from "@/utils/types";
interface ShabbatDetailsCardProps {
  shabbatDetails: ShabbatTime | null;
}

const Parasha = ({ shabbatDetails }: ShabbatDetailsCardProps) => {
  

  return (
    <View style={styles.shabbatContainer}>
      {shabbatDetails && (
        <>
         <View style={styles.shabbatTimes}>
           
            <Text style={[{ fontFamily: 'ShmulikCLMMedium' }, styles.title]}>
                {"פרשת השבוע"}
            </Text>
            <Text style={[{ fontFamily: 'ShmulikCLMMedium' }]}>
                {shabbatDetails.torah_hw}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  shabbatContainer: {
    flex: 2,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  shabbatTimes: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
  },
  content:{
    fontSize: 18,
    lineHeight: 1.6,
    textAlign: "center"
  }
 
});

export default Parasha;
