import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
// Adjust the import path for Colors

const useStylesByThemes = (createStyles) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || "light"];
  const styles = createStyles(themeColors);
  return styles;
};

export default useStylesByThemes;
