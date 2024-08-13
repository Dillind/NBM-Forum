import { View, StyleSheet } from "react-native";
import React from "react";
import { CommentResponse } from "@/types/comment";
import AppText from "../core/AppText";
import { formatDate } from "@/utils/formatDate";
import Colors from "@/constants/colors";

type PostUserInformationProps = {
  userInfo: CommentResponse;
};

const PostUserInformation = ({ userInfo }: PostUserInformationProps) => {
  return (
    <>
      <View style={styles.userInfoContainer}>
        <AppText textStyles={styles.userNameStyling}>
          {userInfo.user.firstName}
        </AppText>
        <View style={styles.dot} />
        <AppText textStyles={styles.dateStyling}>
          {formatDate(userInfo.createdAt)}
        </AppText>
      </View>
      <AppText textStyles={{ marginTop: 8 }}>{userInfo.text}</AppText>
    </>
  );
};

export default PostUserInformation;

const styles = StyleSheet.create({
  dot: {
    width: 4,
    height: 4,
    backgroundColor: Colors.primaryColor,
    borderRadius: 9999,
    marginHorizontal: 8,
  },
  dateStyling: {
    color: Colors.greyDark,
    opacity: 0.8,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameStyling: {
    color: Colors.greyDark,
    fontFamily: "Syne-Bold",
  },
});
