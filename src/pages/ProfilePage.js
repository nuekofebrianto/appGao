import { config } from "@gluestack-ui/config"
import {
    GluestackUIProvider,
    HStack,
    Image,
    LinearGradient,
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    VStack,
    View
} from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "../components/Cons"
import NavigationButton from "../components/NavigationButton"
import { activePageProfile } from "../redux/actions/globalAction"
import { Button, ButtonText } from "@gluestack-ui/themed"
import { removeAppGaoUserLogin } from "../redux/actions/loginAction"
import { useNavigation } from "@react-navigation/native"
import { StorageService } from "../services/StorageService"
import { Alert } from "react-native"
import axios from "axios";

const ProfilePage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const appGaoUserLogin = useSelector(state => state.login.getAppGaoUserLogin);
    const appGaoToken = StorageService.getItem('appGaoToken')
    const activePage = useSelector(state => state.global.getActivePage);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const onPressLogout = () => {
        try {
            axios.post(
                Cons.apiServer + '/api/sign-out-gao',
                {
                    device_token: appGaoToken._j,
                }
            )
                .then((res) => {
                    dispatch(removeAppGaoUserLogin())
                })
                .catch((error) => {
                    Alert.alert('Failed', 'Error Logout1 !'); 
                })

        } catch (error) {
            Alert.alert('Failed', 'Error Logout2 !'); 

        }

    }

    useEffect(() => {
        dispatch(activePageProfile())
    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar
            backgroundColor='transparent'
            barStyle="light-content"
            translucent={true}
        ></StatusBar>

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#FFFFFF",
        }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                w='100%'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Cons.logoColor2, '#689F38']}
                    />
                }
            >

                <LinearGradient
                    colors={['#e6293190', '#e62931', '#e62931']}
                    style={{ flex: 1 }}
                    as={RNLinearGradient}
                    position="absolute"
                    h={300}
                    w={Cons.sw1}
                    // backgroundColor         = {Cons.logoColor2}
                    borderBottomLeftRadius={50}
                    borderBottomRightRadius={50}
                >
                    <View
                        position="absolute"
                        w={150}
                        h={150}
                        borderRadius={150}
                        backgroundColor="white"
                        opacity={0.2}
                        top={-60}
                        left={-60}
                    ></View>
                    <View
                        position="absolute"
                        w={160}
                        h={160}
                        borderRadius={180}
                        backgroundColor="white"
                        opacity={0.2}
                        top={80}
                        right={-40}
                    ></View>
                    <View
                        position="absolute"
                        w={50}
                        h={50}
                        borderRadius={50}
                        backgroundColor="white"
                        opacity={0.2}
                        top={160}
                        left={40}
                    ></View>
                    <View
                        position="absolute"
                        w={100}
                        h={100}
                        borderRadius={100}
                        backgroundColor="white"
                        opacity={0.2}
                        top={-30}
                        right={100}
                    ></View>
                </LinearGradient>
                <View
                    w={105}
                    h={105}
                    borderRadius={100}
                    borderColor="white"
                    borderWidth={3}
                    top={70}
                    alignSelf="center"
                >

                    {appGaoUserLogin.poto_profile_path ?
                        <Image
                            w={100}
                            h={100}
                            borderRadius={100}
                            source={{
                                uri: appGaoUserLogin.poto_profile_path,
                            }}
                            alt="photo profile"

                        />
                        :
                        <Text></Text>
                    }

                    {/* <FontAwesomeIcon
                        icon     = "fa-camera"
                        color    = "white"
                        size     = {20}
                        position = 'absolute'
                        top      = {0}
                        right    = {0}
                    /> */}

                </View>

                <Text style={{
                    top: 90,
                    fontSize: 20,
                    color: 'white',
                    alignSelf: 'center',
                }}>
                    {appGaoUserLogin.user_mitra?.nama}
                </Text>

                <View
                    style={{
                        height: Cons.sh1,
                        width: Cons.sw1,
                        top: 120,
                        alignSelf: "Center",
                        padding: 20,
                    }}
                >
                    <VStack
                        style={{
                            backgroundColor: "white",
                            height: Cons.sh2,
                            borderRadius: 20,
                            shadowColor: Cons.logoColor2,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 10,
                            elevation: 3,
                            paddingTop: 20,
                            alignItems: 'center',
                        }}
                    >

                        <HStack style={{
                            padding: 10,
                            width: '100%',
                            alignContent: "flex-start",
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                        }}>
                            <Text w={100}>Nik</Text>
                            <Text>{appGaoUserLogin.user_mitra?.nik}</Text>
                        </HStack>
                        <HStack style={{
                            padding: 10,
                            width: '100%',
                            alignContent: "flex-start",
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                        }}>
                            <Text w={100}>Username</Text>
                            <Text>{appGaoUserLogin.username}</Text>
                        </HStack>
                        <HStack style={{
                            padding: 10,
                            width: '100%',
                            alignContent: "flex-start",
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                        }}>
                            <Text w={100}>Email</Text>
                            <Text>{appGaoUserLogin.email}</Text>
                        </HStack>

                        <HStack style={{
                            padding: 10,
                            width: '100%',
                            alignContent: "flex-start",
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                        }}>
                            <Text w={100}>No Hp</Text>
                            <Text w={Cons.sw2}>{appGaoUserLogin.user_mitra?.nohp}</Text>
                        </HStack>

                        <HStack style={{
                            padding: 10,
                            width: '100%',
                            alignContent: "flex-start",
                        }}>
                            <Text w={100}>Address</Text>
                            <Text w={Cons.sw2}>{appGaoUserLogin.user_mitra?.alamat}</Text>
                        </HStack>

                        <Button
                            position="absolute"
                            bottom={20}
                            backgroundColor={Cons.logoColor2}
                            onPress={onPressLogout}>
                            <ButtonText>Logout</ButtonText>
                        </Button>
                    </VStack>
                </View>

            </ScrollView>
            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider >
}

export default ProfilePage