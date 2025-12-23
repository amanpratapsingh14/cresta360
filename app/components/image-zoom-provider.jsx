"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import Image from "next/image";

const ImageZoomContext = createContext({
  show: () => {},
  hide: () => {},
});

export const useImageZoom = () => useContext(ImageZoomContext);

export default function ImageZoomProvider({ children }) {
  const [zoomed, setZoomed] = useState(null);

  const show = useCallback((payload) => {
    setZoomed(payload);
  }, []);

  const hide = useCallback(() => {
    setZoomed(null);
  }, []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ImageZoomContext.Provider value={value}>
      {children}
      <div className={`image-zoom ${zoomed ? "is-visible" : ""}`} aria-hidden={zoomed ? "false" : "true"}>
        {zoomed && (
          <div className="image-zoom__media">
            <Image
              src={zoomed.src}
              alt={zoomed.alt || ""}
              width={zoomed.width}
              height={zoomed.height}
              sizes="10vw"
              className="image-zoom__img"
            />
          </div>
        )}
        <div className="image-zoom__backdrop" />
      </div>
    </ImageZoomContext.Provider>
  );
}
