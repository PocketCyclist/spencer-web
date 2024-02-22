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
    quote: Attribute.Text & Attribute.Required;
    author: Attribute.String & Attribute.Required;
  };
}

export interface BlockBigEvent extends Schema.Component {
  collectionName: 'components_block_big_events';
  info: {
    displayName: 'BigEvent';
    icon: 'plane';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text & Attribute.Required;
    videoUrl: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://www.youtube.com/watch?v=dQw4w9WgXcQ'>;
  };
}

export interface BlockCymbal extends Schema.Component {
  collectionName: 'components_block_cymbals';
  info: {
    displayName: 'cymbal';
  };
  attributes: {
    right: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface BlockEvent extends Schema.Component {
  collectionName: 'components_block_events';
  info: {
    displayName: 'Event';
    icon: 'plane';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface BlockLogoHero extends Schema.Component {
  collectionName: 'components_block_logo_heroes';
  info: {
    displayName: 'LogoHero';
    icon: 'expand';
  };
  attributes: {
    backgroundImage: Attribute.Media & Attribute.Required;
  };
}

export interface BlockQuote extends Schema.Component {
  collectionName: 'components_block_quotes';
  info: {
    displayName: 'Quote';
    icon: 'quote';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    author: Attribute.String & Attribute.Required;
  };
}

export interface BlockVideo extends Schema.Component {
  collectionName: 'components_block_videos';
  info: {
    displayName: 'Video';
    description: '';
  };
  attributes: {
    video: Attribute.Component<'component.video'> & Attribute.Required;
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
    icon: Attribute.Media;
  };
}

export interface ComponentVideo extends Schema.Component {
  collectionName: 'components_component_videos';
  info: {
    displayName: 'Video';
    icon: 'play';
    description: '';
  };
  attributes: {
    url: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://www.youtube.com/watch?v=dQw4w9WgXcQ'>;
    previewImage: Attribute.Media;
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
        minLength: 32;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'block.about': BlockAbout;
      'block.big-event': BlockBigEvent;
      'block.cymbal': BlockCymbal;
      'block.event': BlockEvent;
      'block.logo-hero': BlockLogoHero;
      'block.quote': BlockQuote;
      'block.video': BlockVideo;
      'component.link': ComponentLink;
      'component.video': ComponentVideo;
      'page.page-seo': PagePageSeo;
    }
  }
}
