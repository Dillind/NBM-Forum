import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="sign-up-location" />
        <Stack.Screen name="sign-up-password" />
        <Stack.Screen name="sign-up-profile-image" />
      </Stack>
    </>
  );
};

export default AuthLayout;
