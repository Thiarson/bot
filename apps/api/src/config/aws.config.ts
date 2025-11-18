interface AwsConfig {
    accessKey: string;
    secretKey: string;
    region: string;
    bucketCvName: string;
    minioEndpoint?: string;
}

const stage = process.env.NODE_ENV as string;

if (!process.env.ACCESS_KEY || !process.env.SECRET_KEY) {
    throw new Error("Missing AWS credentials env");
}

const awsConfig = {
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    bucketCvName: process.env.BUCKET_CV_NAME,
    
    ...(stage === 'development' && {
        minioEndpoint: process.env.MINIO_ENDPOINT,
    }),
};

export {
    stage,
    awsConfig,
};

export type { AwsConfig };
