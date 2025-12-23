"use client";

import Image from "next/image";
import { useImageZoom } from "./image-zoom-provider";

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) {
  const { show, hide } = useImageZoom();

  const handleEnter = (event) => {
    onMouseEnter?.(event);
    show({ src, alt, width, height });
  };

  const handleLeave = (event) => {
    onMouseLeave?.(event);
    hide();
  };

  const handleFocus = (event) => {
    onFocus?.(event);
    show({ src, alt, width, height });
  };

  const handleBlur = (event) => {
    onBlur?.(event);
    hide();
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}
