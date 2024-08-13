import { User, UserFormData } from "@/types/user";
import { axiosInstance } from "@/constants/primitives";

namespace AuthService {
  export const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const register = async (user: UserFormData) => {
    try {
      const response: User = await axiosInstance.post("/auth/register", user);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default AuthService;
