import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import AppText from "../core/AppText";
import { router } from "expo-router";
import icons from "@/constants/icons";

const ForumHeader = () => {
  return (
    <View style={styles.forumHeaderBar}>
      <AppText textStyles={{ fontFamily: "Syne-Bold", fontSize: 25 }}>
        Forum
      </AppText>
      <View
        style={{
          flexDirection: "row",
          width: 72,
          height: 32,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/create-post")}>
          <Image source={icons.create} style={{ width: 18, height: 18 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={icons.accountCircle}
            style={{ width: 26, height: 26 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForumHeader;

const styles = StyleSheet.create({
  forumHeaderBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
});
