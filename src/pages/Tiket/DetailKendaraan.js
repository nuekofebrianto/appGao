import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, HStack, Image, ScrollView, StatusBar, Text, VStack, View } from "@gluestack-ui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Pressable, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import { approveData } from "../../redux/actions/dataAction"
import { useSelector } from "react-redux"

import {
    Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText
} from "@gluestack-ui/themed"

const DetailTiketKendaraanPage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const { selectedItem } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [showActionsheet, setShowActionsheet] = React.useState(false)

    const tiketWismaItems = selectedItem.korektif_kendaraan_detail;
    const appGaoUserLogin = useSelector((state) => state.login.getAppGaoUserLogin);

    const path = '/api/tiket-wisma/approve?user_mitra_id=' + appGaoUserLogin.user_mitra.id;
    const targetReducer = 'TIKET';

    const goToDetail = (item) => {
        navigation.navigate('DetailTiket', { selectedItem: item });
    };

    const formatNumber = (num) => {
        num = num.toString().replace('.0000', '')
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleClose = () => setShowActionsheet(!showActionsheet)

    const renderCards = () => {

        return tiketWismaItems.map((item, index) => (

            <View key={index} style={{
                width: Cons.sw1 - 20,
                padding: 20,
                borderWidth: 0.2,
                borderColor: Cons.textColor,
                borderRadius: 5,
                backgroundColor: 'white',
                marginTop: 10,
            }}>

                <View style={{ marginBottom: 10 }}>
                    <HStack justifyContent="space-between">
                        <Text w={Cons.sw2}>{item.item_kendaraan.nama}</Text>
                        <Text style={{ fontSize: 14 }}>{formatNumber(item.qty)} x {formatNumber(item.harga_rab)}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text style={{ fontSize: 12 }} w={Cons.sw2}>{item.item_kendaraan.item_kendaraan_tipe.nama}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{formatNumber(item.total_rab)}</Text>
                    </HStack>
                </View>
            </View>
        ));

    };

    useEffect(() => {
        navigation.setOptions({
            title: 'Detail tiket Wisma ',
        });

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [dispatch])

    if (isLoading) {
        return (
            <View h={Cons.sh1} w={Cons.sw1} justifyContent="center" alignContent="center">
                <ActivityIndicator size="large" color={Cons.logoColor2} />
            </View>
        );
    }

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>

        <ScrollView
            w={Cons.sw1}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEventThrottle={16}

        >
            <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center', paddingTop: 10, paddingBottom: 40 }}>
                <VStack style={{
                    width: Cons.sw1 - 20,
                    padding: 20,
                    borderWidth: 0.2,
                    borderColor: Cons.textColor,
                    borderRadius: 5,
                    backgroundColor: 'white',
                }}>
                    <HStack justifyContent='space-between'>
                        <Text style={{ fontSize: 16, fontWeight: 800, }}>{selectedItem.nomor}</Text>
                        {selectedItem.status_tiket === 'draft' ? (
                            <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>DRAFT</Text>
                            </View>
                        ) : selectedItem.status_tiket === 'waiting approval' ? (
                            <View style={{ backgroundColor: Cons.logoColor2, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>WAITING APPROVAL</Text>
                            </View>
                        ) : selectedItem.status_tiket === 'complete' ? (
                            <View style={{ backgroundColor: Cons.positiveColor, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>COMPLETE</Text>
                            </View>
                        ) : (
                            <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>DRAFT</Text>
                            </View>
                        )}
                    </HStack>
                    <HStack justifyContent='space-between' style={{ borderColor: Cons.textColor, borderBottomWidth: 0.2, }}>
                        <Text>{selectedItem.wisma.nama}</Text>
                        <Text style={{ fontSize: 12, paddingTop: 5, }}>{selectedItem.tanggal}</Text>
                    </HStack>

                    <HStack justifyContent='space-between' style={{ marginTop: 10 }}>
                        <Text>Total RAB</Text>
                        <Text style={{ fontWeight: 'bold', paddingTop: 5, }}>{formatNumber(selectedItem.total_rab)}</Text>
                    </HStack>

                </VStack>

                {renderCards()}

                <View style={{
                    width: Cons.sw1 - 20,
                    padding: 20,
                    borderWidth: 0.2,
                    borderColor: Cons.textColor,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    marginTop: 10,
                    overflow: 'hidden',
                }}>
                    <View style={{ borderColor: Cons.textColor, borderBottomWidth: 0.2, marginBottom: 10 }}>
                        <Text>UPLOADED PHOTO BEFORE</Text>
                    </View>

                    <ScrollView w={Cons.sw1 - 60}
                        contentContainerStyle={{ flexGrow: 1 }}
                        scrollEventThrottle={16}
                        horizontal={true}
                    >

                        {selectedItem.path_before.map((item, index) => (
                            <Pressable key={index} onPress={() => navigation.navigate('Photo', { photoPath: item })}>
                                <Image
                                    backgroundColor="red"
                                    w={40}
                                    h={40}
                                    marginRight={5}
                                    borderRadius={5}
                                    borderWidth={0.5}
                                    borderColor={Cons.logoColor2}
                                    source={{
                                        uri: Cons.apiServer + item,
                                    }}
                                    alt={item}
                                />
                            </Pressable>

                        ))}

                    </ScrollView>
                </View>

                <View style={{
                    width: Cons.sw1 - 20,
                    padding: 20,
                    borderWidth: 0.2,
                    borderColor: Cons.textColor,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    marginTop: 10,
                    overflow: 'hidden',
                }}>
                    <View style={{ borderColor: Cons.textColor, borderBottomWidth: 0.2, marginBottom: 10 }}>
                        <Text>UPLOADED PHOTO AFTER</Text>
                    </View>

                    <ScrollView w={Cons.sw1 - 60}
                        contentContainerStyle={{ flexGrow: 1 }}
                        scrollEventThrottle={16}
                        horizontal={true}
                    >

                        {selectedItem.path_after.map((item, index) => (
                            <Pressable key={index} onPress={() => navigation.navigate('Photo', { photoPath: item })}>
                                <Image
                                    backgroundColor="red"
                                    w={40}
                                    h={40}
                                    marginRight={5}
                                    borderRadius={5}
                                    borderWidth={0.5}
                                    borderColor={Cons.logoColor2}
                                    source={{
                                        uri: Cons.apiServer + item,
                                    }}
                                    alt={item}
                                />
                            </Pressable>

                        ))}

                    </ScrollView>
                </View>

            </View>
        </ScrollView>

    </GluestackUIProvider>
}

export default DetailTiketKendaraanPage