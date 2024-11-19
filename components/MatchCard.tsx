import { setSingleMatchData } from "@/redux/AppSlice";
import {
  filterMatchedData,
  getDayByMatchId,
  isMatchAvailable,
} from "@/utils/helper";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Team {
  name: string;
  shortName: string;
  color: string;
}

interface Match {
  matchId: string;
  matchDate: string;
  venue: string;
  teamA: Team;
  teamB: Team;
}

interface MatchCardProps {
  item: Match;
}
const MatchCard = ({ item }: MatchCardProps) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const scheduledMatchData = useSelector(
    (state) => state?.app?.allScheduledMatches
  );

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSingleMatchData(item));
        navigation?.navigate(
          isMatchAvailable(scheduledMatchData, item?.matchId)
            ? "scheduled"
            : "scheduling"
        );
      }}
      activeOpacity={0.9}
      style={styles.card}
    >
      <View
        style={[styles.leftIndicator, { backgroundColor: item?.teamA?.color }]}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View
            style={{ flexDirection: "row", columnGap: 6, alignItems: "center" }}
          >
            <Text style={styles.title}>{item?.teamA?.shortName}</Text>
            <Text style={styles.vs}>VS</Text>
            <Text style={styles.title}>{item?.teamB?.shortName}</Text>
          </View>
          <Text
            style={[
              styles.status,
              {
                color: isMatchAvailable(scheduledMatchData, item?.matchId)
                  ? "green"
                  : "gray",
              },
            ]}
          >
            {isMatchAvailable(scheduledMatchData, item?.matchId)
              ? "Scheduled"
              : "Up-Comming"}
          </Text>
        </View>
        <Text style={styles.time}>{item.matchDate}</Text>
        <View>
          {isMatchAvailable(scheduledMatchData, item?.matchId) && (
            <View
              style={{
                backgroundColor: "orange",
                width: "25%",
                alignItems: "center",
                borderRadius: 7,
                padding: 3,
              }}
            >
              <Text style={{ color: "white" }}>
                {getDayByMatchId(scheduledMatchData, item?.matchId).day}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={[styles.rightIndicator, { backgroundColor: item?.teamB?.color }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default MatchCard;
