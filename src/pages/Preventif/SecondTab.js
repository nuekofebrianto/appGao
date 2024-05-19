import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, StatusBar, Text, View } from "@gluestack-ui/themed"
import React, { useEffect } from "react"
import { Cons } from "../../components/Cons"
import { dataTablePreventif } from "../../redux/actions/preventifAction"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { ScrollView, RefreshControl } from "@gluestack-ui/themed"
import { dataTablePreventifWaitingApproval } from "../../redux/actions/preventifAction"
import { useSelector } from "react-redux"
import CusListWaitingApproval from "../../components/CusListWaitingApproval"

const SecondTab = () => {

    const datatableWaitingApproval = useSelector(state => state.preventifWaitingApproval.getResult);
    const datatable = useSelector(state => state.preventif.getResult);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);
        // dispatch(dataTablePreventifWaitingApproval())

        console.log('log2 ',datatableWaitingApproval.data.length)

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        dispatch(dataTablePreventifWaitingApproval())
    }, [dispatch])

    return <ScrollView
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
        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
            <CusListWaitingApproval dataTable={datatableWaitingApproval.data} />
        </View>
    </ScrollView>
}

export default SecondTab