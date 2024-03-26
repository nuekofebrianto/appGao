import { Box, Text, RadioIndicator, GluestackUIProvider, StatusBar } from "@gluestack-ui/themed"
import { ActivityIndicator } from "react-native"
import { Cons } from "../components/Cons"
import { config } from "@gluestack-ui/config"
config

const SplashPage = () => {
    return     <GluestackUIProvider config = {config}>
    <StatusBar backgroundColor             = {Cons.logoColor2} barStyle = "light-content"></StatusBar>
        <Box
            width           = {Cons.sw1}
            height          = {Cons.sh1}
            paddingTop={Cons.sh2}
        >
            <ActivityIndicator
                size         = {50}
                color        = {Cons.logoColor2}
                alignContent = "center"
                alignItems   = "center"
                alignSelf    = "center"
            ></ActivityIndicator>
        </Box>
    </GluestackUIProvider>
}

export default SplashPage