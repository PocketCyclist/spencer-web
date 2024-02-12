import type { Schema, Attribute } from '@strapi/strapi';

export interface BlockAbout extends Schema.Component {
  collectionName: 'components_block_abouts';
  info: {
    displayName: 'About';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    firstImage: Attribute.Media & Attribute.Required;
    secondImage: Attribute.Media & Attribute.Required;
  };
}

export interface BlockQuote extends Schema.Component {
  collectionName: 'components_block_quotes';
  info: {
    displayName: 'Quote';
    icon: 'quote';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
  };
}

export interface BlockVideo extends Schema.Component {
  collectionName: 'components_block_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    url: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://www.youtube.com/watch?v=dQw4w9WgXcQ'>;
  };
}

export interface ComponentLink extends Schema.Component {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'earth';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    icon: Attribute.Media & Attribute.Required;
  };
}

export interface PagePageSeo extends Schema.Component {
  collectionName: 'components_page_page_seos';
  info: {
    displayName: 'Page SEO';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        minLength: 64;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'block.about': BlockAbout;
      'block.quote': BlockQuote;
      'block.video': BlockVideo;
      'component.link': ComponentLink;
      'page.page-seo': PagePageSeo;
    }
  }
}
