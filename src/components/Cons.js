import { Dimensions } from 'react-native';

export const Cons = {
  sw1: Dimensions.get('window').width,
  sw2: Dimensions.get('window').width / 2,
  sw3: Dimensions.get('window').width / 3,
  sw4: Dimensions.get('window').width / 4,

  sh1: Dimensions.get('window').height,
  sh2: Dimensions.get('window').height / 2,
  sh3: Dimensions.get('window').height / 3,
  sh4: Dimensions.get('window').height / 4,

  primaryColor : "#0077E6",
  positiveColor: "#059669",
  negativeColor: "#e11d48",
  bgColor      : "#f6f6f6",
  textColor    : "#262626",

  // apiServer: "http://192.168.68.82:8000",
    // apiServer: "http://192.168.205.18:8000",
    apiServer: "http://sso.simpledev.id",

  logoColor1: "#393186",
  logoColor2: "#E62931",
}
