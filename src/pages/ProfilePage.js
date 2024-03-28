import { config } from "@gluestack-ui/config"
import {
    GluestackUIProvider,
    Image,
    LinearGradient,
    RefreshControl,
    ScrollView,
    StatusBar,
    View
} from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import { Cons } from "../components/Cons"
import NavigationButton from "../components/NavigationButton"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

const ProfilePage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const appGaoUserLogin             = useSelector(state => state.login.getAppGaoUserLogin);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        console.log('profile pages : ', appGaoUserLogin.poto_profile_path)
    })

    return <GluestackUIProvider config = {config}>
        <StatusBar
            backgroundColor = 'transparent'
            barStyle        = "light-content"
            translucent     = {true}
        ></StatusBar>

        <View style={{
            flex          : 1,
            justifyContent: 'center',
            alignItems    : 'center',
              // backgroundColor: "#FFFFFF",

        }}>
            <ScrollView
                contentContainerStyle = {{ flexGrow: 1 }}
                w                     = '100%'
                refreshControl        = {
                    <RefreshControl
                        refreshing = {refreshing}
                        onRefresh  = {onRefresh}
                        colors     = {['#9Bd35A', '#689F38']}
                    />
                }
            >
                <LinearGradient
                    colors   = {['#01A4D8', '#0A68AA', '#162C76']}
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
                        opacity         = {0.06}
                        top             = {-60}
                        left            = {-60}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {160}
                        h               = {160}
                        borderRadius    = {180}
                        backgroundColor = "white"
                        opacity         = {0.06}
                        top             = {80}
                        right           = {-40}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {50}
                        h               = {50}
                        borderRadius    = {50}
                        backgroundColor = "white"
                        opacity         = {0.06}
                        top             = {160}
                        left            = {40}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {100}
                        h               = {100}
                        borderRadius    = {100}
                        backgroundColor = "white"
                        opacity         = {0.06}
                        top             = {-30}
                        right           = {100}
                    ></View>
                </LinearGradient>
                <View
                    w            = {105}
                    h            = {105}
                    borderRadius = {100}
                    borderColor  = "white"
                    borderWidth  = {3}
                    top          = {70}
                    alignSelf    = "center"
                >
                    <Image
                        w            = {100}
                        h            = {100}
                        borderRadius = {100}
                        source       = {{
                            uri: appGaoUserLogin.poto_profile_path,
                        }}
                        alt = {appGaoUserLogin.poto_profile_path}

                    />

                    <FontAwesomeIcon
                        icon     = "fa-camera"
                        color    = "white"
                        size     = {20}
                        position = 'absolute'
                        top   = {0}
                        right    = {0}
                    />

                </View>

            </ScrollView>
            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default ProfilePage