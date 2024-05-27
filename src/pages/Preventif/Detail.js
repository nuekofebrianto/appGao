import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, HStack, ScrollView, StatusBar, Text, VStack, View } from "@gluestack-ui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import { approveData } from "../../redux/actions/dataAction"
import { useSelector } from "react-redux"

import {
    Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText
} from "@gluestack-ui/themed"

const DetailPreventifPage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const { selectedItem } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [showActionsheet, setShowActionsheet] = React.useState(false)

    const preventifWismaItems = selectedItem.preventif_wisma_item;
    const appGaoUserLogin = useSelector((state) => state.login.getAppGaoUserLogin);

    const path = '/api/preventif-wisma/approve?user_mitra_id='+appGaoUserLogin.user_mitra.id;
    const targetReducer = 'PREVENTIF';

    const handleApprove = () => {
        dispatch(approveData(path, selectedItem.id, targetReducer));
        navigation.goBack();
    }

    const handleClose = () => setShowActionsheet(!showActionsheet)

    const renderCards = () => {
        let groups = {};
        preventifWismaItems.forEach((item) => {
            if (!groups[item.checklist.checklist_grup.nama]) {
                groups[item.checklist.checklist_grup.nama] = [];
            }
            groups[item.checklist.checklist_grup.nama].push(item);
        });

        return Object.keys(groups).map((groupId) => (
            <View key={groupId} style={{
                width: Cons.sw1 - 20,
                padding: 20,
                borderWidth: 0.2,
                borderColor: Cons.textColor,
                borderRadius: 5,
                backgroundColor: 'white',
                marginTop: 10,
            }}>
                <View style={{ borderColor: Cons.textColor, borderBottomWidth: 0.2, marginBottom: 10 }}>
                    <Text>{groupId}</Text>
                </View>
                {groups[groupId].map((item, index) => (
                    <VStack key={index}>
                        <HStack style={{ justifyContent: 'space-between' }}>
                            <HStack style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ width: 20 }}>{index + 1}</Text>
                                <Text style={{ maxWidth: Cons.sw2 }}>{item.checklist.nama}</Text>
                            </HStack>
                            {item.kondisi === 'baik' ? (
                                <Text style={{ color: Cons.primaryColor, fontSize: 20, }}>
                                    <FontAwesomeIcon icon={"check"} size={20} color={Cons.primaryColor} />
                                </Text>
                            ) : item.kondisi === 'tidak baik' ? (
                                <Text style={{ color: Cons.logoColor2 }}>
                                    <FontAwesomeIcon icon={"times"} size={20} color={Cons.logoColor2} />
                                </Text>
                            ) : (
                                <Text style={{ paddingLeft: 20 }}>
                                    <FontAwesomeIcon icon={"minus"} size={20} color={Cons.textColor} />
                                </Text>
                            )}
                        </HStack>
                        {/* <Divider my="$0.5" /> */}
                    </VStack>

                ))}
            </View>
        ));
    };

    useEffect(() => {
        navigation.setOptions({
            title: 'Detail Preventif Wisma ',
            headerRight: () => (
                <View>
                    {selectedItem.status_tiket == 'WAITING_APPROVAL' ?
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
                        {selectedItem.status_tiket === 'DRAFT' ? (
                            <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>DRAFT</Text>
                            </View>
                        ) : selectedItem.status_tiket === 'WAITING_APPROVAL' ? (
                            <View style={{ backgroundColor: Cons.logoColor2, padding: 5, borderRadius: 5, }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>WAITING APPROVAL</Text>
                            </View>
                        ) : selectedItem.status_tiket === 'COMPLETE' ? (
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
                        <Text>{selectedItem.wisma.nama}</Text>
                        <Text>{selectedItem.tanggal}</Text>
                    </HStack>
                    <HStack>
                        <Text style={{ fontSize: 12, fontWeight: 400, }}>
                            {selectedItem.user_sso.nama}
                        </Text>
                    </HStack>
                </VStack>

                {renderCards()}

            </View>
        </ScrollView>

    </GluestackUIProvider>
}

export default DetailPreventifPage