import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopBar from "../core/TopBar";
import ProgressBar from "../core/ProgressBar";
import AppText from "../core/AppText";

type Props = {
  title: string;
  subHeading?: string;
  step: number;
  children: ReactNode;
};

const SignUpScreenView = ({ title, subHeading, step, children }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <GestureHandlerRootView
      style={[{ paddingTop: top, paddingBottom: bottom }, styles.container]}
    >
      <TopBar />
      <ProgressBar progress={step} />
      <View style={styles.content}>
        <AppText textStyles={styles.title}>{title}</AppText>
        {subHeading && (
          <AppText textStyles={styles.subHeading}>{subHeading}</AppText>
        )}
      </View>
      {children}
    </GestureHandlerRootView>
  );
};

export default SignUpScreenView;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  title: {
    fontFamily: "Syne-Bold",
    fontSize: 24,
  },
  content: {
    marginTop: 62,
    marginBottom: 32,
    display: "flex",
    gap: 16,
  },
  subHeading: {
    fontSize: 16,
  },
});
