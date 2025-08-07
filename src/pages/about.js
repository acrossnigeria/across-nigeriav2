import Layout from "@/components/Layout";
import WelcomeScreen2 from "@/components/WelcomScreen2";
import { useEffect } from "react";

export default function About() {
    useEffect(() => {
     const currentUrl = window.location.href;
    console.log("Current URL:", currentUrl);
  }, []);
    return(
        <Layout title="About Us">
            <WelcomeScreen2 />
            </Layout>
        
    )
};
