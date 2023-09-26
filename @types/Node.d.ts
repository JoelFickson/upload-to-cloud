import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    export interface Request {
      file: UploadedFile;

      [key: string]:
        | UploadedFile
        | string
        | number
        | boolean
        | undefined
        | null;
    }
  }
}

export {};
