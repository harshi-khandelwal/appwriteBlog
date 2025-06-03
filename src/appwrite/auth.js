import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite"

export class Authservice {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid);
            this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
       try {
           const userAccount =  await this.account.create(ID.unique(), email, password, name);
           if(userAccount){
            return this.login({email, password});
           }else{
            return userAccount;
           }
       } catch (error) {
    console.log("appwrite service :: createAccount :: error" , error);
;
       }
    }

    async login({email, password}){
        try {
            await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
        console.log("appwrite service :: Login :: error" , error);
;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: getCurrentUser :: error" , error);
        }
        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout is not possible" , error)
        }
    }
}

const authservice = new Authservice();

export default authservice

