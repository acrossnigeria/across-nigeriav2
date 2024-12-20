import Head from "next/head";
import Footer from "../components/Footer"; 
import StickyNavbar from "../components/Stickynavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Menucomp from "./Menucomp";
import Navbar from "../components/Navbar";
import Loader from "./Loader";

export default function Layout({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const[isMobile, setIsMobile]=useState(false);
  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
    setIsMobile(true)
  } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])
  
    return(
    <div className="h-screen p-0 m-0 bottom-0">
      <Head>
        <title>{title ? title + "-Across Nigeria TV" : "Across Nigeria Reality Show"}</title>
        <meta name="description" content="App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <ToastContainer position="top-center" limit={1} />
        {!isMobile&&<StickyNavbar/>}
        {isMobile&&<Navbar/>}
      <div className="flex left-0 ml-0 w-full overflow-hidden flex-col justify-between">
        <Loader/>
        <main className="h-[100%] w-screen overflow-hidden pb-[100px] left-0 mx-auto">{children}</main>
       
      </div> 
      <div className="flex-grow"></div><Footer/>
    </div >)
}
