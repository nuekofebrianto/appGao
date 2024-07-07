import { HStack, Pressable, RefreshControl, ScrollView, Text, VStack, View } from "@gluestack-ui/themed"
import React, { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "../../components/Cons"
import { fetchData } from "../../redux/actions/dataAction"
import { useNavigation } from "@react-navigation/native"

const SecondTab = () => {

    const appGaoUserLogin = useSelector((state) => state.login.getAppGaoUserLogin);
    const { data, loading, endReached, page } = useSelector((state) => state.tiketWaitingApprovalReducer);

    const path = '/api/tiket-wisma/datatable?entries=10&filter_columns=status_tiket&filter_keys=waiting approval&user_mitra_id=' + appGaoUserLogin.user_mitra.id;
    const targetReducer = 'TIKET_WAITING_APPROVAL';

    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const goToDetail = (item) => {
        navigation.navigate('ListTiket', { selectedItem: item });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(fetchData(1, path, targetReducer));

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isNearBottom && !loading && !endReached) {
            dispatch(fetchData(page, path, targetReducer));
        }
    };

    useEffect(() => {
        dispatch(fetchData(1, path, targetReducer));
    }, [dispatch])

    return <ScrollView
        w={Cons.sw1}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Cons.logoColor2, Cons.logoColor2]}
            />
        }
    >

        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center', paddingTop: 10, paddingBottom: 40, }}>
            {data.map((item, index) => (
                <Pressable key={index}
                    onPress={() => {
                        goToDetail(item)
                    }}
                >
                    <VStack style={{
                        borderWidth: 0.5,
                        borderColor: Cons.textColor,
                        borderRadius: 10,
                        width: Cons.sw1 - 20,
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: 'white'
                    }}>
                        <HStack justifyContent='space-between'>
                            <Text style={{ fontSize: 16, fontWeight: 800, }}>{item.nomor}</Text>

                            {item.status_tiket === 'draft' ? (
                                <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>DRAFT</Text>
                                </View>
                            ) : item.status_tiket === 'waiting approval' ? (
                                <View style={{ backgroundColor: Cons.logoColor2, padding: 5, borderRadius: 5, }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>WAITING APPROVAL</Text>
                                </View>
                            ) : item.status_tiket === 'complete' ? (
                                <View style={{ backgroundColor: Cons.positiveColor, padding: 5, borderRadius: 5, }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>COMPLETE</Text>
                                </View>
                            ) : (
                                <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>DRAFT</Text>
                                </View>
                            )}
                        </HStack>
                        <HStack justifyContent='space-between'>
                            <Text>{item.wisma.nama}</Text>
                            <Text style={{fontSize:12 , paddingTop:5,}}>{item.tanggal}</Text>
                        </HStack>

                    </VStack>
                </Pressable>

            ))}
            {loading && <ActivityIndicator size="large" color={Cons.logoColor2} />}
            {endReached && <Text style={{ marginTop: 10 }}>No more data</Text>}
        </View>

    </ScrollView>
}

export default SecondTab