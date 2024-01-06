import conf from "../conf/conf";
import { Client, Databases, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.endpoint).setProject(conf.project);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createMovie({
    title,
    date,
    duration,
    restriction,
    detail,
    previewImage,
    previewVideo,
    slug,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          date,
          duration,
          restriction,
          detail,
          previewImage,
          previewVideo,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateMovie(
    slug,
    { title, date, duration, restriction, detail, previewImage, previewVideo }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          date,
          duration,
          restriction,
          detail,
          previewImage,
          previewVideo,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMovie(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}

const service = new Service();
export default service;
