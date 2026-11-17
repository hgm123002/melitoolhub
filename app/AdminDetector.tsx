// app/AdminDetector.tsx
"use client";

import { useEffect, useState } from 'react';

export default function AdminDetector({ children, adminChildren }: { children: React.ReactNode; adminChildren: React.ReactNode }) {
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    setIsAdminPage(window.location.pathname.startsWith('/admin'));
  }, []);

  if (isAdminPage) {
    return <>{adminChildren}</>;
  }

  return <>{children}</>;
}