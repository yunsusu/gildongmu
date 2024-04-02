import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Gnb from "@/components/gnb";
import useCookie from "@/hooks/useCookie";
import useGnbStore from "@/store/gnb";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setGnbColor } = useGnbStore();
  const accessToken = useCookie("accessToken");

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

  useEffect(() => {
    if (router.pathname === "/community" && !accessToken) {
      router.push("/");
    } else if (router.pathname.startsWith("/mytravel") && !accessToken) {
      router.push("/");
    } else if (router.pathname.startsWith("/login") && accessToken) {
      router.push("/");
    } else if (router.pathname.startsWith("/signup") && accessToken) {
      router.push("/");
    } else if (router.pathname.startsWith("/mypage") && !accessToken) {
      router.push("/");
    } else if (router.pathname.startsWith("/write") && !accessToken) {
      router.push("/");
    }
  }, [accessToken, router, router.pathname, setGnbColor]);

  return (
    <QueryClientProvider client={queryClient}>
      <Gnb />
      <Component {...pageProps} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
