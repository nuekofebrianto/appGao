import { RefreshControl, ScrollView, Text, View } from "@gluestack-ui/themed"
import { useState } from "react"

const NavigationHeader = () => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return <View>

        <ScrollView
            contentContainerStyle = {{ flexGrow: 1 }}
            refreshControl        = {
                <RefreshControl
                    refreshing = {refreshing}
                    onRefresh  = {onRefresh}
                    colors     = {['#9Bd35A', '#689F38']}
                />
            }
        >
            <Text>ASD</Text>
        </ScrollView>
    </View>
}

export default NavigationHeader