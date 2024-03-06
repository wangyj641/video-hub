import "@/styles/globals.css";
import { Session } from "inspector";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />;
      </SessionProvider>
    </ChakraProvider>

  )
}
