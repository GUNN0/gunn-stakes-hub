import { useState, useEffect } from "react";

interface CountryInfo {
  countryCode: string;
  countryName: string;
  loading: boolean;
  error: string | null;
}

export const useUserCountry = (): CountryInfo => {
  const [countryCode, setCountryCode] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try to get from localStorage first
        const cached = localStorage.getItem("user_country");
        if (cached) {
          const { code, name, timestamp } = JSON.parse(cached);
          // Cache for 24 hours
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setCountryCode(code);
            setCountryName(name);
            setLoading(false);
            return;
          }
        }

        // Use a free IP geolocation API
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Failed to detect location");
        
        const data = await response.json();
        const code = data.country_code || "";
        const name = data.country_name || "";
        
        setCountryCode(code);
        setCountryName(name);
        
        // Cache the result
        localStorage.setItem("user_country", JSON.stringify({
          code,
          name,
          timestamp: Date.now()
        }));
      } catch (err) {
        setError("Could not detect location");
        // Default to empty - show all sweepstakes
        setCountryCode("");
      } finally {
        setLoading(false);
      }
    };

    detectCountry();
  }, []);

  return { countryCode, countryName, loading, error };
};
