import React, { createContext, useState, useEffect } from "react";
import { IArticleNode } from "@typings";

interface GridLayoutProviderProps {
  children: React.ReactChild;
  articles: IArticleNode[];
}

export const GridLayoutContext = createContext({
  gridLayout: "tiles",
  hasSetGridLayout: false,
  setGridLayout: (tile: string) => {},
});

function GridLayoutProvider({ children, articles }: GridLayoutProviderProps) {
  const initialLayout = articles.length === 1 ? "rows" : "tiles";

  const [gridLayout, setGridLayout] = useState<string>(initialLayout);
  const [hasSetGridLayout, setHasSetGridLayout] = useState<boolean>(false);

  function setGridLayoutAndSave(tile: string) {
    localStorage.setItem("gridLayout", tile);
    setGridLayout(tile);
  }

  useEffect(() => {
    setGridLayout(localStorage.getItem("gridLayout"));
    setHasSetGridLayout(true);
  }, []);

  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout,
        hasSetGridLayout,
        setGridLayout: setGridLayoutAndSave,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
}

export default GridLayoutProvider;
