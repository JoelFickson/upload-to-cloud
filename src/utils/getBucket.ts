import * as path from "path";
import { Storage } from "@google-cloud/storage";

const serviceKey = path.join(__dirname, "../../google-config.json");
const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: serviceKey,
});

function getBucket(bucketName: string) {
  return storage.bucket(bucketName);
}

export { storage, getBucket };
