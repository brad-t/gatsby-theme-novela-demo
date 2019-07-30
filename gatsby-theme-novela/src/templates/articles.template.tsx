import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";

import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesGridLayoutProvider from "../sections/articles/Articles.Grid.Context";
import ArticlesPagination from "../sections/articles/Articles.Pagination";
import ArticlesGrid from "../sections/articles/Articles.Grid";

/**
 * Narative.co/articles
 *
 * This template is used to present our wonderful articles that we pull
 * from Contentful. This is not located in the /pages folder because we're
 * using it in the createPages lifecycle event
 */

function ArticlesPage({ data, location, pageContext }) {
  // const { seo } = data.allContentfulPage.edges[0].node
  const articles = pageContext.group;
  return (
    <ArticlesGridLayoutProvider articles={articles}>
      <Layout>
        {/* <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image.file.url}
          pathname={location.pathname}
        /> */}
        <ArticlesHero />
        <Section narrow>
          <ArticlesGrid articles={articles} />
          <ArticlesPagination pageContext={pageContext} />
        </Section>
        <ArticlesGradient />
      </Layout>
    </ArticlesGridLayoutProvider>
  );
}

export default ArticlesPage;

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: background 0.3s var(--ease-in-out-quad);
`;
