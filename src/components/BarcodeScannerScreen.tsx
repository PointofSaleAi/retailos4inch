import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BarcodeScannerScreenProps {
  onClose: () => void;
  onBarcodeScanned?: (barcode: string) => void;
}

export const BarcodeScannerScreen = ({ onClose, onBarcodeScanned }: BarcodeScannerScreenProps) => {
  // Simulate barcode scanning after 2 seconds for demo purposes
  const handleSimulateScann = () => {
    setTimeout(() => {
      const mockBarcode = "(0) 021 4548255";
      onBarcodeScanned?.(mockBarcode);
      onClose();
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-black/80 animate-fade-in"
      onClick={handleSimulateScann}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="h-10 w-10 text-white hover:bg-white/20"
        >
          <X size={24} strokeWidth={2} />
        </Button>
      </div>

      {/* Scanner Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 px-6">
        <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Scan Bar Code
        </h1>
        <p className="text-white/80 text-sm mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Point your camera at a bar code
        </p>

        {/* Scanner Frame */}
        <div 
          className="relative bg-white/10 rounded-lg p-4"
          style={{ width: '320px', height: '160px' }}
        >
          {/* Dashed Border */}
          <div 
            className="absolute inset-2 border-2 border-dashed border-white/50 rounded-lg"
          />
          
          {/* Barcode Placeholder */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-2">
                <svg width="280" height="80" viewBox="0 0 280 80" fill="none">
                  {/* Barcode lines */}
                  {[...Array(40)].map((_, i) => {
                    const width = Math.random() > 0.5 ? 4 : 2;
                    const height = 60;
                    return (
                      <rect
                        key={i}
                        x={i * 7}
                        y={10}
                        width={width}
                        height={height}
                        fill="black"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="text-white/60 text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                (0) 021 4548255
              </div>
            </div>
          </div>

          {/* Scanning Line Animation */}
          <div 
            className="absolute left-2 right-2 h-0.5 bg-red-500 animate-scan"
            style={{ top: '20%' }}
          />
        </div>
      </div>
    </div>
  );
};
