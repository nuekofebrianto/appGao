
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StorageService } from "../services/StorageService";
import { View, Text } from "@gluestack-ui/themed";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import SplashPage from "./SplashPage";
import ProfilePage from "./ProfilePage";

import { useSelector, useDispatch } from 'react-redux';
import { getAppGaoUserLogin } from "../redux/actions/loginAction";

const Stack = createNativeStackNavigator();

const NavigatorPage = ({ }) => {

    const [isLoading, setIsLoading] = useState(true)
    const appGaoUserLogin           = useSelector(state => state.login.getAppGaoUserLogin);
    const dispatch                  = useDispatch();

    StorageService.removeItem('appGaoUserLogin')

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
                headerShown   : false,
                gestureEnabled: true,
            }}
        >
            {appGaoUserLogin == null ? (
                <>

                    <Stack.Screen
                        name      = "SignIn"
                        component = {LoginPage}
                        options   = {{
                            headerShown: false,
                        }}
                    />

                </>
            ) : (
                <>
                    <Stack.Screen
                        name      = "Home"
                        component = {HomePage}
                        options   = {{

                        }}
                    />
                    <Stack.Screen
                        name      = "Profile"
                        component = {ProfilePage}
                        options   = {{

                        }}
                    />
                </>
            )
            }
        </Stack.Navigator>
    </NavigationContainer>
}

export default NavigatorPage