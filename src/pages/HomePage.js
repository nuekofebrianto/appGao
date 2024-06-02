import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, HStack, RefreshControl, ScrollView, StatusBar, Text, View } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Cons } from "../components/Cons"
import NavigationButton from "../components/NavigationButton"
import { activePageHome } from "../redux/actions/globalAction"
import { sumData } from "../redux/actions/sumAction"
import { useSelector } from "react-redux"
import { ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { PieChart } from "react-native-chart-kit"

const HomePage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { data: dataPreventif, loading: loadingPreventif, dataChart: dataChartPreventif } = useSelector((state) => state.sumPreventifReducer);
    const { data: dataTicket, loading: loadingTicket } = useSelector((state) => state.sumTicketReducer);
    const appGaoUserLogin = useSelector((state) => state.login.getAppGaoUserLogin);

    const path = '/api/dashboard/getsumpreventif?user_mitra_id=' + appGaoUserLogin.user_mitra.id;
    const targetReducer = 'SUM_PREVENTIF';

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
        console.log(dataChartPreventif)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        dispatch(activePageHome())
        dispatch(sumData(path, targetReducer));

        navigation.setOptions({
            headerRight: () => (
                <Text color="white">Periode {formattedDate}</Text>
            ),
        });

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
                        colors={['#9Bd35A', '#689F38']}
                    />
                }
            >
                <View style={{ flex: 1, justifyContent: 'start', alignItems: 'start', padding: 15 }}>

                    <View style={{ borderWidth: 0.5, borderColor: Cons.textColor, padding: 15, backgroundColor: 'white', borderRadius: 5, }}>
                        <Text style={{ fontSize: 20, color: Cons.textColor }}>PREVENTIF</Text>
                        <View style={{ height: Cons.sh4 }}>
                            {dataChartPreventif.length > 0 ?
                                <PieChart
                                    data={dataChartPreventif}
                                    width={Cons.sw2 - 32}
                                    chartConfig={{
                                        backgroundColor: '#ffffff',
                                        backgroundGradientFrom: '#ffffff',
                                        backgroundGradientTo: '#ffffff',
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForLabels: {
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    accessor="population"
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                    absolute
                                >
                                </PieChart>
                                // <Text>Chart</Text>
                                :
                                <ActivityIndicator></ActivityIndicator>
                            }
                        </View>
                        {loadingPreventif ?
                            <ActivityIndicator color={Cons.logoColor2} /> :
                            <HStack justifyContent="space-between">
                                <View>
                                    <Text color={Cons.textColor}>not yet: {dataPreventif ? dataPreventif.notyet : '0'}</Text>
                                </View>
                                <View>
                                    <Text color={Cons.logoColor2}>waiting: {dataPreventif ? dataPreventif.waiting_approval : '0'}</Text>
                                </View>
                                <View>
                                    <Text color={Cons.positiveColor}>complete: {dataPreventif ? dataPreventif.complete : '0'}</Text>
                                </View>
                            </HStack>
                        }

                    </View>

                    <Text>Ticket</Text>
                    {loadingTicket && <ActivityIndicator size="large" color={Cons.logoColor2} />}

                </View>
            </ScrollView>

            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default HomePage