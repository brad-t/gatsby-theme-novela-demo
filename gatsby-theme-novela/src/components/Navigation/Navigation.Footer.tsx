import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// import { Link } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";
// import Logo from "@components/Logo";

// import mediaqueries from "@styles/media";

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
    <Section narrow>
      <FooterContainer>
        <div>
          © {new Date().getFullYear()} {name}
        </div>
        <div>
          <SocialLinks />
        </div>
      </FooterContainer>
    </Section>
  );
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 70px;
  color: #73737d;
`;
