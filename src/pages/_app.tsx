import { Header } from "@/components/Header";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
