import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../core/AppText";
import Colors from "@/constants/colors";
import icons from "@/constants/icons";

type SelectImageFileToUploadProps = {
  pickImage: () => void;
};

const SelectImageFileToUpload = ({
  pickImage,
}: SelectImageFileToUploadProps) => {
  return (
    <TouchableOpacity style={styles.fileUploadWrapper} onPress={pickImage}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
        <Image source={icons.upload} style={{ width: 16, height: 16 }} />
        <View>
          <AppText
            textStyles={{
              fontFamily: "Syne-Bold",
              color: Colors.charcoalDark,
              fontSize: 16,
            }}
          >
            Select a file
          </AppText>
          <AppText
            textStyles={{
              color: Colors.charcoalDark,
              fontSize: 16,
            }}
          >
            JPG or PNG, file size no more than 10MB
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectImageFileToUpload;

const styles = StyleSheet.create({
  fileUploadWrapper: {
    height: 106,
    width: "100%",
    borderWidth: 1,
    padding: 4,
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
  },
});
