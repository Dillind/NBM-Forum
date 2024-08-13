import icons from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { padding } from "@/utils/paddingStyling";

const ErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <View style={styles.container}>
      <Image source={icons.errorAlert} style={{ width: 20, height: 20 }} />
      <AppText textStyles={{ maxWidth: 300, lineHeight: 16.8 }}>
        {error}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(250, 215, 207, 1)",
    width: "100%",
    ...padding(8, 12, 8, 12),
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
});

export default ErrorMessage;
