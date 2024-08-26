import { Stack } from "expo-router";

const FeedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forum" />
      <Stack.Screen name="post-expanded" />
      <Stack.Screen name="create-post" />
      <Stack.Screen name="category-post" />
      <Stack.Screen name="review-post" />
      <Stack.Screen name="edit-post" />
    </Stack>
  );
};

export default FeedLayout;
