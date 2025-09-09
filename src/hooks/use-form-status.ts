'use client';

import { useState, useEffect } from 'react';

export function useFormStatus() {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const handleSubmit = () => setPending(true);
    const handleLoad = () => setPending(false);

    // Listen for form submission events
    document.addEventListener('submit', handleSubmit);
    window.addEventListener('load', handleLoad);
    window.addEventListener('pageshow', handleLoad);

    return () => {
      document.removeEventListener('submit', handleSubmit);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('pageshow', handleLoad);
    };
  }, []);

  return { pending };
}
