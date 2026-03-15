import { cn } from "@/components/cn";

export function GoogleCalendarButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full border border-line bg-white px-5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-coral hover:text-coral",
        className,
      )}
    >
      {label}
    </a>
  );
}
