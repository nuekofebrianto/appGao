import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, StatusBar, Text } from "@gluestack-ui/themed"
import React, { useEffect } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"
import { clearData } from "../../redux/actions/dataAction"
import { useNavigation } from "@react-navigation/native"

const FirstRoute = () => (
    <FirstTab />
);

const SecondRoute = () => (
    <SecondTab />
);

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: Cons.logoColor2 }}
        style={{ backgroundColor: 'white' }}
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color: getTabTextColor(route.key), textAlign: 'center' }}>{route.title}</Text>
        )}

    />
);

const getTabTextColor = (key) => {
    switch (key) {
        case 'first':
            return Cons.textColor;
        case 'second':
            return Cons.logoColor2;
        default:
            return Cons.textColor;
    }
};

const PreventifPage = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Semua' },
        { key: 'second', title: 'Waiting Approval' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(clearData());
        });

        return unsubscribe;
    }, [dispatch])

    return <GluestackUIProvider config={config}>
        <StatusBar backgroundColor={Cons.logoColor2} barStyle="light-content"></StatusBar>

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Cons.sw1 }}
            renderTabBar={renderTabBar}
        />
    </GluestackUIProvider>
}

export default PreventifPage