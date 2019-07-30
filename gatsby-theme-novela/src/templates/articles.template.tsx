import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";

import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesGridLayoutProvider from "../sections/articles/Articles.Grid.Context";
import ArticlesPagination from "../sections/articles/Articles.Pagination";
import ArticlesGrid from "../sections/articles/Articles.Grid";
import ArticlesFooter from "../sections/articles/Articles.Footer";

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
        <ArticlesGradient>
          <Section narrow>
            <ArticlesGrid articles={articles} />
            <ArticlesPagination pageContext={pageContext} />
          </Section>
          <ArticlesFooter />
        </ArticlesGradient>
      </Layout>
    </ArticlesGridLayoutProvider>
  );
}

export default ArticlesPage;

const ArticlesGradient = styled.div`
  background: ${p => p.theme.colors.gradient};
`;
