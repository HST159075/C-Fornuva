import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemeProvider } from "next-themes";

import SmoothScroll from "@/components/ui/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App({ Component, pageProps }: AppProps) {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SmoothScroll>
        <Component {...pageProps} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </SmoothScroll>
    </ThemeProvider>
  );
}
