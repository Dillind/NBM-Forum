import { View, StyleSheet, Image } from "react-native";
import images from "@/constants/images";
import Button from "@/components/core/Button";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import AppText from "@/components/core/AppText";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
    "Syne-ExtraBold": require("../assets/fonts/Syne-ExtraBold.ttf"),
    "Syne-Medium": require("../assets/fonts/Syne-Medium.ttf"),
    "Syne-Regular": require("../assets/fonts/Syne-Regular.ttf"),
    "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          router.push("/forum");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={images.splashIcon}
            resizeMode="contain"
            style={styles.splashIcon}
          />
        </View>
        <View style={styles.content}>
          <AppText textStyles={styles.title}>
            Welcome to {"\n"}the NBM Forum
          </AppText>
          <AppText textStyles={styles.subHeading}>
            Time to get all the answers you need in a forum made for designers
            and developers!
          </AppText>
          <View style={styles.buttonContainer}>
            <Button href="/sign-up" title="Create an Account" />
            <Button href="/sign-in" title="Sign In" outlined />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    height: "100%",
    marginTop: -60,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    width: "100%",
    height: 468,
  },
  content: {
    marginHorizontal: 24,
  },
  splashIcon: {
    width: 169,
    height: 252,
    transform: [{ rotate: "35deg" }],
  },
  title: {
    color: Colors.charcoalDark,
    fontSize: 24,
    fontFamily: "Syne-Bold",
    marginTop: 30,
  },
  subHeading: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonContainer: {
    display: "flex",
    gap: 8,
  },
});
