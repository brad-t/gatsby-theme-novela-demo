import React, { useState, useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";

import HandleOverlap from "./Article.HandleOverlap";

import mediaqueries from "@styles/media";
import { clamp } from "@utils";

interface AsideProps {
  children: ReactNode[] | ReactNode;
  right?: boolean;
  height: number;
  offset: number;
}

/**
 * Aside: the wonderful fixed positioned elements that are to the left
 * and the right of the written content on our articles. For example, the
 * progress bar and dark controls are within an Aside. The main responsibility
 * of this component is to show or hide its children if it's at the top or bottom
 * of the page!
 *
 * The left and right Asides!
 *
 * left Aside ----> |  content  | <--- right Aside
 *                  |  content  |
 *                  |  content  |
 *                  |  content  |
 *
 */
function Aside({ offset, height, children, right }: AsideProps) {
  const asideRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [imageOffset, setImageOffset] = useState<number>(0);
  const [shouldFixAside, setShouldFixAside] = useState<boolean>(false);

  const show = progress > -500 && progress < 100.2;

  useEffect(() => {
    const imageRect = document
      .getElementById("ArticleImage__Hero")
      .getBoundingClientRect();
    const imageOffsetFromTopOfWindow = imageRect.top + window.pageYOffset;

    setImageOffset(imageOffsetFromTopOfWindow);

    const handleScroll = (event: Event) => {
      const el = asideRef.current;
      const top = el.getBoundingClientRect().top;
      const height = el.offsetHeight;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const shouldFix = top + height / 2 <= windowHeight / 2;
      setShouldFixAside(shouldFix);
      const percentComplete =
        ((window.scrollY - offset) / (height - offset)) * 100;

      // setProgress(clamp(+percentComplete.toFixed(2), -500, 105));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [offset, height]);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { show }),
  );

  return (
    <Frame right={right}>
      <Align
        show={show}
        imageOffset={imageOffset}
        shouldFixAside={shouldFixAside}
      >
        <div ref={asideRef}>
          <HandleOverlap>{childrenWithProps}</HandleOverlap>
        </div>
      </Align>
    </Frame>
  );
}

export default Aside;

const Frame = styled.aside`
  display: flex;
  margin: 0 auto;
  max-width: 1140px;

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const Align = React.memo(styled.div`
  position: ${p => (p.shouldFixAside ? "fixed" : "absolute")};
  display: flex;
  transform: translateY(0px);
  top: ${p => (p.shouldFixAside ? 0 : p.imageOffset)}px;
  align-items: ${p => (p.shouldFixAside ? "center" : "flex-start")};
  height: 100vh;
  z-index: 3;

  opacity: ${p => (p.show ? 1 : 0)};
  visibility: ${p => (p.show ? "visible" : "hidden")};
  transition: ${p =>
    p.show
      ? "opacity 0.4s linear, visibility 0.4s linear"
      : "opacity 0.2s linear, visibility 0.4s linear"};
`);
