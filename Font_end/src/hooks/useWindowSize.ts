import { useState, useEffect } from "react";
import { DeviceType } from "../utils/constants";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    deviceType: getDeviceType(window.innerWidth),
    isMobile: false,
    isDesktop: false,
    isTablet: false,

  });

  function getDeviceType(width: number) {
    if (width < 640) return DeviceType.Mobile; // Nhỏ hơn 640px => Mobile
    if (width < 1024) return DeviceType.Tablet; // 640px - 1023px => Tablet
    return DeviceType.Desktop; // Lớn hơn 1024px => Desktop
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        deviceType: getDeviceType(window.innerWidth),
        isMobile: getDeviceType(window.innerWidth) === DeviceType.Mobile,
        isDesktop: getDeviceType(window.innerWidth) === DeviceType.Desktop,
        isTablet: getDeviceType(window.innerWidth) === DeviceType.Tablet,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize; // Trả về cả width, height và deviceType
};

export default useWindowSize;
