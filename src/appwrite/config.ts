import config from "@/config/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}

// Instantiate the Appwrite Client
const appwriteClient = new Client();

// Set the appwrite URL and Project
appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);


// Instantiate the Appwrite database aaccount
export const account = new Account(appwriteClient);

export class AppwriteService {
    // Create a new record of user inside appwrite
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error: any) {
            throw error;
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailSession(email, password);
        } catch (error: any) {
            throw error;
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) { }

        return false;
    }

    async getCurrentUser(){
        try {
            return await account.get()
        } catch (error: any) {
            console.log("getCurrentUser: " + error)
        }
    }

    async logout(){
        try {
            return await account.deleteSession("current");
        } catch (error: any) {
            console.log("Logout error: "+error)
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;