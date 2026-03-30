import type { AppLanguage } from "@/lib/i18n";

export function PageShell({
  children,
  aside: _aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="container-shell py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] space-y-10">
        {children}
      </div>
    </div>
  );
}

export function defaultPageAside(_language: AppLanguage) {
  return null;
}
