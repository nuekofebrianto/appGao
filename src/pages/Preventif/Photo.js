import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import { useRoute } from "@react-navigation/native"

const PhotoPage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const { photoPath } = route.params;

    useEffect(() => {
       
        setTimeout(() => {
        }, 1000);

    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>
        
    </GluestackUIProvider>
}

export default PhotoPage