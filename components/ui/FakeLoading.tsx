"use client";

import { useEffect, useState } from "react";

export function FakeLoading() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background text-on-surface">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
        <span className="size-2 animate-pulse rounded-full bg-primary" />
        Loading portfolio
      </div>
    </div>
  );
}
