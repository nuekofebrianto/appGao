
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import OperationPage from "./Operations/Index";
import PreventifPage from "./Preventif/Index";
import ProfilePage from "./ProfilePage";
import SplashPage from "./SplashPage";
import SearchPreventifPage from "./Preventif/Search";
import DetailPreventifPage from "./Preventif/Detail";

import { Text } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { Cons } from "../components/Cons";
import { getAppGaoUserLogin } from "../redux/actions/loginAction";
import { TouchableOpacity } from "react-native";
import CusHeader from "../components/CusHeader";

const Stack = createNativeStackNavigator();

const NavigatorPage = ({ }) => {

    const [isLoading, setIsLoading] = useState(true)
    const appGaoUserLogin = useSelector(state => state.login.getAppGaoUserLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppGaoUserLogin());
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    if (isLoading) {
        return <SplashPage></SplashPage>
    }

    return <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
            }}
        >
            {appGaoUserLogin == null ? (
                <>

                    <Stack.Screen
                        name="SignIn"
                        component={LoginPage}
                        options={{
                            headerShown: false,
                        }}
                    />

                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomePage}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Operation"
                        component={OperationPage}
                        options={{
                            title: 'Operation',
                            headerStyle: {
                                backgroundColor: Cons.logoColor2,
                            },
                            headerTitleStyle: {
                                color: 'white'
                            },
                            headerBackButtonMenuEnabled: true,
                            headerTintColor: 'white',
                        }}
                    />

                    <Stack.Screen
                        name="Profile"
                        component={ProfilePage}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name="SearchPreventif"
                        component={SearchPreventifPage}
                        options={({ navigation }) => ({
                            title: null,
                            headerStyle: {
                                backgroundColor: Cons.logoColor2,
                            },
                            headerTitleStyle: {
                                color: 'white'
                            },
                            headerBackButtonMenuEnabled: true,
                            headerTintColor: 'white',
                            headerTitle: () => <CusHeader endPoint={'preventif-wisma/datatable-gao?user_mitra_id=' + appGaoUserLogin.user_mitra.id} />
                        })}
                    />

                    <Stack.Screen
                        name="DetailPreventif"
                        component={DetailPreventifPage}
                        options={({ navigation }) => ({
                            title: null,
                            headerStyle: {
                                backgroundColor: Cons.logoColor2,
                            },
                            headerTitleStyle: {
                                color: 'white'
                            },
                            headerBackButtonMenuEnabled: true,
                            headerTintColor: 'white',

                        })}
                    />

                    <Stack.Screen
                        name="Preventif"
                        component={PreventifPage}
                        options={({ navigation }) => ({
                            headerStyle: {
                                backgroundColor: Cons.logoColor2,
                            },
                            headerTitleStyle: {
                                color: 'white'
                            },
                            headerBackButtonMenuEnabled: true,

                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('SearchPreventif') }}
                                >
                                    <Text color="white">Cari</Text>
                                </TouchableOpacity>
                            ),
                            headerTintColor: 'white',
                        })}

                    />

                </>
            )
            }
        </Stack.Navigator>
    </NavigationContainer>
}

export default NavigatorPage