import { useState } from "react"
import { config } from "@gluestack-ui/config"
import { View, Text, GluestackUIProvider, StatusBar } from "@gluestack-ui/themed"
import { Cons } from "../components/Cons"
import { ScrollView, RefreshControl } from "@gluestack-ui/themed"
import NavigationButton from "../components/NavigationButton"

const HomePage = () => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

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
                    <Text>Pull down to refresh</Text>
                </View>
            </ScrollView>

            <NavigationButton></NavigationButton>
        </View>
    </GluestackUIProvider>
}

export default HomePage