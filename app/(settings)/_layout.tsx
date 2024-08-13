import { Stack } from "expo-router";
import React from "react";

const SettingsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen
          name="personal-information"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="location" options={{ headerShown: false }} />
        <Stack.Screen name="update-password" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default SettingsLayout;
