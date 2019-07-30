import React from "react";
import styled from "@emotion/styled";

import Navigation from "@components/Navigation/Navigation.Header";

import mediaqueries from "@styles/media";

function LayoutContainer(props) {
  return (
    <SiteContainer>
      <Navigation />
      {props.children}
    </SiteContainer>
  );
}

export default LayoutContainer;

const SiteContainer = styled.div`
  background: ${p => p.theme.colors.background};
`;
