import { useMutation } from "@tanstack/react-query";
import AuthService from "./queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { LoginRequest, LoginResponse, UserFormData } from "@/types/user";
import { router } from "expo-router";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginRequest) => {
      const response: LoginResponse = await AuthService.login(email, password);
      return response;
    },
    onSuccess: async (data: LoginResponse) => {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      console.log("Token set in AsyncStorage:", data.accessToken);

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      console.log("User in AsyncStorage:", data.user);
    },
    onError: async () => {
      Alert.alert("Login Error");
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (user: UserFormData) => {
      const response = await AuthService.register(user);
      return response;
    },
    onSuccess: async () => {
      Alert.alert(
        "Successful Registration",
        "You are now registered with NBM Forum."
      );
      router.push("/");
    },
    onError: () => {
      Alert.alert("Register Error");
    },
  });
};
