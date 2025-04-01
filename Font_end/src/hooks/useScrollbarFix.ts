import { useEffect, useState } from "react";

const useScrollbarFix = () => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const updateScrollbarWidth = () => {
      const width = window.innerWidth - document.documentElement.clientWidth;
      setScrollbarWidth(width);
      document.body.style.paddingRight = width > 0 ? `${width}px` : "0px";
    };

    updateScrollbarWidth(); // Gọi ngay khi component mount
    window.addEventListener("resize", updateScrollbarWidth);

    return () => {
      document.body.style.paddingRight = "0px"; // Reset khi unmount
      window.removeEventListener("resize", updateScrollbarWidth);
    };
  }, []);

  return scrollbarWidth;
};

export default useScrollbarFix;
