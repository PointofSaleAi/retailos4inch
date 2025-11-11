import { ReactNode } from "react";

interface RetailDeviceProps {
  children: ReactNode;
}

export const RetailDevice = ({ children }: RetailDeviceProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 sm:p-4 p-0">
      <div className="retail-device bg-background shadow-xl relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};