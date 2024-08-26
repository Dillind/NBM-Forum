import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="profile" />
        <Stack.Screen name="personal-information" />
        <Stack.Screen name="location" />
        <Stack.Screen name="update-password" />
      </Stack>
    </>
  );
};

export default SettingsLayout;
