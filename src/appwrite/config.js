import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query  } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Appwrite Service :: createPost ::", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Appwrite Service :: updatePost ::", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost ::", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug
            );
        } catch (error) {
            console.error("Appwrite Service :: getPost ::", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                queries
            );
        } catch (error) {
            console.error("Appwrite Service :: getPosts ::", error);
            return null;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketid,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite Service :: uploadFile ::", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketid,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile ::", error);
            return false;
        }
    }

    getFilepreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketid,
                fileId
            );
        } catch (error) {
            console.error("Appwrite Service :: getFilepreview ::", error);
            return "";
        }
    }
}
const service = new Service();
export default service;
