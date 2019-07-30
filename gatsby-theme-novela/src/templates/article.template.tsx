import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import Layout from "@components/Layout";
import { RichText } from "@components/Media";
import Progress from "@components/Progress";
import ProgressMobile from "@components/Progress/Progress.Mobile";
import Section from "@components/Section";
import NavigationFooter from "@components/Navigation/Navigation.Footer";

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import Aside from "../sections/article/Article.Aside";
import ArticleHero from "../sections/article/Article.Hero";
import ArticleControls from "../sections/article/Article.Controls";
import ArticlesNext from "../sections/article/Article.Next";
import ArticleSEO from "../sections/article/Article.SEO";
import ArticleShare from "../sections/article/Article.Share";
import ArticleHighlight from "../sections/article/Article.Highlight";

function Article({ pageContext, location }) {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [contentOffset, setContentOffset] = useState<number>(0);

  const { article, author, next } = pageContext;
  const scrollInfo = { height: contentHeight, offset: contentOffset };

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;
      const imageRect = document
        .getElementById("ArticleImage__Hero")
        .getBoundingClientRect();
      const imageOffsetFromTopOfWindow = imageRect.top + window.scrollY;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
      setContentOffset(imageOffsetFromTopOfWindow);
    }, 20);

    calculateBodySize();

    window.addEventListener("resize", calculateBodySize);
    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  return (
    <Layout>
      <ArticleSEO article={article} location={location} />
      <ArticleHero article={article} author={author} />
      <Aside {...scrollInfo}>
        <Progress {...scrollInfo} />
      </Aside>
      <MobileControls>
        <ArticleControls shortUrl={article.slug} />
      </MobileControls>
      <ArticleBody>
        <RichText contentRef={contentSectionRef} content={article.body}>
          <ArticleShare article={article} />
          <ArticleHighlight article={article} />
        </RichText>
      </ArticleBody>
      <Gradient>
        <NextArticle narrow>
          <FooterNext>Next article from Narative</FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
        <NavigationFooter to="/" text="Back to Articles" />
      </Gradient>
      <ProgressMobile title={article.title} {...scrollInfo} />
    </Layout>
  );
}

export default Article;

const MobileControls = styled.div`
  position: relative;
  padding-top: 65px;
  background: white;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

const ArticleBody = styled.article`
  position: relative;
  padding: 160px 0 35px;
  padding-left: 68px;
  background: white;
  transition: background 0.2s linear;

  ${mediaqueries.tablet`
    padding: 70px 0 10px;
  `}
`;

const Gradient = styled.div`
  position: relative;
  background: linear-gradient(180deg, #fff 66%, #d9dbe0 100%);
  transition: background 0.4s ease-in-out;
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: #000;

  ${mediaqueries.tablet`
    margin-bottom: 50px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: #000;
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;
