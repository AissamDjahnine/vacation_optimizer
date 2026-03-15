"use client";

import { useEffect, useState } from "react";

type ProtectedEmailLinkProps = {
  user: string;
  domain: string;
  className?: string;
};

export function ProtectedEmailLink({
  user,
  domain,
  className,
}: ProtectedEmailLinkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>{`${user} [at] ${domain}`}</span>;
  }

  const address = `${user}@${domain}`;

  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
