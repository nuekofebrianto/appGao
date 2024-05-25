import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, HStack, StatusBar, Text, VStack, View } from "@gluestack-ui/themed"
import React, { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "../../components/Cons"
import { clearData } from "../../redux/actions/dataAction"

import { ScrollView } from "@gluestack-ui/themed"

const DetailPreventifPage = () => {

    const { data, loading, endReached, page } = useSelector((state) => state.searchReducer);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>
        <ScrollView
            w={Cons.sw1}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEventThrottle={16}

        >
            <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center', paddingTop: 10, paddingBottom: 40 }}>
               <Text>DETAIL PAGE</Text>
            </View>
        </ScrollView>
    </GluestackUIProvider>
}

export default DetailPreventifPage