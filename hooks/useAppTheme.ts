import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

const useAppTheme = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme || "light"];
};

export default useAppTheme;
