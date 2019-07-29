import React from "react";

import SEO from "@components/SEO";

import { IArticleNode } from "@typings";

export default ({
  article,
  location,
}: {
  article: IArticleNode;
  location: any;
}) => (
  <Microdata
    article={article}
    publicationLogo={"example.com"}
    location={location}
    sectionName={article.title}
    sectionUrl={location.href}
  />
);

const Microdata = ({
  article: {
    canonical,
    title,
    excerpt,
    author,
    hero,
    publicationDate,
    backgroundImage,
    timeToRead,
    path,
  },
  location,
  publicationLogo,
}: {
  article: IArticleNode;
  location: Location;
  publicationLogo: string;
  sectionName: string;
  sectionUrl: string;
}) => {
  // let isoDateStrPublished;

  // try {
  //   isoDateStrPublished = new Date(publicationDate!).toISOString();
  // } catch (error) {
  //   // Now all browsers can parse our date string. That's fine. The crawler can
  //   console.warn(error);
  // }

  return (
    <>
      {/* <SEO
        title={title}
        description={excerpt}
        image={backgroundImage.seo.src}
        canonical={canonical}
        timeToRead={timeToRead}
        published={isoDateStrPublished}
      >
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${location.href}"
            },
            "headline": "${title}",
            "image": "${hero.Article__Hero.src}",
            "datePublished": "${isoDateStrPublished}",
            "dateModified": "${isoDateStrUpdated}",
            "author": {
              "@type": "Person",
              "name": "${author ? author.name : "Narative Editors"}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Narative",
              "logo": {
                "@type": "ImageObject",
                "url": "${publicationLogo}"
              }
            },
            "description": "${excerpt.replace(/"/g, '\\"')}"
          }
        `}
        </script>
      </SEO> */}
    </>
  );
};
