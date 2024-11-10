import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { StoreProvider } from "../../utils/Store";
import { Providers } from "../../utils/providers";

export default function App({ Component, pageProps:{session,...pageProps}, }) {
  return ( 
  
  <SessionProvider session={session}>
    <StoreProvider><Providers>
{Component.auth?(<Auth> <Component {...pageProps} /></Auth>):(<Component {...pageProps} />)}</Providers>
</StoreProvider></SessionProvider>);
  
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading</div>;
  }
  return children;
}