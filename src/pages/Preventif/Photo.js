import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, ScrollView, StatusBar, View } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import { useRoute } from "@react-navigation/native"
import { ActivityIndicator, Image } from "react-native"
import { Image as Img } from "@gluestack-ui/themed"
import { useState } from "react"
import { Text } from "@gluestack-ui/themed"

const PhotoPage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const { photoPath } = route.params;

    const [aspectRatio, setAspectRatio] = useState(1);
    const [photoWidth, setPhotoWidth] = useState(0);
    const [photoHigh, setPhotoHigh] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Image.getSize(Cons.apiServer + photoPath, (width, height) => {
            setAspectRatio(width / height);

            setTimeout(() => {
                setPhotoWidth(width)
                setPhotoHigh(width / aspectRatio)
                setIsLoading(false)
            }, 1000);

        });

    }, [dispatch])

    // const isLandscape = aspectRatio > 1;

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>
        {/* <ScrollView h={Cons.sh1}> */}
        {isLoading ?
            <View h={Cons.sh1} w={Cons.sw1} justifyContent="center">

                <ActivityIndicator size={"large"} color={Cons.logoColor2}></ActivityIndicator>
            </View>
            :
            <ScrollView w={Cons.sw1} h={Cons.sh1} >
                {aspectRatio > 1 ?
                    // <View w={Cons.sw1} h={photoHigh}  >
                        <Img
                            h={photoHigh}
                            w={"auto"}
                            rotation={90}
                            resizeMode="contain"
                            source={{
                                uri: Cons.apiServer + photoPath,
                            }}
                            alt={photoPath}
                        />
                    // </View>

                    :
                    <Img
                            h={photoHigh}
                            w={"auto"}
                            resizeMode="contain"
                            source={{
                                uri: Cons.apiServer + photoPath,
                            }}
                            alt={photoPath}
                        />
                }
            </ScrollView>
        }

    </GluestackUIProvider>
}

export default PhotoPage