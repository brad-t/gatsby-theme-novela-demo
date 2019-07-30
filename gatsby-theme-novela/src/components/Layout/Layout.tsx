import React from "react";
import { ThemeProvider } from "theme-ui";
import { Global } from "@emotion/core";

import Container from "@components/Layout/Layout.Container";

import { globalStyles, theme } from "@styles";

interface LayoutProps {
  background?: string;
  nav: {
    fixed?: boolean;
    offset?: boolean;
    theme?: string;
  };
  footer: {
    visible?: boolean;
    theme?: string;
  };
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
function Layout({ children, ...rest }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Global styles={globalStyles} />
        <Container {...rest}>{children}</Container>
      </>
    </ThemeProvider>
  );
}

export default Layout;
