import SignUpScreenView from "@/components/auth/SignUpScreenView";
import Button from "@/components/core/Button";
import { useRegisterStore } from "@/store/useRegisterStore";
import { Address } from "@/types/user";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SignUpLocation = () => {
  // TODO: Incorporate when you have access to the google places API
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Address>();

  const { setData } = useRegisterStore();

  useEffect(() => {
    const signUpLocation = {
      address: {
        street: "Street 1",
        number: "1",
        city: "City 1",
        state: "State 1",
        postalCode: "12345",
        fullAddress: "string",
        streetName: "string",
        streetNumber: "string",
        googlePlaceId: "string",
        lng: 0,
        lat: 0,
        country: "string",
        suburb: "string",
        postcode: "string",
      },
    };
    setData({ step: 2, data: signUpLocation });
  }, [setData]);

  return (
    <SignUpScreenView
      title="Where are you Located?"
      subHeading="Add your address. Select your address from the suggested address below."
      step={2}
    >
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <GooglePlacesAutocomplete
            placeholder="Start typing..."
            styles={{
              textInput: styles.input,
              listView: { backgroundColor: "#fff" },
            }}
            query={{ key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY }}
            fetchDetails={true}
            onPress={(data, details = null) => console.log(data, details)}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("No results")}
          />
        </View>
      </View>
      <View style={{ marginTop: 32 }}>
        <Button title="Next" href="/sign-up-password" />
      </View>
    </SignUpScreenView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    gap: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(1, 2, 20, 0.2)",
    height: 51,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
});

export default SignUpLocation;
