import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import iconClose from "@/assets/icon-close.png";

interface BarcodeScannerScreenProps {
  onClose: () => void;
  onBarcodeScanned?: (barcode: string) => void;
}

export const BarcodeScannerScreen = ({ onClose, onBarcodeScanned }: BarcodeScannerScreenProps) => {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Simulate barcode scan after 3 seconds
    const timer = setTimeout(() => {
      const mockBarcode = "(0) 021 45478255";
      onBarcodeScanned?.(mockBarcode);
      setIsScanning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onBarcodeScanned]);

  return (
    <div className="h-full flex flex-col bg-[#2C2C2C] relative animate-fade-in">
      {/* Close Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 h-8 w-8 z-10 hover:bg-white/10"
        onClick={onClose}
      >
        <img src={iconClose} alt="Close" className="w-5 h-5 invert" />
      </Button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6">
        <h1 className="text-white text-lg font-bold mb-2" style={{ fontFamily: 'Montserrat' }}>
          Scan Bar Code
        </h1>
        <p className="text-white/70 text-[11px] mb-8" style={{ fontFamily: 'Montserrat' }}>
          Point your camera at a bar code
        </p>

        {/* Scanner Frame */}
        <div className="relative w-[156px] h-[100px] border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center bg-white/5">
          {isScanning && (
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="scanner-line" />
            </div>
          )}
          
          {/* Barcode */}
          <div className="flex flex-col items-center">
            <svg 
              width="140" 
              height="60" 
              viewBox="0 0 140 60" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mb-1"
            >
              {/* Barcode bars */}
              <rect x="2" width="2" height="60" fill="black"/>
              <rect x="6" width="1" height="60" fill="black"/>
              <rect x="9" width="3" height="60" fill="black"/>
              <rect x="14" width="1" height="60" fill="black"/>
              <rect x="17" width="2" height="60" fill="black"/>
              <rect x="21" width="1" height="60" fill="black"/>
              <rect x="24" width="3" height="60" fill="black"/>
              <rect x="29" width="2" height="60" fill="black"/>
              <rect x="33" width="1" height="60" fill="black"/>
              <rect x="36" width="2" height="60" fill="black"/>
              <rect x="40" width="3" height="60" fill="black"/>
              <rect x="45" width="1" height="60" fill="black"/>
              <rect x="48" width="2" height="60" fill="black"/>
              <rect x="52" width="1" height="60" fill="black"/>
              <rect x="55" width="3" height="60" fill="black"/>
              <rect x="60" width="2" height="60" fill="black"/>
              <rect x="64" width="1" height="60" fill="black"/>
              <rect x="67" width="2" height="60" fill="black"/>
              <rect x="71" width="3" height="60" fill="black"/>
              <rect x="76" width="1" height="60" fill="black"/>
              <rect x="79" width="2" height="60" fill="black"/>
              <rect x="83" width="1" height="60" fill="black"/>
              <rect x="86" width="3" height="60" fill="black"/>
              <rect x="91" width="2" height="60" fill="black"/>
              <rect x="95" width="1" height="60" fill="black"/>
              <rect x="98" width="2" height="60" fill="black"/>
              <rect x="102" width="3" height="60" fill="black"/>
              <rect x="107" width="1" height="60" fill="black"/>
              <rect x="110" width="2" height="60" fill="black"/>
              <rect x="114" width="1" height="60" fill="black"/>
              <rect x="117" width="3" height="60" fill="black"/>
              <rect x="122" width="2" height="60" fill="black"/>
              <rect x="126" width="1" height="60" fill="black"/>
              <rect x="129" width="2" height="60" fill="black"/>
              <rect x="133" width="1" height="60" fill="black"/>
              <rect x="136" width="2" height="60" fill="black"/>
            </svg>
            <span className="text-[10px] text-black/60" style={{ fontFamily: 'Montserrat' }}>
              (0) 021 45478255
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
