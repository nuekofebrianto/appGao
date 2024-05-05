
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import OperationPage from "./Operations/Index";
import ProfilePage from "./ProfilePage";
import SplashPage from "./SplashPage";

import { useDispatch, useSelector } from 'react-redux';
import { getAppGaoUserLogin } from "../redux/actions/loginAction";

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
                // headerShown   : false,
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
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name="Profile"
                        component={ProfilePage}
                        options={{
                            headerShown: false
                        }}
                    />

                </>
            )
            }
        </Stack.Navigator>
    </NavigationContainer>
}

export default NavigatorPage