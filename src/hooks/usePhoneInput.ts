import { useState, useCallback } from 'react';

export interface CountryOption {
  code: string;
  flag: string;
  name: string;
}

export const countryOptions: CountryOption[] = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
];

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Format based on length
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\(\d{3}\)\s\d{3}\s\d{4}$/;
  return phoneRegex.test(phone);
};

export const usePhoneInput = (initialValue: string = "", initialCountryCode: string = "+1") => {
  const [phone, setPhone] = useState(initialValue);
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [countryFlag, setCountryFlag] = useState(
    countryOptions.find(c => c.code === initialCountryCode)?.flag || "🇺🇸"
  );

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  }, []);

  const handleCountryChange = useCallback((code: string, flag: string) => {
    setCountryCode(code);
    setCountryFlag(flag);
  }, []);

  const isValid = validatePhoneNumber(phone);

  return {
    phone,
    setPhone,
    countryCode,
    countryFlag,
    handlePhoneChange,
    handleCountryChange,
    isValid,
  };
};
