import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import { clamp } from "@utils";

export interface IProgress {
  height: number;
  offset: number;
}

function Progress({ offset, height }: IProgress) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const percentComplete =
        ((window.scrollY - offset) / (height - offset)) * 100;

      setProgress(clamp(+percentComplete.toFixed(2), -2, 104));
    }, 20);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [offset, height]);

  return (
    <Frame tabIndex={-1}>
      <Trackline aria-hidden="true">
        <ProgressLine style={{ transform: `translateY(${progress}%)` }} />
      </Trackline>
    </Frame>
  );
}

export default Progress;

const Frame = styled.div`
  position: relative;
  outline: none;
  user-select: none;
`;

const Trackline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(88vh - 40px);
  max-height: 425px;
  width: 1px;
  background-color: grey;
  overflow: hidden;
`;

const ProgressLine = styled.div`
  position: absolute;
  height: 100%;
  top: -100%;
  width: 1px;
  background-color: black;
  left: 0;
`;
