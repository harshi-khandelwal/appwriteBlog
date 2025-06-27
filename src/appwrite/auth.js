import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid); 
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount error:", error.message);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login error:", error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser error:", error.message);
            return null;
        }
    }

    async logOut() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout error:", error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
