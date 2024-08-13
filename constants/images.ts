import { ImageSourcePropType } from "react-native";

type ImageProps = {
  splashIcon: ImageSourcePropType;
  splashIconPurple: ImageSourcePropType;
  logo: ImageSourcePropType;
  placeholder: ImageSourcePropType;
};

const images: ImageProps = {
  splashIcon: require("../assets/images/splash-icon-default.png"),
  splashIconPurple: require("../assets/images/splash-icon-purple.png"),
  logo: require("../assets/images/logo.png"),
  placeholder: require("../assets/images/placeholder.png"),
};

export default images;
