import React from "react";
import styled from "@emotion/styled";

import Footer from "@components/Navigation/Navigation.Footer";
import Section from "@components/Section";

function ArticlesFooter() {
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
  border-bottom: 1px solid ${p => p.theme.colors.horizontalRule};
`;
