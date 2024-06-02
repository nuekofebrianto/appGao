import { HStack, Text, VStack, View } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Cons } from "./Cons"

import { SvgXml } from "react-native-svg"
import { tablerIcon } from "./CusIcon"

const NavigationButton = () => {

    const navigation = useNavigation();
    const dispatch   = useDispatch();

    const activePage = useSelector(state => state.global.getActivePage);

    useEffect(() => {
        console.log('navigation : ', activePage)
    }, [dispatch])

    return <View style={{
          // backgroundColor: Cons.logoColor2,
        position      : "absolute",
        height        : 70,
        width         : Cons.sw1 - 40,
        bottom        : 20,
        borderRadius  : 200,
        padding       : 10,
        alignItems    : 'center',
        alignItems    : 'center',
        justifyContent: 'center',
        shadowColor   : Cons.logoColor2,
        shadowOffset  : {
            width : 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius : 10,
        elevation    : 3,
    }}>
        <HStack style={{
            height         : 67,
            width          : Cons.sw1 - 42,
            top            : 5,
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
                {activePage == 'HOME' ? (
                    <>
                        <SvgXml xml   = {tablerIcon.homeACtive} />
                        <Text   style = {{ fontSize: 12, color: Cons.logoColor2 }}>Home</Text>
                    </>
                ) : (
                    <>
                        <SvgXml xml   = {tablerIcon.home} />
                        <Text   style = {{ fontSize: 12 }}>Home</Text>
                    </>
                )}
            </VStack>

            {/* <VStack style={{
                alignItems: 'center',
            }}
                onTouchStart = {() => { navigation.replace('Operation') }}
            >
                {activePage == 'OPERATION' ? (
                    <>
                        <SvgXml xml   = {tablerIcon.prefentivActive} />
                        <Text   style = {{ fontSize: 12, color: Cons.logoColor2 }}>Operation</Text>
                    </>
                ) : (
                    <>
                        <SvgXml xml   = {tablerIcon.preventif} />
                        <Text   style = {{ fontSize: 12 }}>Operation</Text>
                    </>
                )}
            </VStack> */}

            <VStack style={{
                alignItems    : 'center',
                justifyContent: 'space-between',
            }} onTouchStart={() => { navigation.replace('Profile') }} >
                {activePage == 'PROFILE' ? (
                    <>
                        <SvgXml xml   = {tablerIcon.userActive} />
                        <Text   style = {{ fontSize: 12, color: Cons.logoColor2 }}>Profile</Text>
                    </>
                ) : (
                    <>
                        <SvgXml xml   = {tablerIcon.user} />
                        <Text   style = {{ fontSize: 12 }}>Profile</Text>
                    </>
                )}
            </VStack>

        </HStack>
    </View>
}

export default NavigationButton