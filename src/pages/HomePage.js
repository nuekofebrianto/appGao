import { config } from "@gluestack-ui/config"
import { Divider, GluestackUIProvider, HStack, Pressable, RefreshControl, ScrollView, StatusBar, Text, VStack, View } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Cons } from "../components/Cons"
import NavigationButton from "../components/NavigationButton"
import { activePageHome } from "../redux/actions/globalAction"
import { sumData } from "../redux/actions/sumAction"
import { useSelector } from "react-redux"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { PieChart } from "react-native-chart-kit"
import LottieView from "lottie-react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Colors } from "react-native/Libraries/NewAppScreen"

const HomePage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { data: dataPreventif, loading: loadingPreventif, dataChart: dataChartPreventif } = useSelector((state) => state.sumPreventifReducer);
    const { data: dataTicket, loading: loadingTicket } = useSelector((state) => state.sumTicketReducer);
    const appGaoUserLogin = useSelector((state) => state.login.getAppGaoUserLogin);

    const path = '/api/dashboard/getsumpreventif?user_mitra_id=' + appGaoUserLogin.user_mitra.id;
    const path2 = '/api/dashboard/getsumtiket?user_mitra_id=' + appGaoUserLogin.user_mitra.id;
    const targetReducer = 'SUM_PREVENTIF';
    const targetReducer2 = 'SUM_TICKET';

    const formatMonthYear = (date) => {
        const options = { month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    const now = new Date();
    const formattedDate = formatMonthYear(now);
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const onRefresh = async () => {
        setRefreshing(true);

        dispatch(sumData(path, targetReducer));
        dispatch(sumData(path2, targetReducer2));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        dispatch(activePageHome())
        dispatch(sumData(path, targetReducer));
        dispatch(sumData(path2, targetReducer2));
    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: Cons.logoColor2
        }}>
            <ScrollView
                w={Cons.sw1}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#9Bd35A', '#689F38']}
                    />
                }
            >
                <View w={Cons.sw1} backgroundColor={Cons.logoColor2} h={Cons.sh4} position="absolute"
                    style={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50, }}
                ></View>
                <VStack style={{ flex: 1, justifyContent: 'start', alignItems: 'start', }}>
                    <Text color="white" style={{ height: 80, paddingTop: 20, alignSelf: 'center', fontSize: 20, }}>{
                        appGaoUserLogin.user_mitra.nama
                    }</Text>
                    <HStack justifyContent="space-between" style={{ height: 40, paddingHorizontal: 30, }}>
                        <Text color="white">Periode {formattedDate}</Text>
                        <Text color="white">{dataPreventif ? dataPreventif.all : '0'} wisma</Text>
                    </HStack>

                    <View
                        style={{
                            width: Cons.sw1,
                            alignSelf: "Center",
                            padding: 20,
                        }}
                    >

                        <VStack
                            style={{
                                backgroundColor: "white",
                                // height: Cons.sh4,
                                borderRadius: 20,
                                shadowColor: Cons.logoColor2,
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 10,
                                elevation: 3,
                                paddingTop: 10,
                                paddingBottom: 10,
                                alignItems: 'center',
                            }}
                        >

                            <TouchableOpacity onPress={() => navigation.navigate('Preventif')}>
                                <HStack justifyContent="space-between" w="100%" paddingHorizontal={20}>
                                    <Text style={{ fontSize: 20, color: Cons.textColor, }}>PREVENTIF</Text>
                                    <FontAwesomeIcon icon={"chevron-right"} size={20} />
                                </HStack>
                            </TouchableOpacity>

                            <Divider style={{ marginBottom: 10, marginTop: 10 }}></Divider>

                            <VStack justifyContent="flex-start" w="100%" padding={10}>
                                {loadingPreventif ?
                                    <ActivityIndicator color={Cons.logoColor2} /> :
                                    <VStack justifyContent="space-between">
                                        <HStack>
                                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: Cons.textColor, marginRight: 20, }}></View>
                                            <HStack justifyContent="space-between" width={Cons.sw1-120}>
                                                <Text color={Cons.textColor}>notyet </Text>
                                                <Text color={Cons.textColor}>{dataPreventif ? dataPreventif.notyet : '0'}</Text>
                                            </HStack>
                                        </HStack>
                                        <HStack>
                                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: Cons.logoColor2, marginRight: 20, }}></View>
                                            <HStack justifyContent="space-between" width={Cons.sw1-120}>
                                                <Text color={Cons.logoColor2}>waiting approval </Text>
                                                <Text color={Cons.logoColor2}>{dataPreventif ? dataPreventif.waiting_approval : '0'}</Text>
                                            </HStack>
                                        </HStack>
                                        <HStack>
                                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: Cons.positiveColor, marginRight: 20, }}></View>
                                            <HStack justifyContent="space-between" width={Cons.sw1-120}>
                                                <Text color={Cons.positiveColor}>complete </Text>
                                                <Text color={Cons.positiveColor}>{dataPreventif ? dataPreventif.complete : '0'}</Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                }
                            </VStack>

                        </VStack>
                    </View>

                    <View
                        style={{
                            width: Cons.sw1,
                            alignSelf: "Center",
                            padding: 20,
                        }}
                    >
                        <VStack
                            style={{
                                backgroundColor: "white",
                                // height: Cons.sh4,
                                borderRadius: 20,
                                shadowColor: Cons.logoColor2,
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 10,
                                elevation: 3,
                                paddingTop: 10,
                                paddingBottom: 10,
                                alignItems: 'center',
                            }}
                        >
                            {/* <TouchableOpacity> */}
                            <HStack justifyContent="space-between" w="100%" paddingHorizontal={20}>
                                <Text style={{ fontSize: 20, color: Cons.textColor, }}>TICKET</Text>
                                <FontAwesomeIcon icon={"chevron-right"} size={20} color="white" />
                            </HStack>
                            {/* </TouchableOpacity> */}

                            <Divider style={{ marginBottom: 10, marginTop: 10 }}></Divider>
                            <VStack justifyContent="flex-start" w="100%" padding={10}>
                                {loadingTicket ?
                                    <ActivityIndicator color={Cons.logoColor2} /> :
                                    <VStack justifyContent="space-between">
                                        <HStack>
                                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: Cons.textColor, marginRight: 20, }}></View>
                                            <HStack justifyContent="space-between" width={Cons.sw1-120}>
                                                <Text color={Cons.textColor}>notyet </Text>
                                                <Text color={Cons.textColor}>{dataTicket ? dataTicket.notyet : '0'}</Text>
                                            </HStack>
                                        </HStack>
                                        <HStack>
                                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: Cons.logoColor2, marginRight: 20, }}></View>
                                            <HStack justifyContent="space-between" width={Cons.sw1-120}>
                                                <Text color={Cons.logoColor2}>waiting approval </Text>
                                                <Text color={Cons.logoColor2}>{dataTicket ? dataTicket.waiting_approval : '0'}</Text>
                                            </HStack>
                                        </HStack>
                                        <HStack>
                                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: Cons.positiveColor, marginRight: 20, }}></View>
                                            <HStack justifyContent="space-between" width={Cons.sw1-120}>
                                                <Text color={Cons.positiveColor}>complete </Text>
                                                <Text color={Cons.positiveColor}>{dataTicket ? dataTicket.complete : '0'}</Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                }
                            </VStack>

                        </VStack>
                    </View>

                </VStack>
            </ScrollView >

            <NavigationButton></NavigationButton>
        </View >
    </GluestackUIProvider >
}

export default HomePage