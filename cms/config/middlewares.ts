export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ['\'self\'', 'https:'],
          'img-src': [
            '\'self\'',
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'spencer-web.ams3.digitaloceanspaces.com',
          ],
          'media-src': [
            '\'self\'',
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'spencer-web.ams3.digitaloceanspaces.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      formLimit: "128mb", // modify form body
      jsonLimit: "128mb", // modify JSON body
      textLimit: "128mb", // modify text body
      formidable: {
        maxFileSize: 120 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
