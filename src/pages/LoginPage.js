import { config } from "@gluestack-ui/config";
import { Button, ButtonText, GluestackUIProvider, KeyboardAvoidingView } from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, Alert, StatusBar, Text, View } from "react-native";
import { Cons } from "../components/Cons";
import CusFormControl from "../components/CusFormControl";

import axios from "axios";
import { useState } from "react";
import { StorageService } from "../services/StorageService";
import { getAppGaoUserLogin } from "../redux/actions/loginAction";
import {  useDispatch } from "react-redux";

const LoginPage = ({ navigation }) => {

    const [username, setUsername]     = useState('')
    const [password, setPassword]     = useState('')
    const [isSpinning, setIsSpinning] = useState(false)
    const dispatch = useDispatch();

    const onPressLogin = () => {
        setIsSpinning(true)

        axios.post(
            Cons.apiServer + '/api/sign-in-gao',
            {
                username: username,
                password: password
            }
        )
            .then(response => {
                StorageService.storeItemObject('appGaoUserLogin', response.data)
                console.log('success login')
                dispatch(getAppGaoUserLogin())
                setIsSpinning(false)
            }).catch(error => {
                console.log(error.response.data.message)
                Alert.alert('Failed',error.response.data.message);
                setIsSpinning(false)
            })
            // .finally(() => {
            //     setIsSpinning(false)
            // })

    }

    return <GluestackUIProvider config = {config}>
    <View  style                       = {{
            flex           : 1,
            backgroundColor: "white",
            width          : Cons.sw1,
            height         : Cons.sh1,
            padding        : 10,
            paddingTop     : Cons.sh3,
            alignContent   : "center",
            alignItems     : "center"
        }}>
            <StatusBar backgroundColor = {Cons.logoColor2} barStyle = "light-content"></StatusBar>

            <LottieView
                source = {require('../assets/lotties/dtuLottie.json')}
                autoPlay
                loop  = {false}
                style = {{ width: 200, height: 200, position: "absolute", top: 50, }}
            />

            <KeyboardAvoidingView
                behavior = "position">

                <View style = {{ width: Cons.sw1, padding: 20, backgroundColor: "white" }}>
                <Text style = {{
                        fontSize    : 30,
                        marginBottom: 30,
                        alignSelf   : 'center',
                        color       : 'black'
                    }}>Dapensi Trio Usaha</Text>

                    <Text style = {{ fontSize: 20, color: "black", fontFamily: "sigmar", marginBottom: 10 }}>Login to Your Account</Text>

                    <CusFormControl
                        placeholder  = {"Username atau Email"}
                        w            = "100%"
                        value        = {username}
                        onChangeText = {setUsername}

                    ></CusFormControl>
                    <CusFormControl
                        placeholder  = {"Password"}
                        w            = "100%"
                        type         = {"password"}
                        onChangeText = {setPassword}
                        value        = {password}
                    ></CusFormControl>

                    <Button
                        backgroundColor = {Cons.logoColor2}
                        marginTop       = {20}
                        onPress         = {onPressLogin}
                    >
                        <ButtonText>{isSpinning ? <ActivityIndicator color={"white"} /> : 'Masuk'}</ButtonText>
                    </Button>

                </View>
            </KeyboardAvoidingView>

        </View>
    </GluestackUIProvider>

}

export default LoginPage