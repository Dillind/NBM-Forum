import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import Colors from "@/constants/colors";

type Props = {
  children?: React.ReactNode;
  textStyles?: TextStyle | TextStyle[];
};

const AppText = ({ textStyles, children }: Props) => {
  return <Text style={[styles.defaultTextStyle, textStyles]}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  defaultTextStyle: {
    color: Colors.black,
    fontFamily: "Syne-Regular",
    fontSize: 14,
  },
});
