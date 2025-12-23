"use client";

import Link from "next/link";
import { useCallback } from "react";

export default function SmoothLink({ href = "#", children, onClick, ...rest }) {
  const handleClick = useCallback(
    (event) => {
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }

      if (onClick) {
        onClick(event);
      }
    },
    [href, onClick],
  );

  return (
    <Link href={href} scroll={false} {...rest} onClick={handleClick}>
      {children}
    </Link>
  );
}
