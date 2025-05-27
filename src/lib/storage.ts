import Bun from "bun";

export const uploadClient = new Bun.S3Client({
  accessKeyId: Bun.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: Bun.env.AWS_SECRET_ACCESS_KEY,
  bucket: Bun.env.AWS_BUCKET_NAME,
  endpoint: Bun.env.AWS_ENDPOINT,
  region: Bun.env.AWS_REGION,
});
