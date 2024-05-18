import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, StatusBar, Text, View } from "@gluestack-ui/themed"
import React, { useEffect } from "react"
import { Cons } from "../../components/Cons"
import { dataTablePreventif } from "../../redux/actions/preventifAction"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useSelector } from "react-redux"

const FirstTab = () => {

    const datatable                   = useSelector(state => state.preventif.getResult);
    const [refreshing, setRefreshing] = useState(false);
    const navigation                  = useNavigation();
    const dispatch                    = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(dataTablePreventif())

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        dispatch(dataTablePreventif())
    }, [dispatch])

    return     <GluestackUIProvider config = {config}>
    <StatusBar backgroundColor             = {Cons.logoColor2} barStyle = "light-content"></StatusBar>

        <View>
            <Text>
                TAB 1
            </Text>
        </View>
    </GluestackUIProvider>
}

export default FirstTab