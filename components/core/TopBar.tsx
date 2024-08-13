import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

const TopBar = ({ title }: { title?: string }) => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={router.back}>
          <Image source={icons.arrowLeft} style={{ width: 20, height: 14 }} />
        </TouchableOpacity>
        {title ? (
          <AppText textStyles={{ fontFamily: "Syne-Bold", fontSize: 25 }}>
            {title}
          </AppText>
        ) : (
          <Image source={images.logo} style={{ width: 100, height: 24 }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    maxWidth: 218,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
  },
});

export default TopBar;
