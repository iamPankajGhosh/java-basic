import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

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

  async getMovie(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getMovies(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // file upload services

  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteImageBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteImage(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteImageBucketId, fileId);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadVideo(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteVideoBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteVideo(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteVideoBucketId, fileId);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getImageUrl(fileId) {
    return this.bucket.getFilePreview(conf.appwriteImageBucketId, fileId);
  }

  getVideoUrl(fileId) {
    return this.bucket.getFilePreview(conf.appwriteVideoBucketId, fileId);
  }
}

const service = new Service();
export default service;
