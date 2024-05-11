import { config } from "@gluestack-ui/config"
import { Button, ButtonGroup, ButtonText, GluestackUIProvider, RefreshControl, ScrollView, StatusBar, Text, View } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { activePageOperation } from "../../redux/actions/globalAction"
import { Cons } from "../../components/Cons"
import NavigationButton from "../../components/NavigationButton"
import LottieView from "lottie-react-native"
import { Pressable } from "@gluestack-ui/themed"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from "@react-navigation/native"

const OperationPage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const navigation                  = useNavigation();
    const dispatch                    = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        dispatch(activePageOperation())
    }, [dispatch])

    return     <GluestackUIProvider config = {config}>
    <StatusBar backgroundColor             = {Cons.logoColor2} barStyle = "light-content"></StatusBar>

        <View style={{
            flex           : 1,
            justifyContent : 'center',
            alignItems     : 'center',
            backgroundColor: "#FFFFFF"
        }}>
            <ScrollView
                w                     = {Cons.sw1}
                contentContainerStyle = {{ flexGrow: 1 }}
                refreshControl        = {
                    <RefreshControl
                        refreshing = {refreshing}
                        onRefresh  = {onRefresh}
                        colors     = {['#9Bd35A', '#689F38']}
                    />
                }
            >
                <View style={{
                    flex          : 1,
                    justifyContent: 'start',
                    alignItems    : 'center',
                    padding       : 20,
                }}>

                    <LottieView
                        source = {require('../../assets/lotties/checklistLottie.json')}
                        autoPlay
                        loop  = {false}
                        style = {{ width: 200, height: 200, }}
                    />

                    <Pressable
                        onPress        = {() => { navigation.push('Preventif') }}
                        p              = "$5"
                        w              = {Cons.sw1 - 30}
                        borderColor    = {Cons.textColor}
                        borderWidth    = {0.6}
                        borderRadius   = {10}
                        flexDirection  = "row"
                        justifyContent = "space-between"
                        alignItems     = "center"
                    >
                        <Text            color = {Cons.textColor} fontSize = {20}>List Preventif</Text>
                        <FontAwesomeIcon icon  = "arrow-right" size        = {20} color = "grey" />
                    </Pressable>

                </View>
            </ScrollView>

            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default OperationPage