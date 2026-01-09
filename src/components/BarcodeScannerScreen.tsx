import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartStrip } from "./CartStrip";
import { X, Flashlight, FlashlightOff, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface BarcodeScannerScreenProps {
  onClose: () => void;
  onScanSuccess?: (barcode: string) => void;
  cartItemCount: number;
  cartTotal: number;
  onCartClick?: () => void;
}

interface InAppNotification {
  id: number;
  barcode: string;
}

export const BarcodeScannerScreen = ({ onClose, onScanSuccess, cartItemCount, cartTotal, onCartClick }: BarcodeScannerScreenProps) => {
  const [scanning, setScanning] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastScanRef = useRef<string>("");
  const lastScanTimeRef = useRef<number>(0);
  const notificationIdRef = useRef<number>(0);

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode("barcode-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 30,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.5
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

  const handleScanSuccess = (decodedText: string) => {
    const now = Date.now();
    const timeSinceLastScan = now - lastScanTimeRef.current;

    // Debounce: Ignore if same code scanned within 1.5 seconds
    if (decodedText === lastScanRef.current && timeSinceLastScan < 1500) {
      return;
    }

    lastScanRef.current = decodedText;
    lastScanTimeRef.current = now;

    // Success feedback
    setScanSuccess(true);
    
    // Haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Play beep sound
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

    // Show in-app notification
    const newNotification: InAppNotification = {
      id: ++notificationIdRef.current,
      barcode: decodedText
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after 2 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 2000);

    // Call success callback
    if (onScanSuccess) {
      onScanSuccess(decodedText);
    }

    // Reset success state after animation
    setTimeout(() => {
      setScanSuccess(false);
    }, 500);
  };

  const handleScanError = () => {
    // Silently ignore scan errors (no valid code detected)
  };

  const toggleTorch = async () => {
    if (scannerRef.current && torchSupported) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
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

  const handleManualEntry = () => {
    if (manualCode.trim()) {
      handleScanSuccess(manualCode.trim());
      setManualCode("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in" style={{ backgroundColor: 'rgba(33, 33, 33, 0.7)' }}>
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
        <h2 className="text-white text-sm font-semibold mt-8 mb-1" style={{ fontFamily: 'Montserrat' }}>
          Scan Bar Code
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-[10px] mb-6 px-4 text-center" style={{ fontFamily: 'Montserrat' }}>
          Point your camera at a bar code
        </p>

        {/* Scanner Frame */}
        <div 
          className={`relative rounded-lg overflow-hidden mx-4 transition-all duration-300 ${
            scanSuccess ? 'ring-2 ring-green-500' : ''
          }`}
          style={{ 
            width: '170px', 
            height: '100px',
            border: '2px dashed rgba(255, 255, 255, 0.5)'
          }}
        >
          {scanning && (
            <>
              <div id="barcode-reader" className="w-full h-full" />
              
              {/* Scanning Animation Line */}
              <div 
                className="absolute left-0 right-0 h-0.5 bg-green-400 animate-scan-line"
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
                Camera permission denied
              </p>
            </div>
          )}
        </div>

        {/* Manual Entry */}
        {permissionDenied && (
          <div className="mt-6 px-4 w-full">
            <p className="text-white/80 text-[9px] mb-2 text-center" style={{ fontFamily: 'Montserrat' }}>
              Enter barcode manually:
            </p>
            <div className="flex gap-2">
              <Input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Barcode"
                className="h-7 text-[10px] bg-white/10 border-white/30 text-white placeholder:text-white/50"
                style={{ fontFamily: 'Montserrat' }}
                onKeyDown={(e) => e.key === 'Enter' && handleManualEntry()}
              />
              <Button
                onClick={handleManualEntry}
                className="h-7 px-3 text-[10px]"
                style={{ fontFamily: 'Montserrat' }}
              >
                Add
              </Button>
            </div>
          </div>
        )}

        {/* In-App Notifications */}
        <div className="absolute top-10 left-2 right-2 flex flex-col gap-1 z-20">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="bg-white rounded-lg px-2 py-1.5 shadow-lg flex items-center gap-2 animate-fade-in"
              style={{ fontFamily: 'Montserrat' }}
            >
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-semibold text-gray-900">Product Added</p>
                <p className="text-[7px] text-gray-500 truncate">Barcode: {notification.barcode}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Strip at Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <CartStrip 
            itemCount={cartItemCount} 
            totalAmount={cartTotal} 
            onClick={onCartClick} 
          />
        </div>
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
        
        #barcode-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        
        #barcode-reader {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};