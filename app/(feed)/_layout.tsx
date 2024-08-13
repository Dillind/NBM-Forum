import { Stack } from "expo-router";
import React from "react";

const FeedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="forum" options={{ headerShown: false }} />
      <Stack.Screen name="post-expanded" options={{ headerShown: false }} />
      <Stack.Screen name="create-post" options={{ headerShown: false }} />
      <Stack.Screen name="category-post" options={{ headerShown: false }} />
      <Stack.Screen name="review-post" options={{ headerShown: false }} />
      <Stack.Screen name="edit-post" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FeedLayout;
