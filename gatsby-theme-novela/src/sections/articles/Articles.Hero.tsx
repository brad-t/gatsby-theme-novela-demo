import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

import Section from "@components/Section";
import Heading from "@components/Heading";
import Media from "@components/Media/Media.Img";

import mediaqueries from "@styles/media";

import { GridLayoutContext } from "./Articles.Grid.Context";

const authorQuery = graphql`
  {
    author: allAuthorsYaml(filter: { featured: { eq: true } }) {
      edges {
        node {
          bio
          id
          name
          avatar {
            image: childImageSharp {
              fluid(maxWidth: 100, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    site: allSite {
      edges {
        node {
          siteMetadata {
            description
          }
        }
      }
    }
  }
`;

function ArticlesHero() {
  const { gridLayout, hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(authorQuery);
  const author = results.author.edges[0].node;
  const siteMetadata = results.site.edges[0].node.siteMetadata;

  return (
    <Section relative>
      <HeadingContainer>
        <Heading.h1>{siteMetadata.description}</Heading.h1>
      </HeadingContainer>
      <SubheadingContainer>
        <BioContainer>
          <BioAvatar>
            <BioAvatarInner>
              <Media src={author.avatar.image.fluid} />
            </BioAvatarInner>
          </BioAvatar>
          <BioText>{author.bio}</BioText>
        </BioContainer>
        <GridControlsContainer>
          <GridButton onClick={() => setGridLayout("tiles")}>
            <TilesIcon active={hasSetGridLayout && gridLayout === "tiles"} />
          </GridButton>
          <GridButton onClick={() => setGridLayout("rows")}>
            <RowsIcon active={hasSetGridLayout && gridLayout === "rows"} />
          </GridButton>
        </GridControlsContainer>
      </SubheadingContainer>
    </Section>
  );
}

export default ArticlesHero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  ${mediaqueries.phablet`
    display: none;
  `}
`;

const BioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BioAvatar = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  margin: 10px 26px 10px 10px;

  &::after {
    content: "";
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
`;

const BioAvatarInner = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  overflow: hidden;
`;

const BioText = styled.p`
  max-width: 430px;
  font-size: 14px;
  color: #73737d;
`;

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: none;
  `};
`;

const HeadingContainer = styled.div`
  max-width: 652px;
  margin: 100px 0;
`;

const GridButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
`;

const TilesIcon = ({ active }: { active: boolean }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.33337 13.8424H12.0371V5.4165H4.33337V13.8424ZM4.33337 20.5832H12.0371V15.5276H4.33337V20.5832ZM13.963 20.5832H21.6667V12.1572H13.963V20.5832ZM13.963 5.4165V10.4721H21.6667V5.4165H13.963Z"
      fill={active ? "black" : "#D6D6D6"}
    />
  </svg>
);

const RowsIcon = ({ active }: { active: boolean }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.33331 15.1665H8.41174V10.8332H4.33331V15.1665ZM4.33331 20.5832H8.41174V16.2498H4.33331V20.5832ZM4.33331 9.74984H8.41174V5.4165H4.33331V9.74984ZM9.43135 15.1665H21.6666V10.8332H9.43135V15.1665ZM9.43135 20.5832H21.6666V16.2498H9.43135V20.5832ZM9.43135 5.4165V9.74984H21.6666V5.4165H9.43135Z"
      fill={active ? "black" : "#D6D6D6"}
    />
  </svg>
);
