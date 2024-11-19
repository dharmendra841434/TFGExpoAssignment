import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { matchtTimeSlot } from "@/constants/matchTimeSlot";
import useAppTheme from "@/hooks/useAppTheme";
import useStylesByThemes from "@/hooks/useStylesByThemes";
import uuid from "react-native-uuid";
import useLocalDatabase from "@/hooks/useLocalDatabase";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";

const UpdateSchedule = () => {
  const route = useRoute();
  const updateMatch = route?.params?.data;
  const [clmn, setClmn] = useState(3);
  const [selectedDay, setSelectedDay] = useState(updateMatch.day);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    updateMatch?.timeSlot
  );

  console.log(selectedTimeSlot, "sdkhfhg");

  const themeColors = useAppTheme();
  const styles = useStylesByThemes(createStyles);
  const matchData = updateMatch?.matchDetails;

  const { updateItem } = useLocalDatabase();

  const router = useRouter();

  const handleSelectDay = (data: any) => {
    setSelectedTimeSlot([]);
    setSelectedDay(data);
  };

  const handleupdateSchedulMatch = () => {
    const newSchedule = {
      matchDetails: matchData,
      day: selectedDay,
      timeSlot: selectedTimeSlot,
    };

    updateItem(updateMatch?.id, newSchedule);
    router.back();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.scheduleBox}>
        <View style={styles.detailBox}>
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: matchData?.teamA.color,
              }}
            />
            <Text style={styles.title}>{matchData?.teamA.shortName}</Text>
          </View>
          <Text>Vs</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
          >
            <Text style={styles.title}>{matchData?.teamB.shortName}</Text>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: matchData?.teamB.color,
              }}
            />
          </View>
        </View>
        <View style={{ paddingTop: "10%" }}>
          <Text
            style={{
              marginBottom: "3%",
              color: themeColors?.tabIconSelected,
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            Scheduling Days
          </Text>
          <FlatList
            data={matchtTimeSlot}
            numColumns={clmn}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleSelectDay(item)}
                key={index}
                style={[
                  styles.day,
                  {
                    borderColor:
                      selectedDay?.day === item?.day
                        ? themeColors?.selectedOption
                        : themeColors?.disable,
                    backgroundColor:
                      selectedDay?.day === item?.day
                        ? themeColors?.selectedOption
                        : themeColors?.background,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      selectedDay?.day === item?.day && themeColors?.background,
                  }}
                >
                  {item?.day}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ paddingTop: "10%" }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              marginBottom: "3%",
              color: themeColors?.tabIconSelected,
            }}
          >
            Selected Day TimeSlot
          </Text>
          <View style={{ flexDirection: "row" }}>
            {selectedDay?.slot?.map((item: any, index: any) => (
              <TouchableOpacity
                onPress={() => {
                  // Toggle selection
                  setSelectedTimeSlot((prev) => {
                    if (prev.includes(item)) {
                      // Remove the item
                      return prev.filter(
                        (selectedItem) => selectedItem !== item
                      );
                    } else {
                      // Add the item
                      return [...prev, item];
                    }
                  });
                }}
                key={index} // Using index as key to avoid duplicate keys
                style={[
                  styles.day,
                  {
                    borderColor: selectedTimeSlot.includes(item)
                      ? themeColors?.selectedOption
                      : themeColors?.disable,
                    backgroundColor: selectedTimeSlot.includes(item) // Use includes for consistency
                      ? themeColors?.selectedOption
                      : themeColors?.background,
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedTimeSlot.includes(item) // Use consistent condition for color
                      ? themeColors?.background
                      : themeColors?.text,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleupdateSchedulMatch}
            style={styles.button}
          >
            <Text
              style={{
                textAlign: "center",
                color: themeColors?.background,
                fontWeight: "500",
              }}
            >
              Update Schedule Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      paddingTop: "35%",
      width: "100%",
    },
    scheduleBox: {
      backgroundColor: "white",
      width: "80%",
      elevation: 0.8,
      borderRadius: 30,
      overflow: "hidden",
      paddingVertical: "7%",
      paddingHorizontal: "4%",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    vs: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#333",
    },
    day: {
      width: 95,
      marginVertical: 5,
      borderWidth: 1,
      padding: 6,
      marginRight: 4,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    detailBox: {
      flexDirection: "row",
      width: "70%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      columnGap: 15,
    },
    button: {
      backgroundColor: themeColors?.tabIconSelected,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      marginTop: "7%",
      paddingVertical: "5%",
      borderRadius: 10,
    },
  });

export default UpdateSchedule;
