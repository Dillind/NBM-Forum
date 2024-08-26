import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import SplashScreen from "@/components/core/SplashScreen";
import { ReactQueryProvider } from "@/components/auth/ReactQueryProvider";

export default function RootLayout() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <ReactQueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(feed)" />
        <Stack.Screen name="(settings)" />
      </Stack>
    </ReactQueryProvider>
  );
}
