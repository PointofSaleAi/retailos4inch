import { useState, useRef, useEffect } from "react";
import iconBackArrow from "@/assets/icon-back-arrow-new.png";

interface CameraCaptureScreenProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

export const CameraCaptureScreen = ({ onCapture, onBack }: CameraCaptureScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 198, height: 250 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Unable to access camera");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleUsePhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  const handleBack = () => {
    stopCamera();
    onBack();
  };

  return (
    <div className="h-full flex flex-col bg-black" style={{ fontFamily: 'Montserrat' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-3 py-2 bg-black/80">
        <button onClick={handleBack} className="p-1">
          <img src={iconBackArrow} alt="" className="w-3.5 h-3.5 invert" />
        </button>
        <h1 className="font-semibold text-white" style={{ fontSize: '12px' }}>
          {capturedImage ? 'Preview' : 'Take Photo'}
        </h1>
      </div>

      {/* Camera / Preview Area */}
      <div className="flex-1 flex items-center justify-center bg-black overflow-hidden">
        {error ? (
          <div className="text-white text-center px-4" style={{ fontSize: '11px' }}>
            {error}
          </div>
        ) : capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 bg-black/80 px-4 py-4">
        {capturedImage ? (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleRetake}
              className="px-5 py-2 rounded-full bg-white/20 text-white font-medium"
              style={{ fontSize: '11px' }}
            >
              Retake
            </button>
            <button
              onClick={handleUsePhoto}
              className="px-5 py-2 rounded-full bg-white text-black font-medium"
              style={{ fontSize: '11px' }}
            >
              Use Photo
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              onClick={handleCapture}
              className="w-14 h-14 rounded-full bg-white border-4 border-white/30 flex items-center justify-center"
              disabled={!stream}
            >
              <div className="w-11 h-11 rounded-full bg-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
