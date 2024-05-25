import messaging from '@react-native-firebase/messaging';
import { StorageService } from './StorageService';
import { Alert } from "react-native";

const MessagingService = () => {

    const requestUserPermission = async () => {
        const authStatus   = await messaging().requestPermission();
        const enabled      = 
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    const appGaoToken = StorageService.getItem('appGaoToken')

    if (requestUserPermission()) {
        messaging().getToken().then(token => {
            console.log(token)
            if (token != appGaoToken._j) {
                StorageService.setItem('appGaoToken', token)
            }
        })
    } else {
        console.log('gagal')
    }

    messaging().onMessage(async remoteMessage => {
        Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body
        )
    });
}

export default MessagingService