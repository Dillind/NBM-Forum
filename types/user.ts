import { ImageSourcePropType } from "react-native";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  avatar: ImageSourcePropType | string | null;
  email: string;
  telephone: string;
  address: Address;
  password: string;
  confirmPassword?: string;
};

export type Address = {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
  fullAddress: string;
  streetName: string;
  streetNumber: string;
  googlePlaceId: string;
  lng: number;
  lat: number;
  country: string;
  suburb: string;
  postcode: string;
};

export type SignUpPersonalInformation = {
  firstName: string;
  lastName: string;
  avatar: ImageSourcePropType | string | null;
  email: string;
  telephone: string;
};

export type SignUpLocation = {
  address: Address;
};

export type SignUpPasswords = {
  password: string;
  confirmPassword: string;
};

export type UserFormData = SignUpPersonalInformation &
  SignUpLocation &
  SignUpPasswords;

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type LoginRequest = {
  email: string;
  password: string;
  authError?: string;
};
