import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import useAppTheme from "@/hooks/useAppTheme";
import useStylesByThemes from "@/hooks/useStylesByThemes";
import { ThemedText } from "@/components/ThemedText";
import UpCommingMatches from "@/components/UpCommingMatches";
import useLocalDatabase from "@/hooks/useLocalDatabase";
import { useSelector } from "react-redux";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Scheduled = () => {
  const themeColors = useAppTheme();
  const styles = useStylesByThemes(createStyles);
  const { items, loading, addItem, getItems, updateItem, deleteItem } =
    useLocalDatabase();
  const scheduledMatchData = useSelector(
    (state) => state?.app?.allScheduledMatches
  );

  const navigation = useNavigation();

  useEffect(() => {
    getItems();
  }, []);

  console.log(scheduledMatchData);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topheader}>
        <ThemedText
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: themeColors?.background,
          }}
        >
          Your All Scheduled Match
        </ThemedText>
        <ThemedText
          style={{
            textAlign: "center",
            color: themeColors.background,
            fontSize: 13,
          }}
        >
          These are scheduled matches
        </ThemedText>
      </View>
      <View style={{ padding: "3%" }}>
        <FlatList
          data={scheduledMatchData}
          renderItem={({ item, index }) => (
            <TouchableOpacity activeOpacity={1} style={styles.card}>
              <View
                style={[
                  styles.leftIndicator,
                  { backgroundColor: item?.matchDetails?.teamA?.color },
                ]}
              />
              <View style={styles.content}>
                <View style={styles.header}>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.title}>
                      {item?.matchDetails?.teamA?.shortName}
                    </Text>
                    <Text style={styles.vs}>VS</Text>
                    <Text style={styles.title}>
                      {item?.matchDetails?.teamB?.shortName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 20,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity>
                      <Ionicons name="eye" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("updateSchedule", {
                          data: item,
                        });
                      }}
                    >
                      <FontAwesome6 name="edit" size={16} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItem(item?.id)}>
                      <FontAwesome6 name="trash" size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.time}>{item?.matchDetails.matchDate}</Text>
                <View>
                  <Text>Day : {item?.day?.day}</Text>
                  <View>
                    <Text>Slots : {item?.timeSlot}</Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.rightIndicator,
                  { backgroundColor: item?.matchDetails?.teamB?.color },
                ]}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    topheader: {
      backgroundColor: themeColors?.tabIconSelected,
      height: "25%",
      width: "100%",
      justifyContent: "center",
      paddingTop: "15%",
    },
    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom: 15,
      elevation: 3, // Adds shadow for Android
      shadowColor: "#000", // Adds shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    rightIndicator: {
      width: 10,
      backgroundColor: "#6200ee", // Purple left indicator
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    leftIndicator: {
      width: 10,
      backgroundColor: "#6200ee", // Purple left indicator
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    content: {
      flex: 1,
      padding: 15,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
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
    status: {
      fontSize: 12,
      color: "#28a745", // Green status color
      fontWeight: "600",
    },
    time: {
      fontSize: 14,
      color: "#555",
      marginBottom: 10,
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    tag: {
      backgroundColor: "#f1f1f1",
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 5,
      marginBottom: 5,
    },
    tagText: {
      fontSize: 12,
      color: "#555",
    },
  });

export default Scheduled;
