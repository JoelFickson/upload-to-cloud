interface UploadedFile {

	name: string;

	encoding: string;

	mimetype: string;

	data: Buffer;

	tempFilePath: string;

	truncated: boolean;

	size: number;

	md5: string;

	mv(path: string, callback: (err: any) => void): void;

	mv(path: string): Promise<void>;
}