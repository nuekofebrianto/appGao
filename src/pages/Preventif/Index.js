import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, Pressable, RefreshControl, ScrollView, StatusBar, Text, View } from "@gluestack-ui/themed"
import LottieView from "lottie-react-native"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import NavigationButton from "../../components/NavigationButton"

const PreventifPage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {

    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#FFFFFF"
        }}>
            <ScrollView
                w={Cons.sw1}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Cons.logoColor2, '#689F38']}
                    />
                }
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'start',
                    alignItems: 'center',
                    padding: 20,
                }}>

                </View>
            </ScrollView>

        </View>
    </GluestackUIProvider>
}

export default PreventifPage