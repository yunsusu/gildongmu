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
    if (router.pathname.startsWith("/travel")) {
      setGnbColor("travel");
    } else if (router.pathname.startsWith("/community")) {
      setGnbColor("community");
    } else if (router.pathname.startsWith("/mytravel")) {
      setGnbColor("mytravel");
    } else {
      setGnbColor("");
    }
  }, [router.pathname, setGnbColor]);

  return (
    <>
      <Gnb />
      <Component {...pageProps} />
    </>
  );
}
