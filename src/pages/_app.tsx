import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ThemeProvider, CssBaseline } from "@mui/material";
import API from "@/data";
import { AuthProvider } from "@/context/Auth";
import Layout from "@/components/Layout";
import App from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: API.fetcher }}>
      <AuthProvider>
        <ThemeProvider theme={{}}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
