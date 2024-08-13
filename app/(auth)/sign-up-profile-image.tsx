import Button from "@/components/core/Button";
import icons from "@/constants/icons";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/colors";
import AppText from "@/components/core/AppText";
import { router } from "expo-router";
import { useRegisterStore } from "@/store/useRegisterStore";
import LoadingState from "@/components/core/LoadingState";
import { useSignUpMutation } from "@/services/auth/mutations";
import { UserFormData } from "@/types/user";
import SignUpScreenView from "@/components/auth/SignUpScreenView";
import SelectImageFileToUpload from "@/components/auth/SelectImageToUpload";

const SignUpProfileImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useRegisterStore.getState();
  const { mutate: register } = useSignUpMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const handleSubmit = async () => {
    const userData: UserFormData = {
      ...user,
      avatar: "string",
    };

    try {
      setIsLoading(true);
      register(userData, {
        onSuccess: () => {
          setTimeout(() => {
            setIsLoading(false);
            useRegisterStore.getState().reset();
          }, 3000);
        },
        onError: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <SignUpScreenView
      title="Upload a Profile Picture"
      subHeading="Let’s put a name to a face. Upload a profile picture to complete your profile. This is an optional step."
      step={4}
    >
      {image ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: image }}
            style={{ width: 183, height: 183, borderRadius: 9999 }}
          />
          <TouchableOpacity onPress={pickImage}>
            <AppText
              textStyles={{
                textDecorationLine: "underline",
                color: Colors.primaryColor,
              }}
            >
              Edit profile picture
            </AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <SelectImageFileToUpload pickImage={pickImage} />
      )}

      <View style={{ marginTop: 32 }}>
        <Button title="Create my Account" onPress={handleSubmit} />
      </View>
      <TouchableOpacity
        style={styles.flexCentered}
        onPress={() => router.push("/forum")}
      >
        <AppText textStyles={{ fontSize: 16, textDecorationLine: "underline" }}>
          Skip for now
        </AppText>
      </TouchableOpacity>
    </SignUpScreenView>
  );
};

export default SignUpProfileImage;

const styles = StyleSheet.create({
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  flexCentered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
