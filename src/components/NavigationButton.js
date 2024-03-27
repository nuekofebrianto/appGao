import { View, Text, HStack, Button, VStack, ButtonText } from "@gluestack-ui/themed"
import { Cons } from "./Cons"
import { Icon, CalendarDaysIcon, CopyIcon,CloseIcon } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { StorageService } from "../services/StorageService"
import { useDispatch } from "react-redux"
import { removeAppGaoUserLogin } from "../redux/actions/loginAction"

const NavigationButton = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    return <View style={{
        backgroundColor: Cons.logoColor2,
        position       : "absolute",
        height         : 60,
        width          : Cons.sw1 - 40,
        bottom         : 20,
        borderRadius   : 200,
        padding        : 10,
        alignItems     : 'center',
        alignItems     : 'center',
        justifyContent : 'center',
        shadowColor    : '#000',
        shadowOffset   : {
            width : 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius : 10,
        elevation    : 2,
    }}>
        <HStack style={{
            height         : 60,
            width          : Cons.sw1 - 40,
            top            : 1,
            borderRadius   : 200,
            padding        : 10,
            alignItems     : 'center',
            alignItems     : 'center',
            justifyContent : 'space-around',
            backgroundColor: '#FFF',
            position       : "absolute",
        }}>
            <VStack style={{
                alignItems    : 'center',
                justifyContent: 'space-between',
            }} onTouchStart={() => { navigation.replace('Home') }}>
                <Icon as    = {CopyIcon} size = "lg2" />
                <Text style = {{ fontSize: 10, }}>Home</Text>
            </VStack>

            <VStack style={{
                alignItems: 'center',
            }}onTouchEnd={() => { dispatch(removeAppGaoUserLogin()); }}>
                <Icon as    = {CloseIcon} size = "lg2" />
                <Text style = {{ fontSize: 10, }}>Profile</Text>
            </VStack>

            <VStack style={{
                alignItems    : 'center',
                justifyContent: 'space-between',
            }} onTouchStart={() => { navigation.replace('Profile') }} >
                <Icon as    = {CalendarDaysIcon} size = "lg2" />
                <Text style = {{ fontSize: 10, }}>Profile</Text>
            </VStack>

        </HStack>
    </View>
}

export default NavigationButton