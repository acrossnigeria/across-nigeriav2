import Head from "next/head";
import Footer from "../components/Footer"; 
import StickyNavbar from "../components/Stickynavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "./Loader";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Layout({ title, children, image, desc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ noti, setNoti ] = useState(null);
  const [ networkError, setNetworkError ] = useState(false);
  const { data: session } = useSession();
  
  async function checkNotification() {
    const savedNotification = localStorage.getItem('Notification');
    console.log(savedNotification)

    async function getNewNotification() {
      try {
        const response = await axios.get(`/api/notifications?type=size&userId=${session?.user._id}`);
        setNoti(response.data);
        localStorage.setItem('Notification', noti);
        
        setTimeout(() => {
          console.log('getting new notifications')
          checkNotification();
        }, 30000);
      } catch(err) {
        setNetworkError(true);
      }
    }

    if ( session?.user ) {
      if (savedNotification) {
        const now = Date.now()/1000;
        const isCheckedRecently = now-savedNotification.timestamp<60;
        if (!isCheckedRecently) {
          console.log('Notification was not checked, checking now')
          getNewNotification()
        } else {
          console.log('Notificaton as already been checked');
          setNoti(savedNotification);
        }
      } else {
        console.log('Notificaton was not saved')
        getNewNotification();
      }
    }

  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // useEffect( ()=> {
  //   checkNotification();
  // }, [])
  // checkNotification();

    return(
    <div className="h-screen p-0 m-0 bottom-0">
      <Head>
        <title>{title ? title + "-Across Nigeria Reality TV" : "Across Nigeria Reality Show"}</title>
        <meta name="description" content={desc?desc:"Across nigeria reality show offers a variety of giveaways, game show and reality shows that cater to different tastes and interests."} />
        <meta property="og:image" content={image?image:"https://acrossnig.com/images/landing/image1.jpg"}/>
        <meta property="og:type" content="website"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <ToastContainer position="top-center" limit={1} />
       <div className="md:block hidden"><StickyNavbar/></div>
       <div className="md:hidden block"><Navbar/></div>
        {/* {!isMobile&&<StickyNavbar/>}
        {isMobile&&<Navbar/>} */}
      <div className="flex left-0 ml-0 w-full overflow-hidden flex-col justify-between">
        <Loader/>
        <main className="h-[100%] w-screen overflow-hidden pb-[100px] bg-gray-100 my-0 left-0 mx-auto">{children}</main>
       
      </div> 
      <div className="flex-grow"></div><Footer/>
    </div >)
}
