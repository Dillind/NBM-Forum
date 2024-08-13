import icons from "@/constants/icons";
import { Href, router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";
import Colors from "@/constants/colors";

type TopBarSaveProps = {
  title?: string;
  href?: Href;
  onPress?: (imageUri?: string) => void;
  disabled?: boolean;
};

const TopBarSave = ({ title, href, onPress, disabled }: TopBarSaveProps) => {
  const handlePress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  // Determine button style based on disabled state
  const getButtonStyles = (disabled: boolean | undefined) => ({
    ...styles.btnWrapper,
    opacity: disabled ? 0.5 : 1,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={router.back}>
        <Image source={icons.xmark} style={{ width: 14, height: 14 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} disabled={disabled}>
        <View style={getButtonStyles(disabled)}>
          <AppText textStyles={{ color: Colors.white }}>{title}</AppText>
          {title?.includes("Next") || title?.includes("Post") ? (
            <Image
              source={icons.arrowRight}
              style={{ width: 13, height: 10 }}
            />
          ) : (
            <Image source={icons.tick} style={{ width: 13, height: 10 }} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 26,
  },
  btnWrapper: {
    backgroundColor: Colors.primaryColor,
    width: 88,
    height: 34,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopBarSave;
