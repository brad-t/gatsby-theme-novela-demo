import React from "react";
import styled from "styled-components";

import Paginator from "@components/Navigation/Navigation.Paginator";

import mediaqueries from "@styles/media";

function ArticlesPagination({ pageContext }) {
  if (pageContext.pageCount <= 1) return null;

  return (
    <HorizontalRule>
      <Paginator {...pageContext} />
    </HorizontalRule>
  );
}

export default ArticlesPagination;

const HorizontalRule = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.25);
`;
