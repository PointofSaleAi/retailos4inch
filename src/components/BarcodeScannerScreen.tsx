import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BarcodeScannerScreenProps {
  onClose: () => void;
}

export const BarcodeScannerScreen = ({ onClose }: BarcodeScannerScreenProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className="relative bg-black/90 rounded-lg flex flex-col items-center justify-start overflow-hidden"
        style={{ 
          width: '198px', 
          height: '330px'
        }}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 z-10 hover:bg-white/10"
          onClick={onClose}
        >
          <X className="w-4 h-4 text-white" />
        </Button>

        {/* Title */}
        <h2 className="text-white text-sm font-semibold mt-8 mb-1" style={{ fontFamily: 'Montserrat' }}>
          Scan Bar Code
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-[10px] mb-6 px-4 text-center" style={{ fontFamily: 'Montserrat' }}>
          Point your camera at a bar code
        </p>

        {/* Scanner Frame */}
        <div 
          className="relative bg-white/10 rounded-lg flex items-center justify-center mx-4"
          style={{ 
            width: '170px', 
            height: '100px',
            border: '2px dashed rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Barcode Placeholder */}
          <div className="flex flex-col items-center">
            <svg 
              width="140" 
              height="50" 
              viewBox="0 0 280 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Barcode lines */}
              <rect x="0" y="0" width="4" height="80" fill="black"/>
              <rect x="8" y="0" width="2" height="80" fill="black"/>
              <rect x="14" y="0" width="6" height="80" fill="black"/>
              <rect x="24" y="0" width="2" height="80" fill="black"/>
              <rect x="30" y="0" width="4" height="80" fill="black"/>
              <rect x="38" y="0" width="2" height="80" fill="black"/>
              <rect x="44" y="0" width="8" height="80" fill="black"/>
              <rect x="56" y="0" width="2" height="80" fill="black"/>
              <rect x="62" y="0" width="4" height="80" fill="black"/>
              <rect x="70" y="0" width="6" height="80" fill="black"/>
              <rect x="80" y="0" width="2" height="80" fill="black"/>
              <rect x="86" y="0" width="4" height="80" fill="black"/>
              <rect x="94" y="0" width="2" height="80" fill="black"/>
              <rect x="100" y="0" width="6" height="80" fill="black"/>
              <rect x="110" y="0" width="2" height="80" fill="black"/>
              <rect x="116" y="0" width="8" height="80" fill="black"/>
              <rect x="128" y="0" width="4" height="80" fill="black"/>
              <rect x="136" y="0" width="2" height="80" fill="black"/>
              <rect x="142" y="0" width="6" height="80" fill="black"/>
              <rect x="152" y="0" width="2" height="80" fill="black"/>
              <rect x="158" y="0" width="4" height="80" fill="black"/>
              <rect x="166" y="0" width="2" height="80" fill="black"/>
              <rect x="172" y="0" width="8" height="80" fill="black"/>
              <rect x="184" y="0" width="2" height="80" fill="black"/>
              <rect x="190" y="0" width="6" height="80" fill="black"/>
              <rect x="200" y="0" width="4" height="80" fill="black"/>
              <rect x="208" y="0" width="2" height="80" fill="black"/>
              <rect x="214" y="0" width="6" height="80" fill="black"/>
              <rect x="224" y="0" width="2" height="80" fill="black"/>
              <rect x="230" y="0" width="4" height="80" fill="black"/>
              <rect x="238" y="0" width="8" height="80" fill="black"/>
              <rect x="250" y="0" width="2" height="80" fill="black"/>
              <rect x="256" y="0" width="4" height="80" fill="black"/>
              <rect x="264" y="0" width="6" height="80" fill="black"/>
              <rect x="274" y="0" width="6" height="80" fill="black"/>
            </svg>
            <p className="text-white/60 text-[9px] mt-2" style={{ fontFamily: 'Montserrat' }}>
              (0) 021 45478255
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};