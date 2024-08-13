import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen
          name="sign-up-location"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-up-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-up-profile-image"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
