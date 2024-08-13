import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import icons from "@/constants/icons";
import Colors from "@/constants/colors";
import { padding } from "@/utils/paddingStyling";
import { Comment } from "@/types/comment";
import { useCreateCommentMutation } from "@/services/comments/mutations";

type ReplyBarProps = {
  postId: number;
};

const ReplyBar = ({ postId }: ReplyBarProps) => {
  const { control, handleSubmit, reset } = useForm<Comment>();
  const { mutate: createComment } = useCreateCommentMutation();
  const onSubmit: SubmitHandler<Comment> = async (data: Comment) => {
    try {
      createComment(
        { postId, comment: data },
        {
          onSuccess: () => {
            reset({ text: "" });
          },
        }
      );
    } catch (error) {
      console.error("Error commenting on post", error);
    }
  };

  return (
    <View style={styles.replyBarContainer}>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name="text"
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Make a comment"
              placeholderTextColor={Colors.charcoalDark}
              style={styles.textInput}
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.replyArrowWrapper}>
          <Image source={icons.arrowForward} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReplyBar;

const styles = StyleSheet.create({
  replyBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.greyDark,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "rgba(239, 239, 239, 1)",
    marginRight: 8,
  },
  textInput: {
    fontFamily: "Syne-SemiBold",
    width: 302,
    ...padding(8, 16, 8, 16),
  },
  replyArrowWrapper: {
    height: 32,
    width: 32,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});
