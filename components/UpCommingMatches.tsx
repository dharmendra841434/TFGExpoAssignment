import { View, Text, FlatList } from "react-native";
import React from "react";
import MatchCard from "./MatchCard";
import { upcommingMatchesData } from "@/constants/upCommingMatchesData";
import { useSelector } from "react-redux";

const UpCommingMatches = () => {
  return (
    <View>
      <FlatList
        data={upcommingMatchesData}
        keyExtractor={(item) => item.matchId}
        renderItem={({ item }) => <MatchCard item={item} />}
        contentContainerStyle={{
          padding: 10,
        }}
      />
    </View>
  );
};

export default UpCommingMatches;
