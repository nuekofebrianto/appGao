import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, RefreshControl, ScrollView, StatusBar, View, Text } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "../../components/Cons"
import { dataTablePreventif } from "../../redux/actions/preventifAction"
import CusList from "../../components/CusList"

const PreventifPage = () => {

    const dataTable = useSelector(state => state.preventif.getResult);

    const [refreshing, setRefreshing] = useState(false);
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

        <View style={{
            flex           : 1,
            justifyContent : 'center',
            alignItems     : 'center',
            backgroundColor: "#FFFFFF"
        }}>
            <ScrollView
                w                     = {Cons.sw1}
                contentContainerStyle = {{ flexGrow: 1 }}
                refreshControl        = {
                    <RefreshControl
                        refreshing = {refreshing}
                        onRefresh  = {onRefresh}
                        colors     = {[Cons.logoColor2, '#689F38']}
                    />
                }
            >

                <CusList dataTable = {dataTable.data}></CusList>

            </ScrollView>

        </View>
    </GluestackUIProvider>
}

export default PreventifPage