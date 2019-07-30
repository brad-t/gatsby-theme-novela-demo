import React from "react";
import styled from "@emotion/styled";

import Footer from "@components/Navigation/Navigation.Footer";
import Section from "@components/Section";

function ArticlesFooter() {
  // const { seo } = data.allContentfulPage.edges[0].node
  return (
    <>
      <Section narrow>
        <HoritzontalRule />
      </Section>
      <Footer />
    </>
  );
}

export default ArticlesFooter;

const HoritzontalRule = styled.div`
  margin: 140px auto 50px;
  border-bottom: 1px solid rgba(8, 8, 11, 0.15);
`;
