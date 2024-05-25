import { config } from "@gluestack-ui/config"
import { Button, ButtonGroup, ButtonText, GluestackUIProvider, RefreshControl, ScrollView, StatusBar, Text, View } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { activePageOperation } from "../../redux/actions/globalAction"
import { Cons } from "../../components/Cons"
import NavigationButton from "../../components/NavigationButton"
import LottieView from "lottie-react-native"
import {
    Pressable,
    LinearGradient,
} from "@gluestack-ui/themed"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from "@react-navigation/native"
import { clearData } from "../../redux/actions/dataAction"
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"

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
        dispatch(clearData())
    }, [dispatch])

    return <GluestackUIProvider config = {config}>
        {/* <StatusBar
            backgroundColor = 'transparent'
            barStyle        = "light-content"
            translucent     = {true}
        ></StatusBar> */}

        <StatusBar
            backgroundColor = {Cons.logoColor2}
            barStyle        = "light-content"
        ></StatusBar>

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

                <LinearGradient
                    colors   = {['#e62931', '#e62931', '#e6293190']}
                    style    = {{ flex: 1 }}
                    as       = {RNLinearGradient}
                    position = "absolute"
                    h        = {300}
                    w        = {Cons.sw1}
                      // backgroundColor         = {Cons.logoColor2}
                    borderBottomLeftRadius  = {50}
                    borderBottomRightRadius = {50}
                >
                    <View
                        position        = "absolute"
                        w               = {150}
                        h               = {150}
                        borderRadius    = {150}
                        backgroundColor = "white"
                        opacity         = {0.2}
                        top             = {-60}
                        left            = {-60}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {160}
                        h               = {160}
                        borderRadius    = {180}
                        backgroundColor = "white"
                        opacity         = {0.2}
                        top             = {80}
                        right           = {-40}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {50}
                        h               = {50}
                        borderRadius    = {50}
                        backgroundColor = "white"
                        opacity         = {0.2}
                        top             = {160}
                        left            = {40}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {100}
                        h               = {100}
                        borderRadius    = {100}
                        backgroundColor = "white"
                        opacity         = {0.2}
                        top             = {240}
                        right           = {100}
                    ></View>
                </LinearGradient>

                <View style={{
                    flex          : 1,
                    justifyContent: 'start',
                    alignItems    : 'center',
                    paddingTop    : 80,
                }}>

                    <View
                        backgroundColor = "white"
                        w               = {150}
                        h               = {150}
                        padding         = {0}
                        marginBottom={80}
                        borderRadius    = {100}>
                    </View>
                    <LottieView
                        source = {require('../../assets/lotties/repairLottie.json')}
                        autoPlay
                        loop  = {false}
                        style = {{ width: 350, height: 350, position: 'absolute', top: -20, }} />

                    <Pressable
                        onPress         = {() => { navigation.push('Preventif') }}
                        p               = "$5"
                        w               = {Cons.sw1 - 30}
                        borderColor     = {Cons.textColor}
                        borderWidth     = {0.6}
                        borderRadius    = {10}
                        flexDirection   = "row"
                        justifyContent  = "space-between"
                        alignItems      = "center"
                        marginBottom    = {20}
                        backgroundColor = "white"
                        padding         = {5}
                    >
                        <LottieView
                            source = {require('../../assets/lotties/checklistLottie.json')}
                            autoPlay
                            loop  = {true}
                            style = {{ width: 120, height: 120 }}
                        />
                        <Text            color = {Cons.textColor} fontSize = {20}>Preventif Wisma</Text>
                        <FontAwesomeIcon icon  = "arrow-right" size        = {20} color = "transparent" />
                    </Pressable>

                    <Pressable
                        onPress         = {() => { navigation.push('Preventif') }}
                        p               = "$5"
                        w               = {Cons.sw1 - 30}
                        borderColor     = {Cons.textColor}
                        borderWidth     = {0.6}
                        borderRadius    = {10}
                        flexDirection   = "row"
                        justifyContent  = "space-between"
                        alignItems      = "center"
                        marginBottom    = {20}
                        backgroundColor = "white"
                        padding         = {5}
                    >
                        <LottieView
                            source = {require('../../assets/lotties/cleaningLottie.json')}
                            autoPlay
                            loop  = {true}
                            style = {{ width: 120, height: 120 }}
                        />
                        <Text            color = {Cons.textColor} fontSize = {20}>Ticket Corrective</Text>
                        <FontAwesomeIcon icon  = "arrow-right" size        = {20} color = "transparent" />
                    </Pressable>

                </View>
            </ScrollView>

            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default OperationPage