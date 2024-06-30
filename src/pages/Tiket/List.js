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

const ListTiketPage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const { selectedItem } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [showActionsheet, setShowActionsheet] = React.useState(false)

    const tiketWismaItems = selectedItem.korektif_wisma;
    const tiketKendaraanItems = selectedItem.korektif_kendaraan;
    const appGaoUserLogin = useSelector((state) => state.login.getAppGaoUserLogin);

    const path = '/api/tiket-wisma/approve?user_mitra_id=' + appGaoUserLogin.user_mitra.id;
    const targetReducer = 'TIKET';

    const handleApprove = () => {
        dispatch(approveData(path, selectedItem.id, targetReducer));
        navigation.goBack();
    }

    const goToDetail = (item) => {
        navigation.navigate('DetailTiket', { selectedItem: item });
    };

    const goToDetailKendaraan = (item) => {
        navigation.navigate('DetailTiketKendaraan', { selectedItem: item });
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleClose = () => setShowActionsheet(!showActionsheet)

    const renderCards = () => {

        return tiketWismaItems.map((item, index) => (
            <Pressable key={index}
                onPress={() => {
                    goToDetail(item)
                }}
            >
                <View style={{
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
                            <Text>{item.nomor}</Text>
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
                    </View>
                    <View style={{ borderColor: Cons.textColor, borderBottomWidth: 0.2, marginBottom: 10 }}>
                        <HStack justifyContent='space-between'>
                            <Text></Text>
                            <Text style={{ fontSize: 12, paddingTop: 5, }}>{selectedItem.tanggal}</Text>
                        </HStack>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <HStack justifyContent="space-between">
                            <Text>Total RAB</Text>
                            <Text style={{ fontWeight: 'bold' }}>{formatNumber(item.total_rab_mitra)}</Text>
                        </HStack>
                    </View>
                </View>
            </Pressable>
        ));

    };

    const renderCardsKendaraan = () => {

        return tiketKendaraanItems.map((item, index) => (
            <Pressable key={index}
                onPress={() => {
                    goToDetailKendaraan(item)
                }}
            >
                <View style={{
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
                            <Text>{item.nomor}</Text>
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
                    </View>
                    <View style={{ borderColor: Cons.textColor, borderBottomWidth: 0.2, marginBottom: 10 }}>
                        <HStack justifyContent='space-between'>
                            <Text></Text>
                            <Text style={{ fontSize: 12, paddingTop: 5, }}>{selectedItem.tanggal}</Text>
                        </HStack>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <HStack justifyContent="space-between">
                            <Text>Bengkel</Text>
                            <Text>{item.bengkel.nama}</Text>
                        </HStack>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <HStack justifyContent="space-between">
                            <Text>Kendaraan</Text>
                            <Text>{item.kendaraan.nama}</Text>
                        </HStack>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <HStack justifyContent="space-between">
                            <Text>No Polisi</Text>
                            <Text>{item.no_polisi}</Text>
                        </HStack>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <HStack justifyContent="space-between">
                            <Text>Total RAB</Text>
                            <Text style={{ fontWeight: 'bold' }}>{formatNumber(item.total_rab)}</Text>
                        </HStack>
                    </View>
                </View>
            </Pressable>
        ));

    };

    useEffect(() => {
        navigation.setOptions({
            title: 'List tiket Wisma ',
            headerRight: () => (
                <View>
                    {selectedItem.status_tiket == 'waiting approval' ?
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                marginLeft: 10,
                                borderRadius: 5,
                            }}
                            onPress={handleClose}
                        >
                            <Text color={Cons.primaryColor}>Approve</Text>
                        </TouchableOpacity>
                        :
                        ''}
                </View>

            ),
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
        <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
            <ActionsheetBackdrop />
            <ActionsheetContent h={150} zIndex={999}>
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <ActionsheetItem onPress={handleApprove} justifyContent="center" marginBottom={20}>
                    <ActionsheetItemText style={{ color: Cons.primaryColor }}>Approve</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose} justifyContent="center">
                    <ActionsheetItemText style={{ color: Cons.logoColor2 }}>Cancel</ActionsheetItemText>
                </ActionsheetItem>
            </ActionsheetContent>
        </Actionsheet>

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
                    <HStack style={{ marginTop: 20, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: 400, }}>
                            Korektif Wisma
                        </Text>
                        <Text>{selectedItem.korektif_wisma.length}</Text>
                    </HStack>
                    <HStack style={{ justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: 400, }}>
                            Korektif Kendaraan
                        </Text>
                        <Text>{selectedItem.korektif_kendaraan.length}</Text>
                    </HStack>
                </VStack>

                {renderCards()}
                {renderCardsKendaraan()}

            </View>
        </ScrollView>

    </GluestackUIProvider>
}

export default ListTiketPage