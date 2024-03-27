import { config } from "@gluestack-ui/config"
import {
    Button, ButtonText,
    GluestackUIProvider,
    HStack,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    VStack,
    View,
    Icon,
    MailIcon,
    InfoIcon,
    PhoneIcon,
    EditIcon,

} from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Cons } from "../components/Cons"
import NavigationButton from "../components/NavigationButton"

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
        console.log('profile page : ', appGaoUserLogin.poto_profile_path)
    })

    return <GluestackUIProvider config = {config}>
        <StatusBar
            backgroundColor = 'transparent'
            barStyle        = "light-content"
            translucent={true}
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

                <View
                    position                = "absolute"
                    h                       = {300}
                    w                       = {Cons.sw1}
                    backgroundColor         = {Cons.logoColor2}
                    borderBottomLeftRadius  = {50}
                    borderBottomRightRadius = {50}
                >
                    <View
                        position        = "absolute"
                        w               = {150}
                        h               = {150}
                        borderRadius    = {150}
                        backgroundColor = "white"
                        opacity         = {0.3}
                        top             = {-60}
                        left            = {-60}
                    ></View>
                    <View
                        position        = "absolute"
                        w               = {160}
                        h               = {160}
                        borderRadius    = {180}
                        backgroundColor = "white"
                        opacity         = {0.3}
                        top             = {60}
                        right            = {-40}
                    ></View>
                </View>
            </ScrollView>

            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default ProfilePage