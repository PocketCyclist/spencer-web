import { TConfigInput } from '../types/config'

export default ({ env }: TConfigInput) => ({
  translate: {
    enabled: true,
    config: {
      // Add the name of your provider here (for example 'deepl' for strapi-provider-translate-deepl or the full package name)
      provider: 'deepl',
      providerOptions: {
        // your API key - required and wil cause errors if not provided
        apiKey: env('DEEPL_TOKEN'),
        // use custom api url - optional
        // apiUrl: 'https://api-free.deepl.com',
        // use custom locale mapping (for example 'en' locale is deprecated so need to choose between 'EN-GB' and 'EN-US')
        localeMap: {
          // use uppercase here!
          EN: 'EN-US',
          FR: 'FR-FR',
        },
        apiOptions: {
          // see <https://github.com/DeepLcom/deepl-node#text-translation-options> for supported options.
          // note that tagHandling Mode cannot be set this way.
          // use with caution, as non-default values may break translation of markdown
          // formality: 'default',
          // ...
        },
        // Your provider might define some custom options like an apiKey
      },
      // Which field types are translated (default string, text, richtext, components and dynamiczones)
      // Either string or object with type and format
      // Possible formats: plain, markdown, html (default plain)
      translatedFieldTypes: [
        'string',
        { type: 'text', format: 'plain' },
        { type: 'richtext', format: 'markdown' },
        'component',
        'dynamiczone',
      ],
      // If relations should be translated (default true)
      translateRelations: true,
    },
  },
})
