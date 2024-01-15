import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupCreate(newGroup: string){
    try{
        const storedGroups = await groupsGetAll();

        const groupAlreadyExist = storedGroups.includes(newGroup)

        if(groupAlreadyExist){
            throw new AppError('Já existe um grupo com esse nome')
        }
        const storage = JSON.stringify([...storedGroups, newGroup])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    } catch (error){
        throw error;
    }
}