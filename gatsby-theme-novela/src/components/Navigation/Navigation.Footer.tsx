import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
// import { Link } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";
// import Logo from "@components/Logo";

import mediaqueries from "@styles/media";

const siteQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`;

function Footer() {
  const results = useStaticQuery(siteQuery);
  const name = results.site.edges[0].node.siteMetadata.name;

  return (
    <>
      <FooterGradient />
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>
            © {new Date().getFullYear()} {name}
          </FooterText>
          <div>
            <SocialLinks />
          </div>
        </FooterContainer>
      </Section>
    </>
  );
}

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 80px;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.tablet`
    flex-direction: column;
    padding-bottom: 100px;
  `}
`;

const HoritzontalRule = styled.div`
  position: relative;
  margin: 140px auto 50px;
  border-bottom: 1px solid ${p => p.theme.colors.horizontalRule};

  ${mediaqueries.tablet`
    margin: 60px auto;
  `}
`;

const FooterText = styled.div`
  ${mediaqueries.tablet`
    margin-bottom: 80px;
  `}
`;

const FooterGradient = styled.div`
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
