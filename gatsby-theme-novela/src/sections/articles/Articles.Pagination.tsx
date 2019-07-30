import React from "react";

import Paginator from "@components/Navigation/Navigation.Paginator";

function ArticlesPagination({ pageContext }) {
  if (pageContext.pageCount <= 1) return null;

  return <Paginator {...pageContext} />;
}

export default ArticlesPagination;
