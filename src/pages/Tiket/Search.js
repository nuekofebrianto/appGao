import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, HStack, StatusBar, Text, VStack, View,Pressable } from "@gluestack-ui/themed"
import React, { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "../../components/Cons"
import { clearData } from "../../redux/actions/dataAction"

import { ScrollView } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"

const SearchTiketPage = () => {

    const { data, loading, endReached, page } = useSelector((state) => state.searchReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const goToDetail = (item) => {
        navigation.navigate('DetailTiket', { selectedItem: item });
    };

    useEffect(() => {
        dispatch(clearData('SEARCH'));
    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>
        <ScrollView
            w={Cons.sw1}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEventThrottle={16}

        >
            <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center', paddingTop: 10, paddingBottom: 40 }}>
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
    </GluestackUIProvider>
}

export default SearchTiketPage