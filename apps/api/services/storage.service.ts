import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { awsConfig, stage } from "@config/aws.config";

const s3Options: S3ClientConfig = {
    credentials: {
        accessKeyId: awsConfig.accessKey,
        secretAccessKey: awsConfig.secretKey,
    },
    region: awsConfig.region,

    ...(stage === "development" && {
        endpoint: awsConfig.minioEndpoint,
        forcePathStyle: true,
    }),
};

const s3Client = new S3Client(s3Options);

export async function generateSignedUrlForFileUpload(fileKey: string, filetype: string) {
    const command = new PutObjectCommand({
        Bucket: awsConfig.bucketCvName,
        Key: fileKey,
        ContentType: filetype,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 60 * 5,
    });
    
    return signedUrl;
}
