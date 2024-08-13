import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import { padding } from "@/utils/paddingStyling";

const WriteReplyInput = () => {
  return (
    <View style={styles.replyContainer}>
      <TextInput
        placeholderTextColor={Colors.charcoalDark}
        placeholder="Write a reply ..."
        style={{ fontFamily: "Syne-Regular" }}
      />
    </View>
  );
};

export default WriteReplyInput;

const styles = StyleSheet.create({
  replyContainer: {
    width: 318,
    height: 33,
    backgroundColor: "rgba(239, 239, 239, 1)",
    marginVertical: 14,
    ...padding(8, 16, 8, 16),
  },
});
