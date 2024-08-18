import icons from "@/constants/icons";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AppText from "./AppText";

type FormFieldProps = {
  title?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: () => void;
  requiredInput?: boolean;
};

const FormField = ({
  title,
  placeholder,
  value,
  onChangeText,
  requiredInput,
}: FormFieldProps) => {
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={title ? { gap: 8 } : { gap: 0 }}>
      <AppText textStyles={styles.title}>
        {title}
        {requiredInput && <Text style={{ color: "red" }}>*</Text>}
      </AppText>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={title?.includes("Password") && !showPassword}
          placeholderTextColor="#888888"
        />
        {title?.includes("Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eyeHide : icons.eye}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Syne-Bold",
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(1, 2, 20, 0.3)",
    height: 51,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
});

export default FormField;
