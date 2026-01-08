import { X, FlashlightOff, Flashlight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";

interface CardScannerScreenProps {
  onClose: () => void;
  onScanSuccess: (cardNumber: string) => void;
}

export const CardScannerScreen = ({ onClose, onScanSuccess }: CardScannerScreenProps) => {
  const [scanning, setScanning] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastScanRef = useRef<string>("");
  const lastScanTimeRef = useRef<number>(0);

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode("card-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 30,
          qrbox: { width: 220, height: 120 },
          aspectRatio: 1.8
        },
        handleScanSuccess,
        handleScanError
      );

      setScanning(true);

      // Check torch support
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) {
          setTorchSupported(true);
        }
        stream.getTracks().forEach(t => t.stop());
      } catch (e) {
        console.log("Torch check failed:", e);
      }
    } catch (error) {
      console.error("Scanner error:", error);
      setPermissionDenied(true);
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (error) {
        console.error("Error stopping scanner:", error);
      }
    }
  };

  const extractCardNumber = (scannedText: string): string => {
    // Extract only digits from the scanned text
    const digits = scannedText.replace(/\D/g, '');
    // Return up to 16 digits
    return digits.slice(0, 16);
  };

  const handleScanSuccess = async (decodedText: string) => {
    const now = Date.now();
    const timeSinceLastScan = now - lastScanTimeRef.current;

    // Debounce: Ignore if same code scanned within 1.5 seconds
    if (decodedText === lastScanRef.current && timeSinceLastScan < 1500) {
      return;
    }

    lastScanRef.current = decodedText;
    lastScanTimeRef.current = now;

    const cardNumber = extractCardNumber(decodedText);
    
    // Only proceed if we have a valid card number (at least 10 digits)
    if (cardNumber.length >= 10) {
      // Success feedback
      setScanSuccess(true);
      
      // Haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      // Play beep sound
      try {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.log("Audio not supported");
      }

      // Stop scanner and proceed
      await stopScanner();
      onScanSuccess(cardNumber);
    }
  };

  const handleScanError = () => {
    // Silently ignore scan errors (no valid code detected)
  };

  const toggleTorch = async () => {
    if (scannerRef.current && torchSupported) {
      try {
        await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "environment",
            // @ts-ignore - torch is not in standard types yet
            advanced: [{ torch: !torchEnabled }]
          } 
        });
        setTorchEnabled(!torchEnabled);
      } catch (error) {
        console.error("Torch error:", error);
      }
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 rounded-lg">
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 z-10 hover:bg-white/10"
          onClick={onClose}
        >
          <X className="w-4 h-4 text-white" />
        </Button>

        {/* Torch Toggle */}
        {torchSupported && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 h-6 w-6 z-10 hover:bg-white/10"
            onClick={toggleTorch}
          >
            {torchEnabled ? (
              <Flashlight className="w-4 h-4 text-yellow-400" />
            ) : (
              <FlashlightOff className="w-4 h-4 text-white" />
            )}
          </Button>
        )}

        {/* Title */}
        <h2 className="text-white text-sm font-semibold mt-10 mb-1" style={{ fontFamily: 'Montserrat' }}>
          Scan Gift Card
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-[10px] mb-6 px-4 text-center" style={{ fontFamily: 'Montserrat' }}>
          Point your camera at the card barcode
        </p>

        {/* Scanner Frame */}
        <div 
          className={`relative rounded-lg overflow-hidden mx-4 transition-all duration-300 ${
            scanSuccess ? 'ring-2 ring-green-500' : ''
          }`}
          style={{ 
            width: '160px', 
            height: '100px',
            border: '2px dashed rgba(255, 255, 255, 0.5)'
          }}
        >
          {scanning && (
            <>
              <div id="card-reader" className="w-full h-full" />
              
              {/* Scanning Animation Line */}
              <div 
                className="absolute left-0 right-0 h-0.5 bg-green-400"
                style={{
                  animation: 'scan-line 2s ease-in-out infinite',
                  boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)'
                }}
              />
            </>
          )}

          {permissionDenied && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
              <p className="text-white/80 text-[9px] text-center" style={{ fontFamily: 'Montserrat' }}>
                Camera permission denied. Please allow camera access.
              </p>
            </div>
          )}
        </div>

        {/* Helper Text */}
        <p className="text-white/60 text-[8px] mt-4 px-4 text-center" style={{ fontFamily: 'Montserrat' }}>
          Card will be added automatically once scanned
        </p>
      </div>

      {/* CSS for scanning animation */}
      <style>{`
        @keyframes scan-line {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        
        #card-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        
        #card-reader {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};