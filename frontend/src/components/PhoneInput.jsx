import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const COUNTRIES = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', length: 10 },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', length: 10 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', length: 10 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', length: 10 },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', length: 9 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', length: 9 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', length: 9 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', length: 8 },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', length: 10 },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', length: 10 },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', length: 10 },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', length: 11 },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', length: 9 },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', length: 9 }
];

export const detectCountry = (val) => {
  if (!val) return COUNTRIES[0]; // default to India
  // Sort COUNTRIES by dialCode length descending to match longest dial codes first
  const sorted = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
  const found = sorted.find(c => val.startsWith(c.dialCode));
  return found || COUNTRIES[0];
};

export const isValidMobile = (mobile) => {
  if (!mobile) return false;
  const country = detectCountry(mobile);
  const local = mobile.slice(country.dialCode.length);
  return local.length === country.length && /^\d+$/.test(local);
};

export const PhoneInput = ({ 
  label = 'Mobile Number', 
  value = '', 
  onChange, 
  error = '', 
  required = true,
  placeholder = 'Enter mobile number',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('IN');
  const dropdownRef = useRef(null);

  // Sync selected country code when value changes from outside (e.g. initial load or form edit reset)
  useEffect(() => {
    if (value) {
      const detected = detectCountry(value);
      setSelectedCountryCode(detected.code);
    }
  }, [value]);

  const selectedCountry = COUNTRIES.find(c => c.code === selectedCountryCode) || COUNTRIES[0];
  const localNumber = value.startsWith(selectedCountry.dialCode)
    ? value.slice(selectedCountry.dialCode.length)
    : value;

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleCountrySelect = (country) => {
    setIsOpen(false);
    setSelectedCountryCode(country.code);
    const truncatedLocal = localNumber.slice(0, country.length);
    if (truncatedLocal === '') {
      onChange('');
    } else {
      onChange(country.dialCode + truncatedLocal);
    }
  };

  const handleNumberChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // strip non-digits
    const truncatedVal = rawVal.slice(0, selectedCountry.length);
    if (truncatedVal === '') {
      onChange('');
    } else {
      onChange(selectedCountry.dialCode + truncatedVal);
    }
  };

  return (
    <div className={`space-y-1.5 w-full relative ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          {label}
        </label>
      )}
      <div className="relative flex items-stretch rounded-2xl bg-[#0f1219]/40 border border-white/10 focus-within:border-accent/60 transition-all overflow-visible">
        {/* Country Selector Dropdown Trigger */}
        <div className="relative flex items-center" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-4 h-full text-sm text-white hover:bg-white/5 rounded-l-2xl border-r border-white/10 transition-all cursor-pointer focus:outline-none"
          >
            <span className="text-base select-none">{selectedCountry.flag}</span>
            <span className="font-semibold text-slate-300">{selectedCountry.dialCode}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown List */}
          {isOpen && (
            <div className="absolute top-[105%] left-0 w-64 bg-[#0f1219] border border-white/10 rounded-2xl shadow-2xl z-[999] max-h-60 overflow-y-auto custom-scrollbar py-1">
              {COUNTRIES.map((c) => (
                <button
                  key={`${c.code}-${c.dialCode}`}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs hover:bg-white/10 transition-colors focus:outline-none ${selectedCountry.code === c.code ? 'bg-white/5 font-bold text-accent' : 'text-slate-300'}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm select-none">{c.flag}</span>
                    <span>{c.name}</span>
                  </span>
                  <span className="text-slate-500 font-mono">{c.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Local Number Input */}
        <input
          type="tel"
          required={required}
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={`${placeholder} (${selectedCountry.length} digits)`}
          className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none w-full"
        />
      </div>
      {error && (
        <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 ml-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
};
