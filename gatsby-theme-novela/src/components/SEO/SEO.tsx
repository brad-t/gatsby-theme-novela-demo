/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmt on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

interface HelmetProps {
  children?: React.ReactChildren;
  title: string;
  description?: string;
  pathname: string;
  image?: string;
  url?: string;
  canonical?: string;
  contentType?: string;
  category?: string;
  tags?: string;
  twitter?: string;
  timeToRead?: string;
}

const seoQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            description
            social {
              name
              url
            }
            siteUrl
            title
          }
        }
      }
    }
  }
`;

function getMetaTags({
  title,
  description,
  url,
  image,
  contentType,
  published,
  pathname,
  timeToRead,
}: HelmetProps) {
  const results = useStaticQuery(seoQuery);
  const site = results.allSite.edges[0].node.siteMetadata;
  const twitter = site.social.find(option => option.name === "twitter") || {};

  const fullURL = path => `${site.siteUrl}${path}`;

  const metaTags = [
    { charset: "utf-8" },
    {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#000",
    },
    {
      rel: "canonical",
      href: fullURL(pathname),
    },
    { itemprop: "name", content: site.title },
    { itemprop: "description", content: site.description },
    { itemprop: "image", content: fullURL(image) },
    { name: "description", content: site.description },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: site.name },
    { name: "twitter:title", content: site.title },
    { name: "twitter:description", content: site.description },
    { name: "twitter:creator", content: twitter.url },
    {
      name: "twitter:image",
      content: fullURL(image),
    },

    { property: "og:title", content: site.title },
    { property: "og:type", content: contentType },
    { property: "og:url", content: url },
    { property: "og:image", content: fullURL(image) },
    { property: "og:description", content: site.description },
    { property: "og:site_name", content: site.name },
  ];

  if (published)
    metaTags.push({ name: "article:published_time", content: published });

  if (timeToRead) {
    metaTags.push({ name: "twitter:label1", value: "Reading time" });
    metaTags.push({ name: "twitter:data1", value: timeToRead });
  }

  return metaTags;
}

function SEO(props: HelmetProps) {
  const { children, title } = props;

  return (
    <Helmet htmlAttributes={{ lang: "en" }} meta={getMetaTags(props)}>
      {children}
    </Helmet>
  );
}

export default SEO;
