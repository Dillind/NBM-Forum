import { View, StyleSheet } from "react-native";
import React from "react";
import SettingsNavCard from "@/components/settings/SettingsNavCard";
import icons from "@/constants/icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TopBar from "@/components/core/TopBar";
import AppText from "@/components/core/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Profile = () => {
  const { top, bottom } = useSafeAreaInsets();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBar title="Profile" />
      <View style={styles.settingsWrapper}>
        <AppText
          textStyles={{
            fontFamily: "Syne-Bold",
            fontSize: 18,
            marginBottom: 14,
          }}
        >
          Settings
        </AppText>
        <View style={{ display: "flex", gap: 8 }}>
          <SettingsNavCard
            title="Personal Information"
            icon={icons.person}
            href="/personal-information"
            imageStyles={{ width: 21, height: 21 }}
          />
          <SettingsNavCard
            title="Location"
            icon={icons.location}
            href="/location"
            imageStyles={{ width: 19, height: 27 }}
          />
          <SettingsNavCard
            title="Update password"
            icon={icons.lock}
            href="/update-password"
            imageStyles={{ width: 21, height: 28 }}
          />
          <SettingsNavCard
            title="Delete account"
            icon={icons.deleteBin}
            onPress={handleSignOut}
            imageStyles={{ width: 18, height: 24 }}
          />
          <AppText
            textStyles={{
              fontFamily: "Syne-Bold",
              fontSize: 18,
              marginBottom: 14,
              marginTop: 24,
            }}
          >
            Legal
          </AppText>
          <SettingsNavCard
            title="Terms of service"
            icon={icons.termsOfService}
            imageStyles={{ width: 29, height: 23 }}
          />
          <SettingsNavCard
            title="Privacy policy"
            icon={icons.privacyPolicy}
            imageStyles={{ width: 29, height: 23 }}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  settingsWrapper: {
    marginTop: 31,
  },
});
