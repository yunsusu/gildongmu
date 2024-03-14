import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Gnb from "@/components/gnb";
import useGnbStore from "@/store/gnb";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setGnbColor } = useGnbStore();

  useEffect(() => {
    switch (router.pathname) {
      case "/travel":
        setGnbColor("travel");
        break;

      case "/community":
        setGnbColor("community");
        break;

      default:
        setGnbColor("");
        break;
    }
  }, [router.pathname, setGnbColor]);
  return (
    <>
      <Gnb />
      <Component {...pageProps} />
    </>
  );
}
