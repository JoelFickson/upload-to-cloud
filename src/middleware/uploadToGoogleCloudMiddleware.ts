import {NextFunction, Request, Response} from "express";
import {getBucket} from "@utils/getBucket";
import uploadToGoogleCloudStorage from "@utils/uploadToGoogleCloud";

/**
 * Middleware for handling file uploads and storing them in Google Cloud Storage.
 *
 * @param {string} bucketName - The name of the Google Cloud Storage bucket where the files will be stored.
 *
 * @returns {Function} Express middleware function with signature `(req, res, next)`.
 *
 * @throws {Error} If there is an issue with the file upload or storage, an error is thrown.
 *
 * @example
 * // Example usage:
 * const bucketName = 'my-bucket';
 * app.post('/upload', uploadFileMiddleware(bucketName), (req, res) => {
 *   // Handle the response after the file is uploaded.
 *   res.status(200).json({ message: 'File uploaded successfully.' });
 * });
 */

const uploadFileMiddleware =
  (bucketName: string): Function =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.myFile;

      //TODO :: Check file if its an instance of UploadedFile

      console.info("UPLOADING:: ", file.name, " to ", bucketName, " bucket ");

      const bucket = getBucket(bucketName);

      const response = await uploadToGoogleCloudStorage(file, bucket);

      if (!response) {
        return res.status(400).send({
          error: true,
          message: "There was an error uploading picture",
        });
      }

      req.fileUrl = response;

      next();
    } catch (error) {
      throw error;
    }
  };

export default uploadFileMiddleware;
