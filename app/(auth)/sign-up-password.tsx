import SignUpScreenView from "@/components/auth/SignUpScreenView";
import AppText from "@/components/core/AppText";
import Button from "@/components/core/Button";
import ErrorMessage from "@/components/core/ErrorMessage";
import FormField from "@/components/core/FormField";
import icons from "@/constants/icons";
import { useRegisterStore } from "@/store/useRegisterStore";
import { SignUpPasswords } from "@/types/user";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";

const SignUpPassword = () => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpPasswords>();

  const { setData } = useRegisterStore();

  const onSubmit = (data: SignUpPasswords) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    setData({ step: 3, data });
    router.push("/sign-up-profile-image");
  };

  return (
    <SignUpScreenView
      title="Let's Secure your Account"
      subHeading="Let's keep your NBM account safe with a secure password."
      step={3}
    >
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormField
              title="Create a Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              requiredInput
            />
          )}
          rules={{ required: "You must enter your password" }}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <FormField
              title="Confirm Password"
              placeholder="Re-enter your password"
              value={value}
              onChangeText={onChange}
              requiredInput
            />
          )}
          rules={{ required: "You must re-enter your password" }}
        />
        {errors.confirmPassword && (
          <ErrorMessage error={errors.confirmPassword.message} />
        )}
      </View>
      <View style={styles.criteria}>
        <AppText textStyles={styles.textStyle}>Your password must...</AppText>
        <View style={styles.iconText}>
          <Image
            source={icons.counter}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <AppText textStyles={styles.textStyle}>
            Include at least one number (eg. 1)
          </AppText>
        </View>
        <View style={styles.iconText}>
          <Image
            source={icons.hash}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <AppText textStyles={styles.textStyle}>
            Include at least one symbol (eg. #)
          </AppText>
        </View>
        <View style={styles.iconText}>
          <Image
            source={icons.textFields}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <AppText textStyles={styles.textStyle}>
            Include at least one upper and lowercase character
          </AppText>
        </View>
      </View>
      <View style={styles.checkboxText}>
        <Checkbox
          style={styles.checkboxIcon}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <AppText textStyles={{ color: "rgba(56, 57, 57, 0.4 " }}>
          By ticking this box, I agree to the terms and conditions of NBM.
        </AppText>
      </View>
      <View style={{ marginTop: 32, gap: 8 }}>
        <Button title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </SignUpScreenView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    gap: 8,
  },
  criteria: {
    backgroundColor: "rgba(233, 233, 233, 1)",
    width: "100%",
    height: 151,
    borderRadius: 8,
    padding: 14,
    display: "flex",
    marginTop: 32,
  },
  iconText: {
    flexDirection: "row",
    gap: 8,
    marginTop: 11.5,
  },
  textStyle: {
    color: "rgba(101, 101, 101, 1)",
  },
  checkboxIcon: {
    borderColor: "rgba(56, 57, 57, 0.2)",
    margin: 8,
  },
  checkboxText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 32,
    maxWidth: 316,
  },
});

export default SignUpPassword;
