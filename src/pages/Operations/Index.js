import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, RefreshControl, ScrollView, StatusBar, View } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { activePageOperation } from "../../redux/actions/globalAction"
import { Cons } from "../../components/Cons"
import NavigationButton from "../../components/NavigationButton"
import { Text } from "react-native-svg"

const OperationPage = () => {

    const [refreshing, setRefreshing] = useState(false);
    const dispatch                    = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        dispatch(activePageOperation())
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
                        colors     = {['#9Bd35A', '#689F38']}
                    />
                }
            >
                <View style = {{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
                   <Text>HELLOW</Text>
                </View>
            </ScrollView>

            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default OperationPage