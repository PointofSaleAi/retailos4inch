import { Button } from "@/components/ui/button";

interface BarcodeScannerScreenProps {
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export const BarcodeScannerScreen = ({ onClose, onScan }: BarcodeScannerScreenProps) => {
  const handleScan = () => {
    // Simulate barcode scan - in production, this would use actual camera API
    const mockBarcode = "0021454782255";
    onScan(mockBarcode);
    onClose();
  };

  return (
    <div className="h-full w-full bg-black/80 flex flex-col animate-fade-in">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10 text-white hover:bg-white/10"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>

      {/* Scanner Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-8">
        <h1 className="text-white text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Scan Bar Code
        </h1>
        <p className="text-white/80 text-sm mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Point your camera at a bar code
        </p>

        {/* Scanner Frame */}
        <div className="relative w-full max-w-[340px] aspect-[4/3] mb-8">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              border: '2px dashed rgba(255, 255, 255, 0.5)',
              borderRadius: '12px',
            }}
          >
            {/* Barcode Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-white rounded px-8 py-12 flex flex-col items-center">
                {/* Simulated barcode lines */}
                <div className="flex gap-[2px] mb-3">
                  {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 3, 1, 2, 1, 3].map((width, idx) => (
                    <div
                      key={idx}
                      className="bg-black"
                      style={{
                        width: `${width * 2}px`,
                        height: '80px',
                      }}
                    />
                  ))}
                </div>
                <span className="text-black text-sm font-mono" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  (0) 021 45478255
                </span>
              </div>
            </div>
          </div>

          {/* Scanning line animation */}
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
            <div
              className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Instructions or Scan Button */}
        <Button
          onClick={handleScan}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Simulate Scan
        </Button>
      </div>
    </div>
  );
};
