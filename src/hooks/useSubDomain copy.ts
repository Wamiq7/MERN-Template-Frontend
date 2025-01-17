import { useState, useEffect } from "react";

export function useSubdomain() {
  const getSubDomain = () => {
    const host = window.location.host;
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    return arr.length > 0 ? arr[0] : "";
  };

  const [subdomain, setSubDomain] = useState(getSubDomain());

  useEffect(() => {
    setSubDomain(getSubDomain());
  }, []);

  return subdomain;
}
