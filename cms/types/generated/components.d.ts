import type { Schema, Attribute } from '@strapi/strapi';

export interface BlockAboutSlider extends Schema.Component {
  collectionName: 'components_block_about_sliders';
  info: {
    displayName: 'AboutSlider';
    icon: 'book';
  };
  attributes: {
    slides: Attribute.Component<'component.about-slider-item', true> &
      Attribute.Required;
  };
}

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
    video: Attribute.Component<'component.video'> & Attribute.Required;
  };
}

export interface BlockCourseOverview extends Schema.Component {
  collectionName: 'components_block_course_overviews';
  info: {
    displayName: 'CourseOverview';
    icon: 'grid';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    stats: Attribute.Component<'component.stat', true> & Attribute.Required;
    sections: Attribute.Component<'component.course-section', true> &
      Attribute.Required;
    moreText: Attribute.String & Attribute.Required;
    initialSections: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<4>;
  };
}

export interface BlockCymbal extends Schema.Component {
  collectionName: 'components_block_cymbals';
  info: {
    displayName: 'Cymbal';
    description: '';
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

export interface BlockFaq extends Schema.Component {
  collectionName: 'components_block_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    items: Attribute.Component<'component.faq-item', true> & Attribute.Required;
  };
}

export interface BlockImageCta extends Schema.Component {
  collectionName: 'components_block_image_ctas';
  info: {
    displayName: 'ImageCTA';
    icon: 'cursor';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    buyText: Attribute.String & Attribute.Required;
    coverImage: Attribute.Media & Attribute.Required;
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

export interface BlockMegaCymbal extends Schema.Component {
  collectionName: 'components_block_mega_cymbals';
  info: {
    displayName: 'MegaCymbal';
    icon: 'music';
  };
  attributes: {
    heading: Attribute.Text & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
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

export interface BlockReviews extends Schema.Component {
  collectionName: 'components_block_reviews';
  info: {
    displayName: 'Reviews';
    icon: 'star';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    reviews: Attribute.Component<'component.review-item', true> &
      Attribute.Required;
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

export interface ComponentAboutSliderItem extends Schema.Component {
  collectionName: 'components_component_about_slider_items';
  info: {
    displayName: 'AboutSliderItem';
    icon: 'shield';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    coverImage: Attribute.Media & Attribute.Required;
  };
}

export interface ComponentCourseSection extends Schema.Component {
  collectionName: 'components_component_course_sections';
  info: {
    displayName: 'CourseSection';
    icon: 'archive';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    length: Attribute.String;
    previewMedia: Attribute.Media;
  };
}

export interface ComponentFaqItem extends Schema.Component {
  collectionName: 'components_component_faq_items';
  info: {
    displayName: 'FAQItem';
    icon: 'lightbulb';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    answer: Attribute.Text & Attribute.Required;
  };
}

export interface ComponentImage extends Schema.Component {
  collectionName: 'components_component_images';
  info: {
    displayName: 'Image';
    icon: 'briefcase';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
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

export interface ComponentReviewItem extends Schema.Component {
  collectionName: 'components_component_review_items';
  info: {
    displayName: 'ReviewItem';
    icon: 'twitter';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    author: Attribute.String & Attribute.Required;
    coverImage: Attribute.Media & Attribute.Required;
  };
}

export interface ComponentStat extends Schema.Component {
  collectionName: 'components_component_stats';
  info: {
    displayName: 'Stat';
    icon: 'information';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
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
    previewImage: Attribute.Media & Attribute.Required;
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
      'block.about-slider': BlockAboutSlider;
      'block.about': BlockAbout;
      'block.big-event': BlockBigEvent;
      'block.course-overview': BlockCourseOverview;
      'block.cymbal': BlockCymbal;
      'block.event': BlockEvent;
      'block.faq': BlockFaq;
      'block.image-cta': BlockImageCta;
      'block.logo-hero': BlockLogoHero;
      'block.mega-cymbal': BlockMegaCymbal;
      'block.quote': BlockQuote;
      'block.reviews': BlockReviews;
      'block.video': BlockVideo;
      'component.about-slider-item': ComponentAboutSliderItem;
      'component.course-section': ComponentCourseSection;
      'component.faq-item': ComponentFaqItem;
      'component.image': ComponentImage;
      'component.link': ComponentLink;
      'component.review-item': ComponentReviewItem;
      'component.stat': ComponentStat;
      'component.video': ComponentVideo;
      'page.page-seo': PagePageSeo;
    }
  }
}
