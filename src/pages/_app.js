import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { StoreProvider } from "../../utils/Store";
import { Providers } from "../../utils/providers";
import { LoaderProvider } from "@/context/LoaderContext";
import { useLoader } from "@/context/LoaderContext";
import { useEffect } from "react";

function LoaderHandler() {
  // Global loader logic
  const { setLoading } = useLoader();
  const router = useRouter();

  // This will run whenever router or setLoading changes
  useEffect( () => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on( 'routeChangeStart', handleStart );
    router.events.on( 'routeChangeComplete', handleStop );
    router.events.on( 'routeChangeError', handleStop );

    return () => {
      router.events.off( 'routeChangeStart', handleStart );
      router.events.off( 'routeChangeComplete', handleStop );
      router.events.off( 'routeChangeError', handleStop );
    };
  }, [ router, setLoading ] )

  return null; // This component does not render anything 
}

export default function App({ Component, pageProps:{session,...pageProps}, }) {

  return ( 
    <SessionProvider session={session}>
      <StoreProvider>
        <Providers>
          <LoaderProvider>
            <LoaderHandler/>
            {Component.auth?(<Auth> <Component {...pageProps} /></Auth>):(<Component {...pageProps} />)}
          </LoaderProvider>
        </Providers>
      </StoreProvider>
    </SessionProvider>

  );
  
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