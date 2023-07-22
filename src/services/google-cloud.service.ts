import {Bucket, Storage} from '@google-cloud/storage';

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: './gcloud-credentials.json',
});

export const deleteFile = async (fileName: string): Promise<void> => {
    try {
        const bucketName = 'illuspark-dev';
        const bucket: Bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        await file.delete();

        console.log(`File '${fileName}' deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting file '${fileName}':`, error);
    }
};

