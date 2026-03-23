import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DE_HOST = "de.pontsmalins.com";
const PRIMARY_HOST = "pontsmalins.com";

function normalizeHost(hostHeader: string): string {
  return hostHeader.toLowerCase().split(":")[0] ?? "";
}

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");
}

function getCanonicalHost(hostname: string): string {
  if (hostname === `www.${PRIMARY_HOST}`) {
    return PRIMARY_HOST;
  }
  if (hostname === `www.${DE_HOST}`) {
    return DE_HOST;
  }
  if (hostname.startsWith("www.") && hostname.endsWith(".pontsmalins.com")) {
    return hostname.slice(4);
  }
  return hostname;
}

function isPontsmalinsHost(hostname: string): boolean {
  return hostname === PRIMARY_HOST || hostname.endsWith(".pontsmalins.com");
}

function stripDePrefix(pathname: string): string {
  if (pathname === "/de") {
    return "/";
  }
  return pathname.startsWith("/de/") ? pathname.replace(/^\/de/, "") || "/" : pathname;
}

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/favicon.ico")
  );
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = normalizeHost(host);
  const pathname = request.nextUrl.pathname;
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const canonicalHost = getCanonicalHost(hostname);
  const shouldRedirectToCanonical =
    !isLocalHost(hostname) &&
    isPontsmalinsHost(hostname) &&
    (canonicalHost !== hostname || forwardedProto !== "https");

  if (shouldRedirectToCanonical) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https";
    redirectUrl.host = canonicalHost;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const effectiveHost = canonicalHost;

  if (effectiveHost === PRIMARY_HOST && (pathname === "/de" || pathname.startsWith("/de/"))) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https";
    redirectUrl.host = DE_HOST;
    redirectUrl.pathname = stripDePrefix(pathname);
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (!effectiveHost.startsWith(DE_HOST) || shouldBypass(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname === "/de" ? "/" : pathname.replace(/^\/de/, "");
    return NextResponse.redirect(redirectUrl, 308);
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname =
    pathname === "/"
      ? "/de"
      : pathname === "/en"
        ? "/de/en"
        : pathname.startsWith("/en/")
          ? `/de${pathname}`
          : `/de${pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
