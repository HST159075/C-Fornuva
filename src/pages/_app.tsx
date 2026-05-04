import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    // Check for existing session on app load
    checkSession();
  }, [checkSession]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </ThemeProvider>
  );
}
