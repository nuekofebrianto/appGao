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

    primaryColor : "$primary500",
    positiveColor: "$tertiary600",
    negativeColor: "$rose600",
    bgColor      : "#f6f6f6",

      // apiServer: "http://192.168.202.18:8000",
    apiServer: "http://192.168.20.18:8000",
      // apiServer: "http://192.168.68.74:8000",

    logoColor1: "#393186",
    logoColor2: "#E62931",
}
