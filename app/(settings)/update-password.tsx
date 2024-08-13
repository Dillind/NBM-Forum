import AppText from "@/components/core/AppText";
import FormField from "@/components/core/FormField";
import TopBarSave from "@/components/core/TopBarSave";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UpdatePassword = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBarSave title="Save" />
      <View style={styles.titleHeader}>
        <AppText
          textStyles={{
            fontFamily: "Syne-Bold",
            fontSize: 18,
            marginVertical: 32,
          }}>
          Update Password
        </AppText>
      </View>
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 24 }}>
          <FormField
            title="Current Password"
            placeholder="Enter your current password"
          />
        </View>
        <FormField
          title="Create a new Password"
          placeholder="Enter your new password"
        />
        <FormField
          title="Confirm New Password"
          placeholder="Re-enter your new password"
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default UpdatePassword;

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
