/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";
export type OrientationType = "portrait" | "landscape";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  deviceType: DeviceType;
  orientation: OrientationType;
  width: number;
  height: number;
}

const defaultDeviceInfo: DeviceInfo = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  hasTouch: false,
  deviceType: "desktop",
  orientation: "landscape",
  width: 1200,
  height: 800,
};

const DeviceContext = createContext<DeviceInfo>(defaultDeviceInfo);

function detectDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return defaultDeviceInfo;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const orientation: OrientationType =
    height >= width ? "portrait" : "landscape";

  const userAgent = navigator.userAgent || "";
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTabletUserAgent = /iPad|Tablet|PlayBook|Silk/i.test(userAgent);

  const hasTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error msMaxTouchPoints is a legacy property
    navigator.msMaxTouchPoints > 0;

  // Viewport breakpoint analysis
  let deviceType: DeviceType = "desktop";
  if (width < 768 || (isMobileUserAgent && width < 900)) {
    deviceType = "mobile";
  } else if (width < 1024 || isTabletUserAgent) {
    deviceType = "tablet";
  } else {
    deviceType = "desktop";
  }

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isDesktop = deviceType === "desktop";

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasTouch,
    deviceType,
    orientation,
    width,
    height,
  };
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(detectDeviceInfo);

  useEffect(() => {
    function updateDevice() {
      const info = detectDeviceInfo();
      setDeviceInfo(info);

      // Dynamically apply device attribute to <html> so CSS and Tailwind can adapt
      const root = document.documentElement;
      root.setAttribute("data-device", info.deviceType);
      root.setAttribute("data-touch", info.hasTouch ? "true" : "false");
      root.setAttribute("data-orientation", info.orientation);

      if (info.isMobile) {
        root.classList.add("device-mobile");
        root.classList.remove("device-desktop", "device-tablet");
      } else if (info.isTablet) {
        root.classList.add("device-tablet");
        root.classList.remove("device-mobile", "device-desktop");
      } else {
        root.classList.add("device-desktop");
        root.classList.remove("device-mobile", "device-tablet");
      }
    }

    updateDevice();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDevice, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", updateDevice);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updateDevice);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice(): DeviceInfo {
  const context = useContext(DeviceContext);
  if (!context) {
    return detectDeviceInfo();
  }
  return context;
}

export function useIsMobile(): boolean {
  const { isMobile } = useDevice();
  return isMobile;
}
