import { GetSignedUrlConfig } from '@google-cloud/storage/build/src/file';
import { storage } from '@utils/getBucket';


/**
 * Generates a signed URL for accessing an object in Google Cloud Storage.
 *
 * @param {string} bucketName - The name of the Google Cloud Storage bucket.
 * @param {string} fileName - The name of the object (file) for which a signed URL is requested.
 * @param {number} [duration=15] - The duration (in minutes) for which the signed URL is valid. Default is 15 minutes.
 *
 * @returns {Promise<string>} A Promise that resolves to the signed URL for accessing the object.
 *
 * @throws {Error} If there is an issue generating the signed URL, an error is thrown.
 *
 */

async function getSignedUrl(
	bucketName: string,
	fileName: string,
	duration: number = 15,
): Promise<string> {
	const options: GetSignedUrlConfig = {
		version: 'v4',
		action: 'read',
		expires: Date.now() + duration * 60 * 1000,
	};

	const [url] = await storage
		.bucket(bucketName)
		.file(fileName)
		.getSignedUrl(options);

	return url;
}

export default getSignedUrl;
