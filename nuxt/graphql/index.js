import gql from 'graphql-tag';
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
export const ButtonFragmentDoc = gql`
    fragment Button on Button {
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
  title
  subtitle
  content
  image {
    relationTo
    value {
      ... on Image {
        ...Image
      }
      ... on SVG {
        ...SVG
      }
    }
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
    ${ImageFragmentDoc}
${SvgFragmentDoc}
${ButtonFragmentDoc}`;
export const TextBlockFragmentDoc = gql`
    fragment TextBlock on TextBlock {
  blockType
  content
}
    `;
export const GridBlockFragmentDoc = gql`
    fragment GridBlock on GridBlock {
  blockType
  col_num
  gap
  columns {
    items {
      ...TextBlock
    }
  }
}
    ${TextBlockFragmentDoc}`;
export const SectionBlockFragmentDoc = gql`
    fragment SectionBlock on SectionBlock {
  blockType
  anchorId
  paddingY
  width
  blocks {
    ...TextBlock
    ...GridBlock
  }
}
    ${TextBlockFragmentDoc}
${GridBlockFragmentDoc}`;
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
      layout {
        ...SectionBlock
        ...GridBlock
        ...HeroBlock
        ...TextBlock
      }
    }
  }
}
    ${SeoImageFragmentDoc}
${SectionBlockFragmentDoc}
${GridBlockFragmentDoc}
${HeroBlockFragmentDoc}
${TextBlockFragmentDoc}`;