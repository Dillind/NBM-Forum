import AppText from "@/components/core/AppText";
import FormField from "@/components/core/FormField";
import TopBarSave from "@/components/core/TopBarSave";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Location = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView
      style={[{ paddingTop: top, paddingBottom: bottom }, styles.container]}
    >
      <TopBarSave title="Save" />
      <View style={styles.titleHeader}>
        <AppText
          textStyles={{
            fontFamily: "Syne-Bold",
            fontSize: 18,
            marginVertical: 32,
          }}
        >
          Location
        </AppText>
      </View>
      <View style={styles.formContainer}>
        <FormField title="Your address" />
      </View>
    </GestureHandlerRootView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  titleHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 32,
  },
  formContainer: {
    display: "flex",
    gap: 8,
  },
});
