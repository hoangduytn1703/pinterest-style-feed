import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'portrait',
  });
  
  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait',
      });
    };
    
    // Khởi tạo
    updateDeviceInfo();
    
    // Cập nhật khi resize
    window.addEventListener('resize', updateDeviceInfo);
    
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);
  
  return deviceInfo;
} 