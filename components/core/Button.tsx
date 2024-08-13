import icons from "@/constants/icons";
import { Link, router } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "./AppText";

type ButtonProps = {
  title: string;
  outlined?: boolean;
  onPress?: () => void;
  href?: string;
};

const Button = ({ title, outlined, onPress, href }: ButtonProps) => {
  const handlePress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={
        (styles.container,
        outlined
          ? {
              backgroundColor: "#FFFFFF",
              borderColor: "#6537FF",
              borderWidth: 2,
            }
          : { backgroundColor: "#6537FF" })
      }
    >
      <View style={styles.buttonContainer}>
        <AppText textStyles={outlined ? styles.textPurple : styles.textWhite}>
          {title}
        </AppText>
        <Image
          source={outlined ? icons.arrowRightPurple : icons.arrowRight}
          style={{ width: 15, height: 10 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 342,
    height: 47,
  },
  textWhite: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  textPurple: {
    color: "#6537FF",
    fontSize: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    padding: 16,
  },
});

export default Button;
