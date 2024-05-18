import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, StatusBar, Text } from "@gluestack-ui/themed"
import React, { useEffect } from "react"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useDispatch } from "react-redux"
import { Cons } from "../../components/Cons"
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"
import ThirdTab from "./ThirdTab"

const FirstRoute = () => (
    <FirstTab />
);

const SecondRoute = () => (
    <SecondTab />
);

const ThirdRoute = () => (
    <ThirdTab />
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
            return Cons.logoColor1;
        case 'second':
            return Cons.positiveColor;
        case 'third':
            return Cons.logoColor2;
        default:
            return Cons.textColor;
    }
};

const PreventifPage = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Semua' },
        { key: 'second', title: 'Complete' },
        { key: 'third', title: 'Waiting Approval' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const dispatch = useDispatch();

    useEffect(() => {
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