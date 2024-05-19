import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, RefreshControl, ScrollView, StatusBar, Text, View } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "../../components/Cons"
import { dataTablePreventif } from "../../redux/actions/preventifAction"
import CusList from "../../components/CusList"
import { fetchData, clearData } from "../../redux/actions/dataAction"
import { ActivityIndicator } from "react-native"
import { VStack, HStack } from "@gluestack-ui/themed"

const FirstTab = () => {

    // const datatable = useSelector(state => state.preventif.getResult);
    const { data, loading, error, endReached, page } = useSelector((state) => state.dataReducer);

    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    const onRefresh = async ()  =>  {
        setRefreshing(true);
        // dispatch(dataTablePreventif())
        dispatch(fetchData(1));
        
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isNearBottom && !loading && !endReached) {
            dispatch(fetchData(page));
        }
    };

    useEffect(() => {
        // dispatch(dataTablePreventif())
        dispatch(fetchData(1));
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
        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center', paddingTop: 10, paddingBottom: 40 }}>
            {data.map((item, index) => (
                <VStack key={index} style={{
                    borderWidth: 0.5,
                    borderColor: Cons.textColor,
                    borderRadius: 10,
                    width: Cons.sw1 - 20,
                    padding: 10,
                    marginBottom: 10,
                }}>
                    <HStack justifyContent='space-between'>
                        <Text style={{ fontSize: 16, fontWeight: 800, }}>{item.nomor}</Text>
                        {item.status_tike === 'DRAFT' ? (
                            <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>DRAFT</Text>
                            </View>
                        ) : item.status_tiket === 'WAITING_APPROVAL' ? (
                            <View style={{ backgroundColor: Cons.logoColor2, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>WAITING APPROVAL</Text>
                            </View>
                        ) : item.status_tiket === 'COMPLETE' ? (
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
                        <Text>{item.tanggal}</Text>
                    </HStack>

                </VStack>

            ))}
            {loading && <ActivityIndicator size="large" color={Cons.logoColor2} />}
            {endReached && <Text style={{ marginTop: 10 }}>No more data</Text>}
        </View>
    </ScrollView>
}

export default FirstTab