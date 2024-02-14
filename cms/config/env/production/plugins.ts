import { TConfigInput } from '../../../types/config'

export default ({ env }: TConfigInput) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('DO_SPACE_ACCESS_KEY'),
        secretAccessKey: env('DO_SPACE_ACCESS_SECRET'),
        endpoint: env('DO_SPACE_ENDPOINT', 'https://ams3.digitaloceanspaces.com'),
        region: env('DO_SPACE_REGION', 'ams3'),
        params: {
          ACL: env('DO_SPACE_ACL', 'public-read'),
          signedUrlExpires: env('DO_SPACE_SIGNED_URL_EXPIRES', 15 * 60),
          Bucket: env('DO_SPACE_BUCKET', 'spencer-web'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  }
});
