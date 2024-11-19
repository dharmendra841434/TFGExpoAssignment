import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import useAppTheme from "@/hooks/useAppTheme";
import useStylesByThemes from "@/hooks/useStylesByThemes";
import { ThemedText } from "@/components/ThemedText";
import UpCommingMatches from "@/components/UpCommingMatches";
import useLocalDatabase from "@/hooks/useLocalDatabase";

const HomeScreen = () => {
  const themeColors = useAppTheme();
  const styles = useStylesByThemes(createStyles);
  const { getItems } = useLocalDatabase();

  useEffect(() => {
    getItems();
  }, []);

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
          Schedule Your Match
        </ThemedText>
        <ThemedText
          style={{
            textAlign: "center",
            color: themeColors.background,
            fontSize: 13,
          }}
        >
          These are Upcomming matches
        </ThemedText>
      </View>
      <UpCommingMatches />
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
  });

export default HomeScreen;
