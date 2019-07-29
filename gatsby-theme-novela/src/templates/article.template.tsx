import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";

import Layout from "@components/Layout";
import { RichText } from "@components/Media";
import withDarkMode from "@components/DarkMode";
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
import ArticleMicrodata from "../sections/article/Article.Microdata";
import ArticleShare from "../sections/article/Article.Share";
import ArticleHighlight from "../sections/article/Article.Highlight";

function Article({ pageContext, location, mode, toggleMode }) {
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
      <ArticleMicrodata article={article} location={location} />
      <ArticleHero article={article} author={author} />
      <Aside {...scrollInfo}>
        <Progress {...scrollInfo} />
      </Aside>
      <MobileControls>
        <ArticleControls
          shortUrl={article.slug}
          toggleMode={toggleMode}
          mode={mode}
        />
      </MobileControls>
      <Content contentRef={contentSectionRef} content={article.body}>
        <ArticleShare article={article} mode={mode} />
        <ArticleHighlight article={article} mode={mode} />
      </Content>
      <Gradient>
        <NextArticle narrow>
          <FooterNext>Next article from Narative</FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
        <NavigationFooter mode={mode} to="/" text="Back to Articles" />
      </Gradient>
      <ProgressMobile mode={mode} title={article.title} {...scrollInfo} />
    </Layout>
  );
}

export default withDarkMode(Article);

const MobileControls = styled.div`
  position: relative;
  padding-top: 65px;
  background: ${p => p.theme.mode.background};
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

const Content = styled(RichText).attrs<{ textHighlightColor: string }>({})`
  position: relative;
  padding: 160px 0 35px;
  padding-left: 68px;
  background: ${p => p.theme.mode.background};
  transition: background 0.2s linear;

  ${mediaqueries.tablet`
    padding: 70px 0 10px;
  `}
`;

const Gradient = styled.div`
  position: relative;
  background: ${p => p.theme.mode.gradient};
  transition: background 0.4s ease-in-out;
`;

const Meta = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  font-size: 14px;
  color: ${p => p.theme.mode.text};
  margin-bottom: 80px;

  ${mediaqueries.tablet`
    padding: 0 20px;
    margin-bottom: 50px;
  `};
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${p => p.theme.mode.text};

  ${mediaqueries.tablet`
    margin-bottom: 50px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.mode.text};
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
