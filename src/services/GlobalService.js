import { StorageService } from "./StorageService";

export const GlobalService = {
    checkUserLogin: async () => {
        try {
            const response = await StorageService.getItemObject('appGaoUserLogin');
            // if (response){
                console.log(response)
            // }
           
        } catch (error) {
            console.log('error get appGaoUserLogin', error);
           
        }
    }
}