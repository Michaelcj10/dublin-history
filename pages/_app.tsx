import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import YearTransition from "../components/YearTransition";

const MIN_DISPLAY_MS = 700;

function parseYear(url: string): number | null {
  const m = url.match(/^\/(\d{4})/);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  return y >= 1916 && y <= 2000 ? y : null;
}

function sameDecade(a: number, b: number): boolean {
  return Math.floor(a / 10) === Math.floor(b / 10);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [transitionYear, setTransitionYear] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef<number>(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether the overlay is actually showing so we only hide when needed
  const overlayActiveRef = useRef(false);

  function show(year: number) {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    startTimeRef.current = Date.now();
    overlayActiveRef.current = true;
    setTransitionYear(year);
    setVisible(true);
  }

  function scheduleHide() {
    if (!overlayActiveRef.current) return;
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
    hideTimerRef.current = setTimeout(() => {
      overlayActiveRef.current = false;
      setVisible(false);
    }, remaining);
  }

  // Show on first page load
  useEffect(() => {
    const year = parseYear(window.location.pathname);
    if (year !== null) {
      show(year);
      // Auto-hide after minimum display time (no routeChangeComplete for initial load)
      hideTimerRef.current = setTimeout(() => {
        overlayActiveRef.current = false;
        setVisible(false);
      }, MIN_DISPLAY_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show on decade-crossing navigation
  useEffect(() => {
    function onStart(url: string) {
      const toYear = parseYear(url);
      if (toYear === null) return;
      const fromYear = parseYear(router.asPath);
      // Only show when crossing a decade boundary
      if (fromYear !== null && sameDecade(fromYear, toYear)) return;
      show(toYear);
    }

    function onDone() {
      scheduleHide();
    }

    router.events.on("routeChangeStart", onStart);
    router.events.on("routeChangeComplete", onDone);
    router.events.on("routeChangeError", onDone);

    return () => {
      router.events.off("routeChangeStart", onStart);
      router.events.off("routeChangeComplete", onDone);
      router.events.off("routeChangeError", onDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
      <YearTransition year={transitionYear} visible={visible} />
    </>
  );
}
