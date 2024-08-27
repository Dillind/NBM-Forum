import AppText from "@/components/core/AppText";
import Button from "@/components/core/Button";
import ErrorMessage from "@/components/core/ErrorMessage";
import FormField from "@/components/core/FormField";
import LoadingState from "@/components/core/LoadingState";
import TopBar from "@/components/core/TopBar";
import Colors from "@/constants/colors";
import { useSignInMutation } from "@/services/auth/mutations";
import { LoginRequest } from "@/types/user";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: login } = useSignInMutation();
  const { top, bottom } = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  if (isLoading) {
    return <LoadingState />;
  }

  const onSubmit: SubmitHandler<LoginRequest> = async ({
    email,
    password,
  }: LoginRequest) => {
    try {
      setIsLoading(true);
      login(
        { email, password },
        {
          onSuccess: () => {
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert(
                "Successful Login",
                "You have been successfully logged into the NBM Forum"
              );
              router.push("/forum");
            }, 3000);
          },
          onError: () => {
            setIsLoading(false);
            setError("authError", {
              type: "manual",
              message:
                "Oops! Those details don't seem to match. Check the details you entered are correct and try again.",
            });
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBar />
      <View style={styles.content}>
        <AppText textStyles={styles.title}>Log In</AppText>
        <AppText textStyles={styles.subHeading}>
          Enter your details to log into your account.
        </AppText>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormField
              title="Email"
              placeholder="you@email.com.au"
              value={value}
              onChangeText={onChange}
              requiredInput
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormField
              title="Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              requiredInput
            />
          )}
        />
      </View>
      <TouchableOpacity>
        <AppText
          textStyles={{
            textAlign: "right",
            color: Colors.primaryColor,
            marginTop: 8,
          }}
        >
          Forgot your password?
        </AppText>
      </TouchableOpacity>
      <View style={{ marginTop: 32, gap: 8 }}>
        <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      </View>
      {errors.authError && <ErrorMessage error={errors.authError.message} />}
      <View style={styles.account}>
        <AppText textStyles={{ color: Colors.primaryColor }}>
          Don't have an account?
        </AppText>
        <TouchableOpacity onPress={() => router.push("/sign-up")}>
          <AppText
            textStyles={{
              color: Colors.primaryColor,
              fontFamily: "Syne-SemiBold",
              textDecorationLine: "underline",
            }}
          >
            Create one here.
          </AppText>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: "Syne-Bold",
    fontSize: 24,
  },
  subHeading: {
    fontSize: 16,
  },
  content: {
    marginBottom: 32,
    display: "flex",
    gap: 16,
    marginTop: 45,
  },
  formContainer: {
    display: "flex",
    gap: 8,
  },
  account: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
    marginTop: 280,
  },
});

export default SignIn;
