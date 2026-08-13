"use client";

import { useEffect, useRef } from "react";

type ClickOutsideProps = {
  children: React.ReactNode;
  onClickOutside: () => void;
};

export default function ClickOutside({
  children,
  onClickOutside,
}: ClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClickOutside]);

  return <div ref={ref}>{children}</div>;
}