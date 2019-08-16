import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface SEOProps {
  /** Description text */
  description?: string;
  /** Link for Og Image */
  ogImageProp?: string;
  /** Language text */
  lang?: string;
  /** SEO keywords */
  keywords?: string[];
  /** Document title */
  title: string;
}

interface SEOData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
      siteUrl: string;
    };
  };
  ogImageDefault: {
    childImageSharp: {
      fixed: {
        src: string;
      };
    };
  };
}

const SEO: React.FunctionComponent<SEOProps> = ({
  description,
  ogImageProp,
  lang = 'en',
  keywords = [],
  title,
}) => {
  const data: SEOData = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
      ogImageDefault: file(absolutePath: { regex: "/assets/og-image/" }) {
        childImageSharp {
          fixed(height: 630, width: 1200) {
            src
          }
        }
      }
    }
  `);

  const metaDescription = description || data.site.siteMetadata.description;
  const ogImage =
    ogImageProp ||
    data.site.siteMetadata.siteUrl.concat(
      data.ogImageDefault.childImageSharp.fixed.src
    );

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: ogImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: ogImage,
        },
      ].concat(
        keywords.length > 0
          ? {
              content: keywords.join(`, `),
              name: `keywords`,
            }
          : []
      )}
    />
  );
};

export default SEO;
