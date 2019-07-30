import React, { Component } from "react";
import styled from "@emotion/styled";
import { navigate } from "gatsby";

import Navigation from "@components/Navigation/Navigation.Header";
import Footer from "@components/Navigation/Navigation.Footer";

import { ExIcon } from "../../icons/ui";

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

const SiteContainer = styled.div``;
