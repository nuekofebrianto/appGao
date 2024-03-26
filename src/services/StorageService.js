import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageService = {

    setItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log('error store', key)
        }
    },

    storeItemObject: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log('error store object', key)
        }
    },

    getItem: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value
            } else {
                return null
            }
        } catch (e) {
            console.log('error get ', key)
        }
    },

    getItemObject: async (key) => {
        try {
            const  jsonValue  = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
              // error reading value
        }
    },

    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            console.log('error remove ', key)
        }
    }
}