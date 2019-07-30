import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import Section from "@components/Section";
import Logo from "@components/Logo";

import mediaqueries from "@styles/media";

function NavigationHeader(params) {
  return (
    <Section>
      <NavContainer>
        <Link to="/">
          <Logo />
        </Link>
        <div>Nav</div>
      </NavContainer>
    </Section>
  );
}

export default NavigationHeader;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;

  ${mediaqueries.desktop_medium`
    padding-top: 50px;
  `};

  @media screen and (max-height: 800px) {
    padding-top: 50px;
  }
`;
