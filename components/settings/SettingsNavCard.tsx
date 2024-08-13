import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Href, router } from "expo-router";
import AppText from "../core/AppText";
import icons from "@/constants/icons";
import { padding } from "@/utils/paddingStyling";

type SettingsNavCarProps = {
  title: string;
  icon: ImageSourcePropType;
  href?: Href;
  imageStyles?: ImageStyle;
  onPress?: () => void;
};

const SettingsNavCard = ({
  title,
  icon,
  href,
  imageStyles,
  onPress,
}: SettingsNavCarProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.settingsCardWrapper}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={icon} style={imageStyles} />
          <AppText
            textStyles={{
              fontSize: 16,
              color: "rgba(56, 57, 57, 1)",
              fontFamily: "Syne-SemiBold",
            }}
          >
            {title}
          </AppText>
        </View>
        <Image
          source={icons.chevronRight}
          style={{ width: 15, height: 18 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsCardWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "100%",
    alignItems: "center",
    height: 60,
    ...padding(8, 14, 8, 14),
    backgroundColor: "rgba(239, 239, 239, 1)",
  },
});

export default SettingsNavCard;
