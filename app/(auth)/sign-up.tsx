import Button from "@/components/core/Button";
import FormField from "@/components/core/FormField";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { SignUpPersonalInformation } from "@/types/user";
import { useRegisterStore } from "@/store/useRegisterStore";
import AppText from "@/components/core/AppText";
import SignUpScreenView from "@/components/auth/SignUpScreenView";
import Colors from "@/constants/colors";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpPersonalInformation>();

  const { setData } = useRegisterStore();

  const onSubmit = (data: SignUpPersonalInformation) => {
    setData({ step: 1, data });
    router.push("/sign-up-location");
  };

  return (
    <SignUpScreenView
      title="Create your Account"
      subHeading="Enter your details below to start creating your brand new account."
      step={1}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <>
                  <FormField
                    title="Your name"
                    placeholder="Enter your first name here"
                    value={value}
                    onChangeText={onChange}
                    requiredInput
                    error={errors.firstName?.message}
                  />
                </>
              )}
              rules={{ required: "You must enter a first name." }}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <>
                  <FormField
                    placeholder="Enter your last name here"
                    value={value}
                    onChangeText={onChange}
                    error={errors.lastName?.message}
                  />
                </>
              )}
              rules={{ required: "You must enter a last name." }}
            />
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <FormField
                  title="Email"
                  placeholder="you@email.com.au"
                  value={value}
                  onChangeText={onChange}
                  requiredInput
                  error={errors.email?.message}
                />
              </>
            )}
            rules={{ required: "You must enter an email address." }}
          />
          <Controller
            control={control}
            name="telephone"
            render={({ field: { onChange, value } }) => (
              <>
                <FormField
                  title="Phone"
                  placeholder="Enter your phone number here"
                  value={value}
                  onChangeText={onChange}
                  requiredInput
                  error={errors.telephone?.message}
                />
              </>
            )}
            rules={{
              required: "You must enter a phone number.",
              pattern: {
                value: /^04\d{8}$/,
                message:
                  "Phone number must start with 04 and be 10 digits long.",
              },
            }}
          />
        </View>
        <View style={{ marginTop: 32, gap: 5 }}>
          <Button title="Next" onPress={handleSubmit(onSubmit)} />
        </View>
        <View style={styles.account}>
          <AppText textStyles={{ color: Colors.primaryColor }}>
            Already have an account?
          </AppText>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <AppText
              textStyles={{
                color: Colors.primaryColor,
                fontFamily: "Syne-SemiBold",
              }}
            >
              Log in here.
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SignUpScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  title: {
    fontFamily: "Syne-Bold",
    fontSize: 24,
  },
  content: {
    marginTop: 62,
    marginBottom: 32,
    display: "flex",
    gap: 16,
  },
  subHeading: {
    fontSize: 16,
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
    alignItems: "center",
    marginTop: 40,
  },
});

export default SignUp;
