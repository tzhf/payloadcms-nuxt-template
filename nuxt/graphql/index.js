import gql from 'graphql-tag';
export const MediaFragmentDoc = gql`
    fragment Media on Media {
  id
  url
  filename
  mimeType
  width
  height
  description
  sizes {
    xs {
      url
      width
    }
    sm {
      url
      width
    }
    md {
      url
      width
    }
    lg {
      url
      width
    }
    xl {
      url
      width
    }
    xxl {
      url
      width
    }
    xxxl {
      url
      width
    }
  }
}
    `;
export const ButtonFragmentDoc = gql`
    fragment Button on Button {
  blockType
  label
  url
  color
  variant
  size
  openInNewTab
}
    `;
export const HeroBlockFragmentDoc = gql`
    fragment HeroBlock on HeroBlock {
  blockType
  anchorId
  title
  subtitle
  image {
    ...Media
  }
  buttons {
    ...Button
  }
  layout
  splitRatio
  mediaPosition
  mediaOrder
  overlayOpacity
  textAlignment
  minHeight
}
    ${MediaFragmentDoc}
${ButtonFragmentDoc}`;
export const TextBlockFragmentDoc = gql`
    fragment TextBlock on TextBlock {
  blockType
  anchorId
  content
}
    `;
export const SeoImageFragmentDoc = gql`
    fragment SeoImage on SeoImage {
  id
  alt
  url
  width
  height
  sizes {
    opengraph {
      url
      width
      height
    }
  }
}
    `;
export const PageFragmentDoc = gql`
    fragment Page on Page {
  id
  title
  slug
  meta {
    title
    description
    image {
      ...SeoImage
    }
  }
}
    ${SeoImageFragmentDoc}`;
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  id
  description
  width
  height
  sizes {
    xs {
      url
      width
    }
    sm {
      url
      width
    }
    md {
      url
      width
    }
    lg {
      url
      width
    }
    xl {
      url
      width
    }
    xxl {
      url
      width
    }
    xxxl {
      url
      width
    }
  }
}
    `;
export const SvgFragmentDoc = gql`
    fragment SVG on SVG {
  id
  url
  width
  height
}
    `;
export const VideoThumbnailFragmentDoc = gql`
    fragment VideoThumbnail on VideoThumbnail {
  id
  url
  width
  height
  sizes {
    thumbnail {
      url
      width
    }
  }
}
    `;
export const VideoFragmentDoc = gql`
    fragment Video on Video {
  id
  url
  thumbnail {
    ...VideoThumbnail
  }
}
    ${VideoThumbnailFragmentDoc}`;
export const GetGlobalsDocument = gql`
    query GetGlobals {
  SiteSettings {
    typography {
      fontBody
      fontHeading
      fontSize
    }
    colors {
      background
      foreground
      primary
      primaryForeground
      secondary
      secondaryForeground
      muted
      mutedForeground
      border
      accent
      accentForeground
    }
    navbar {
      textColor
      backgroundColor
      backgroundColorScroll
      logo {
        ...SVG
      }
      links {
        label
        type
        url
        anchor
        openInNewTab
        page {
          id
          title
          slug
        }
      }
      buttons {
        ...Button
      }
    }
    footer {
      links {
        label
        type
        url
        anchor
        openInNewTab
        page {
          id
          title
          slug
        }
      }
    }
    meta {
      title
      description
      image {
        ...SeoImage
      }
    }
  }
}
    ${SvgFragmentDoc}
${ButtonFragmentDoc}
${SeoImageFragmentDoc}`;
export const GetPageDocument = gql`
    query GetPage($slug: String!) {
  Pages(limit: 1, where: {slug: {equals: $slug}}) {
    docs {
      ...Page
      layout {
        ...HeroBlock
        ...TextBlock
      }
    }
  }
}
    ${PageFragmentDoc}
${HeroBlockFragmentDoc}
${TextBlockFragmentDoc}`;