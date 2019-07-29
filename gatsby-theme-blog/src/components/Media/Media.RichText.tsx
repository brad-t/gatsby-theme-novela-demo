import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled, { css } from "styled-components";

import mediaqueries from "@styles/media";

import { IRichText } from "@typings";

function RichText({
  content,
  contentRef,
  children,
  ...props
}: React.SFC<IRichText>) {
  return (
    <Content ref={contentRef} {...props}>
      <MDXRenderer>{content}</MDXRenderer>
      {children}
    </Content>
  );
}

export default RichText;

const imageWidths = {
  regular: "680px",
  large: "1004px",
  full: "100vw",
};

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;
const selectionColor = css`
  &::selection {
    background: #c9e1f4; /* WebKit/Blink Browsers */
  }

  &::-moz-selection {
    background: #c9e1f4; /* Gecko Browsers */
  }
`;

const transitionColor = css`
  transition: color 0.25s ease;
`;

const callToAction = css`
  .CallToAction {
    position: relative;
    width: 100%;
    max-width: 1140px;
    margin: 30px auto 65px;
    padding: 65px;
    background: ${p => p.theme.mode.cta.background};
    transition: background 0.25s;

    p {
      position: relative;
      padding-bottom: 35px;
      color: ${p => p.theme.colors.moon};

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 125px;
        height: 1px;
        background: ${p => p.theme.mode.cta.border};
      }
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;

      &:first-child {
        margin-right: 55px;
      }

      svg {
        margin-right: 13px;

        path {
          fill: ${p => p.theme.mode.links};
        }
      }
    }

    &__content {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
    }

    stop {
      stop-color: ${p => p.theme.mode.cta.corner};
    }

    &__left {
      position: absolute;
      top: -7px;
      left: -1px;
    }

    &__right {
      position: absolute;
      bottom: -1px;
      right: -1px;
    }

    ${mediaqueries.tablet`
      background: ${p => p.theme.mode.preview.bg}
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: 20px 20px 55px;
      padding: 0;
      width: auto;

      &__left,
      &__right {
        display: none;
      }

      h3 {
        padding: 50px 24px 0;
        margin-bottom: 15px;
        text-align: center;
      }

      p {
        margin-bottom: 50px;
        padding: 0 24px;
        text-align: center;
        font-size: 18px;

        &::after {
          content: none;
        }
      }

      &__links {
        display: flex;
        flex-direction: row-reverse;
        border-top: 1px solid  ${p => p.theme.mode.cta.border};
      }

      a {
        display: flex;
        flex: 1;
        height: 58px;
        font-size: 18px;
        text-decoration: none;

        svg {
          display: none;
        }

        &:first-child {
          margin-right: 0;
        }

        &:nth-child(2) {
          font-weight: 400;
          color: ${p => p.theme.colors.moon};
          border-right: 1px solid  ${p => p.theme.mode.cta.border};
        }
      }
    `}
  }
`;

const highlight = css`
  highlight {
    display: inline;
    cursor: pointer;
    text-decoration: none;
    background: rgba(233, 218, 172, 0.3);
    transition: background 0.25s;

    &:hover {
      background: rgba(233, 218, 172, 0.4);
    }

    & > p {
      display: inline-block;
      margin-bottom: 0;
    }
  }
`;

const Content = styled.article`
  position: relative;
  ${selectionColor}

  /* Custom Components form Contentful */
  ${callToAction}
  ${highlight}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${articleWidth};
    font-family: ${p => p.theme.fontfamily.serif};
    * {
      font-family: ${p => p.theme.fontfamily.serif};
    }
    color: ${p => p.theme.mode.text};
    font-weight: 800;
  }


  h1,
  h1 *,
  h2,
  h2 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 2rem;
    padding-top: 40px;

    ${mediaqueries.desktop_up`
      font-size: 3.2rem;
      paddng-top: 65px;
      margin-bottom: 2.5rem;
    `};
  }

  h3,
  h3 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 1rem;

    ${mediaqueries.desktop`
      margin-top: 0;
      margin-bottom: 0.75rem;
    `};
  }

  a,
  a * {
    color: ${p => p.theme.mode.links};
    ${transitionColor};

    &:visited {
      color: ${p => p.theme.mode.links};
      opacity: 0.85;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  figure {
    margin-bottom: 0;

    img {
      margin-bottom: 15px;
    }

    figcaption {
      ${articleWidth};
      font-family: ${p => p.theme.fontfamily.sansSerif};
      color: ${p => p.theme.mode.text};
      opacity: 0.5;
      font-size: 16px;
      display: block;
      margin-bottom: 75px;

      ${mediaqueries.tablet`
        margin-bottom: 30px;
        font-size: 18px;
      `}
    }
  }

  blockquote {
    ${transitionColor};
    margin: 50px auto;
    color: ${p => p.theme.mode.text};
    font-family: ${p => p.theme.fontfamily.serif};
    font-style: italic;

    p {
      max-width: 880px;
      padding-right: 100px;
      width: 100%;
      margin: 50px auto;
      font-size: 36px;
      line-height: 1.32;
      font-weight: bold;
    }

      ${mediaqueries.tablet`
        margin: 15px auto 45px;
      `}
    }
  }

  .prism-code {
    width: 100%;
    max-width: 744px;
    margin: 0 auto;
    padding: 32px;
    font-size: 14px;
    margin: 50px auto;
    border-radius: 5px;

  ${mediaqueries.tablet`
    max-width: 526px;
    padding: 20px 20px;
  `};

  ${mediaqueries.phablet`
    border-radius: 0;
    padding: 35px 20px;
  `};
  }

  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;
    color: ${p => p.theme.mode.text};
    ${transitionColor};
    position: relative;
    padding-left: 30px;
    margin-bottom: 30px;

    li {
      position: relative;
      margin-bottom: 15px;

      ${mediaqueries.tablet`
          padding-left: 20px;
        `}

      p {
        ${mediaqueries.tablet`
          padding: 0;
        `}
      }
    }

    li > * {
      display: inline;
    }

    li::before {
      width: 3rem;
      display: inline-block;
      position: absolute;
      color: ${p => p.theme.colors.grey.mid};
    }
  }

  ul li::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 1.5rem;
    height: 8px;
    width: 8px;
    background: ${p => p.theme.mode.text};

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: 0.3rem;
    font-size: 2rem;

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  p {
    ${articleWidth};
    margin-bottom: 35px;
    line-height: 1.756;
    font-size: 18px;
    color: ${p => p.theme.mode.text};


    b {
      font-weight: 800;
    }
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 45px auto 85px;
    border-radius: 5px;

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `}
  }

  .image__container {
    text-align: center;
  }

  img.image__with_shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  img.image__regular {
    width: 100%;
    max-width: ${imageWidths.regular};

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
    `}
  }

  img.image__large {
    width: 100%;
    max-width: ${imageWidths.large};

    ${mediaqueries.tablet`
      border-radius: 0;
    `}
  }

  img.image__full {
    width: 100%;
    max-width: ${imageWidths.full};
    border-radius: 0;
  }

  table {
    ${articleWidth};
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #dfe3e8;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    color: ${p => p.theme.mode.text};
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
  }

  tr {
    &:hover {
      background-color: #f4f6f8;
    }
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #dfe3e8;
    vertical-align: top;
    white-space: nowrap;
  }

  hr {
    width: 250px;
    height: 1px;
    margin: 30px auto;
    opacity: 0.33;
  }

  .twitter-tweet {
    text-align: center;
    margin: 0 auto;
    padding: 20px 0 55px 0;
    width: 540px !important;
  }

  hr {
    ${articleWidth};
    position: relative;
    width: 100%;
    margin: 25px auto 60px;
    border: 0;
    height: 14.36px;
    background-image: url("${p => p.theme.mode.hr}");
    background-repeat: repeat-x;
    box-sizing: border-box;

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
      margin: 0px auto 50px;
    `};
  }
`;

const CallToActionLeftCorner = `
  <svg
    width="136"
    height="14"
    viewBox="0 0 136 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 13.5C0.723862 13.5 0.5 13.2761 0.5 13L0.500001 0.500001L135 0.500011C135.276 0.500011 135.5 0.723869 135.5 1.00001C135.5 1.27615 135.276 1.50001 135 1.50001L1.5 1.5L1.5 13C1.5 13.2761 1.27614 13.5 1 13.5Z"
      fill="url(#paint0_linear)"
      fill-opacity="0.8"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1.00003"
        y1="2.04348"
        x2="133.282"
        y2="2.04346"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
`;

const CallToActionRightCorner = `
  <svg
    width="121"
    height="14"
    viewBox="0 0 121 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M120 0C120.276 0 120.5 0.223858 120.5 0.5V13.5H1C0.723858 13.5 0.5 13.2761 0.5 13C0.5 12.7239 0.723858 12.5 1 12.5H119.5V0.5C119.5 0.223858 119.724 0 120 0Z"
      fill="url(#paint1_linear)"
      fill-opacity="0.8"
    />
    <defs>
      <linearGradient
        id="paint1_linear"
        x1="120"
        y1="13"
        x2="53.4407"
        y2="13"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
`;
