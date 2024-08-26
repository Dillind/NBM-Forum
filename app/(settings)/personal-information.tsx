import AppText from "@/components/core/AppText";
import FormField from "@/components/core/FormField";
import TopBarSave from "@/components/core/TopBarSave";
import Colors from "@/constants/colors";
import { getCurrentUser } from "@/constants/primitives";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FileService from "@/services/files/queries";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import LoadingState from "@/components/core/LoadingState";
import SelectImageFileToUpload from "@/components/auth/SelectImageToUpload";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PersonalInformation = () => {
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const { setUser, user } = useUserStore();

  const {
    data: currentUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.currentUser],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <AppText>Loading...</AppText>;
  if (isError) return <AppText>Error: {error.message}</AppText>;
  if (!currentUser) return null;

  if (uploading) return <LoadingState />;

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

  const handleImageUpload = async (imageUri: string): Promise<void | null> => {
    if (!imageUri) return null;
    setUploading(true);
    try {
      const fileName = `avatarImage`;

      // Upload image to S3 bucket and retrieve key
      const uploadResponse = await FileService.uploadImageToBucket({
        fileName: fileName,
        folder: "avatar",
        rootFolder: "images",
      });

      const presignedUrl = uploadResponse.url;
      const bucketFileName = uploadResponse.fileName;

      const uriToBlob = async (uri: string) => {
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            // return the blob
            resolve(xhr.response);
          };
          xhr.onerror = () => {
            reject(new Error("uriToBlob failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);

          xhr.send(null);
        });
        const uploadImageResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: blob,
          headers: {
            "Content-Type": blob.type,
          },
        });
        return uploadImageResponse;
      };

      const blobResponse = await uriToBlob(imageUri);
      console.log("BLOB RESPONSE:", blobResponse);

      const downloadResponse = await FileService.downloadImage(
        bucketFileName!!
      );

      console.log("Download Response:", downloadResponse.url);

      const downloadedImageURI = downloadResponse.url;
      setImage(downloadedImageURI);
      setUser({ ...currentUser, avatar: downloadedImageURI });
    } catch (error) {
      console.error("Error uploading or processing image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBarSave
        title="Save"
        imageSubmit={() => image && handleImageUpload(image)}
        image={image!!}
      />
      <View style={{ marginTop: 16 }}>
        <AppText
          textStyles={{
            fontFamily: "Syne-Bold",
            fontSize: 18,
          }}
        >
          Personal Information
        </AppText>
      </View>
      {image || user ? (
        <View style={styles.imageWrapper}>
          <Image
            // TODO: Fix source error
            source={user ? { uri: user.avatar } : { uri: image }}
            style={styles.imageStyling}
          />
          <TouchableOpacity style={{ marginRight: 20 }} onPress={pickImage}>
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
      <View style={styles.formContainer}>
        <FormField title="Your name" value={currentUser?.firstName} />
        <FormField value={currentUser?.lastName} />
        <FormField title="Email" value={currentUser?.email} />
      </View>
    </GestureHandlerRootView>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
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
  imageStyling: { width: 183, height: 183, borderRadius: 9999 },
});
