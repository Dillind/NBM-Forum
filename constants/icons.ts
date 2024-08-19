import { ImageSourcePropType } from "react-native";

type IconProps = {
  arrowLeft: ImageSourcePropType;
  arrowRight: ImageSourcePropType;
  arrowRightPurple: ImageSourcePropType;
  eyeHide: ImageSourcePropType;
  eye: ImageSourcePropType;
  errorAlert: ImageSourcePropType;
  counter: ImageSourcePropType;
  hash: ImageSourcePropType;
  textFields: ImageSourcePropType;
  upload: ImageSourcePropType;
  person: ImageSourcePropType;
  location: ImageSourcePropType;
  lock: ImageSourcePropType;
  deleteBin: ImageSourcePropType;
  termsOfService: ImageSourcePropType;
  privacyPolicy: ImageSourcePropType;
  create: ImageSourcePropType;
  accountCircle: ImageSourcePropType;
  chevronRight: ImageSourcePropType;
  xmark: ImageSourcePropType;
  tick: ImageSourcePropType;
  search: ImageSourcePropType;
  chatBubble: ImageSourcePropType;
  arrowDropdown: ImageSourcePropType;
  arrowForward: ImageSourcePropType;
  thumbsUp: ImageSourcePropType;
};

const icons: IconProps = {
  arrowLeft: require("../assets/icons/arrow-left.png"),
  arrowRight: require("../assets/icons/arrow-right.png"),
  arrowRightPurple: require("../assets/icons/arrow-right-purple.png"),
  eyeHide: require("../assets/icons/visibility-eye-closed.png"),
  eye: require("../assets/icons/visibility-eye-open.png"),
  errorAlert: require("../assets/icons/error.png"),
  counter: require("../assets/icons/counter.png"),
  hash: require("../assets/icons/hash.png"),
  textFields: require("../assets/icons/text-fields.png"),
  upload: require("../assets/icons/upload.png"),
  person: require("../assets/icons/person.png"),
  location: require("../assets/icons/location.png"),
  lock: require("../assets/icons/lock.png"),
  deleteBin: require("../assets/icons/delete.png"),
  termsOfService: require("../assets/icons/menu-book.png"),
  privacyPolicy: require("../assets/icons/import-contacts.png"),
  create: require("../assets/icons/create.png"),
  accountCircle: require("../assets/icons/account-circle.png"),
  chevronRight: require("../assets/icons/chevron-right.png"),
  xmark: require("../assets/icons/xmark.png"),
  tick: require("../assets/icons/tick.png"),
  search: require("../assets/icons/search.png"),
  chatBubble: require("../assets/icons/chat-bubble-outline.png"),
  arrowDropdown: require("../assets/icons/arrow-dropdown.png"),
  arrowForward: require("../assets/icons/arrow-forward.png"),
  thumbsUp: require("../assets/icons/thumbs-up.png"),
};

export default icons;
