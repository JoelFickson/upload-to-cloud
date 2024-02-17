import path from 'path';
import generateUniqueId from '@utils/generateUniqueIds';
import { Bucket } from '@google-cloud/storage';


/**
 * Uploads a file to Google Cloud Storage.
 *
 * @param {UploadedFile} file - The file to be uploaded.
 * @param {Bucket} bucket - The Google Cloud Storage bucket where the file will be stored.
 *
 * @returns {Promise<string>} A Promise that resolves to the URL of the uploaded file
 *   in Google Cloud Storage upon successful upload.
 *
 * @throws {Error} If there is an issue with the file upload process, an error is thrown.
 *
 */

async function uploadToGoogleCloudStorage(
	file: UploadedFile,
	bucket: Bucket,
): Promise<string> {
	console.info('UPLOADING:: to ', bucket.name, ' bucket ⏳');

	return new Promise<string>((resolve, reject) => {
		const { name } = file;
		const buffer = file.data;
		const ext = path.extname(name).toLocaleLowerCase();
		const document = generateUniqueId() + ext;
		const blob = bucket.file(document);
		const blobStream = blob.createWriteStream({
			resumable: false,
			validation: false,
		});

		blobStream
			.on('finish', async () => {
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

				console.info(
					'UPLOADING::SUCCESS! File name ',
					publicUrl,
					' to ',
					bucket.name,
					' bucket ✅',
				);
				resolve(publicUrl);
			})
			.on('error', (error: unknown) => {
				reject(Error(`Unable to upload file, something went wrong : ${error}`));
			})
			.end(buffer);
	});
}

export default uploadToGoogleCloudStorage;
