import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/constants/query-keys";

export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Failed to retrieve access token", error);
    return null;
  }
};

export const useAccessToken = async () => {
  return useQuery({
    queryKey: [queryKeys.accessToken],
    queryFn: getAccessToken,
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to retrieve user", error);
    return null;
  }
};

export const useCurrentUser = async () => {
  return useQuery({
    queryKey: [queryKeys.currentUser],
    queryFn: getCurrentUser,
  });
};

export const createAxiosInstance = async () => {
  const token = await getAccessToken();
  return axios.create({
    baseURL: "https://api.development.forum.mike-automations.link",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const axiosInstance = axios.create({
  baseURL: "https://api.development.forum.mike-automations.link",
});
