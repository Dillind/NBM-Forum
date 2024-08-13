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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(feed)" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      </Stack>
    </ReactQueryProvider>
  );
}
