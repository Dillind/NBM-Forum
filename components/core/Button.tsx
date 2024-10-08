import icons from "@/constants/icons";
import { Href, router } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "./AppText";
import Colors from "@/constants/colors";

type ButtonProps = {
  title: string;
  outlined?: boolean | undefined;
  onPress?: () => void;
  href?: Href;
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
          ? styles.buttonOutline
          : { backgroundColor: Colors.primaryColor })
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
    color: Colors.white,
    fontSize: 16,
  },
  textPurple: {
    color: Colors.primaryColor,
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
  buttonOutline: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
  },
});

export default Button;
