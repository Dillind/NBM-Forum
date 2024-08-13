import { create } from "zustand";
import {
  SignUpPersonalInformation,
  SignUpLocation,
  SignUpPasswords,
  UserFormData,
} from "@/types/user";

interface RegisterStoreState {
  user: UserFormData;
  setData: ({ step, data }: setDataType) => void;
  reset: () => void;
}

type setDataType =
  | { step: 1; data: SignUpPersonalInformation }
  | { step: 2; data: SignUpLocation }
  | { step: 3; data: SignUpPasswords };

const stepVariant = {
  1: "stepOne",
  2: "stepTwo",
  3: "stepThree",
};

const initialUserState: UserFormData = {
  firstName: "",
  lastName: "",
  avatar: null,
  email: "",
  telephone: "",
  address: {
    street: "",
    number: "",
    city: "",
    state: "",
    postalCode: "",
    fullAddress: "",
    streetName: "",
    streetNumber: "",
    googlePlaceId: "",
    lng: 0,
    lat: 0,
    country: "",
    suburb: "",
    postcode: "",
  },
  password: "",
  confirmPassword: "",
};

export const useRegisterStore = create<RegisterStoreState>((set) => ({
  user: initialUserState,
  stepOne: null,
  stepTwo: null,
  stepThree: null,
  setData: ({ step, data }) => {
    set((state) => {
      // Determine the relevant step key
      const stepKey = stepVariant[step];

      // Create a new user object by merging existing state with new data
      const newUser = {
        ...state.user,
        ...data, // Merge with new data
      };

      return {
        ...state,
        // Update the specific step data
        [stepKey]: data,
        // Update the user object with the merged data
        user: newUser,
      };
    });
  },
  reset: () => {
    set(() => ({
      user: initialUserState,
      stepOne: null,
      stepTwo: null,
      stepThree: null,
    }));
  },
}));
