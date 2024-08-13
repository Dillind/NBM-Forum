import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import images from "@/constants/images";
import { router } from "expo-router";

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={images.splashIcon}
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
    backgroundColor: "#6537FF",
  },
  splashIcon: {
    width: 120,
    height: 178,
  },
});

export default SplashScreen;
