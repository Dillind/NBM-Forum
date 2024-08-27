import { View, StyleSheet, Image } from "react-native";
import images from "@/constants/images";
import Colors from "@/constants/colors";

const LoadingState = () => {
  return (
    <View style={styles.container}>
      <Image
        source={images.splashIconPurple}
        resizeMode="contain"
        style={styles.splashIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  splashIcon: {
    width: 169,
    height: 252,
  },
});

export default LoadingState;
