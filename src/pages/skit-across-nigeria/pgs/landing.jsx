import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import banner from "../../../../public/images/saImage2.png";
import creatorIllus from "../../../../public/svg/creator.svg";
import { useSession } from "next-auth/react";
import logo1 from "../../../../public/images/logo1.png";
import Close from "../../../../public/images/icon/Close";
import { CircleUserRound, Crown, Megaphone, PlayCircle, Sparkles, Users, BadgeDollarSign, Film } from "lucide-react";
import HeadComponent from "@/components/HeadComponent";

export default function SkitCompetitionLanding() {
    // Countdown setup
    const [timeLeft, setTimeLeft] = useState({});
    const { data:session } = useSession();
  
    const [ nlModalOpacity, setNlModalOpacity ] = useState('opacity-0');
    const [ nlBgOpacity, setNlBgOpacity ] = useState('opacity-0');
    const [ showModal, setShowModal ] = useState(false);

    
    const deadline = new Date("2025-07-20T23:59:59"); // Set your actual deadline here
    useEffect(() => {
        const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance < 0) {
            clearInterval(interval);
            setTimeLeft(null);
        } else {
            setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toUploadPage = () => {
        if (session?.user?.name) {
            router.push('/skit-across-nigeria/pgs/video/upload');
        } else {
            notLoggedIn('in');
        }
    }

    const notLoggedIn = (transiton) => {
        if (transiton==='in') {
            setShowModal(true);
            setTimeout(() => {
                setNlBgOpacity('opacity-100');
                setNlModalOpacity('opacity-100');
            }, 300);
        } else {
            setNlBgOpacity('opacity-0');
            setNlModalOpacity('opacity-0');
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
        }
    }

    const features = [
      {
        icon: <Sparkles className="w-6 h-6 text-green-600" />,
        title: "Showcase Your Talent",
        description: "Gain exposure by sharing your skit with a national audience.",
      },
      {
        icon: <Users className="w-6 h-6 text-green-600" />,
        title: "Grow Your Fanbase",
        description: "Get people talking and voting. Every view counts.",
      },
      {
        icon: <BadgeDollarSign className="w-6 h-6 text-green-600" />,
        title: "Win Cash Prizes",
        description: "Up to ₦1M monthly and a ₦30M grand prize for top talents.",
      },
      {
        icon: <Film className="w-6 h-6 text-green-600" />,
        title: "Land a Movie Deal",
        description: "Finalists get the chance to feature in a real movie production.",
      },
    ];

  return (
    <Layout>
        <HeadComponent
        title='Skit Across Nigeria'
        desc="Watch and vote for your favorite skits in the Across Nigeria Skit Competition. Support amazing talents and win exciting prizes!"
        image="https://acrossnig.com/images/skit_across_nigeria_skit.jpg"
        canonical="https://acrossnig.com/skit-across-nigeria/pgs/landing"
        url="https://acrossnig.com/skit-across-nigeria/pgs/landing"
        keywords="Nigeria skit competition, win cash for skits, vote skit Nigeria, entertainment Nigeria, Across Nigeria show, talent show Nigeria, best Nigerian skits, online skit challenge"
        />
        { showModal && 
            <div className={`fixed left-0 ${nlBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
                <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                    <button onClick={()=>{notLoggedIn('out')}} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                        <Close bg={'white'} size={'15px'}/>
                        Close
                    </button>
                    <div className={`overflow-hidden h-[400px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${nlModalOpacity} p-3 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                        <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                            <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                            <div className='flex flex-col justify-center items-start gap-0'>
                                <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                                <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                            </div>
                        </div>
                        <span >Oops! You have to Log In or Register</span>
                        <div className="flex mt-[20px] flex-col items-center gap-3">
                            <button onClick={()=>router.push('/account/reg?redirect=/skit-across-nigeria/pgs/video/upload')} className="h-[40px] w-[200px] text-white bg-green-500 hover:bg-green-700 rounded-[5px]">Register Now</button>
                            <button onClick={()=>router.push('/account/login?redirect=/skit-across-nigeria/pgs/video/upload')} className="border-1 h-[40px] hover:bg-black/20 rounded-[5px] w-[200px] border-gray-500">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        }

    <section className="w-screen h-fit bg-white">
      <div className="flex flex-col bg-[url('/svg/Hexagon.svg')] h-[85vh] bg-cover bg-center px-[3%] md:flex-row md:justify-center justify-start md:pt-0 pt-12 gap-3 items-center">
        <div className="md:text-left text-center flex flex-col gap-3 md:max-w-[48%] md:h-96 md:pt-8 md:pr-5">
            {/* Title */}
          <span className="text-2xl md:text-5xl font-extrabold text-white">
            WIN UP TO <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-800">₦30 MILLION</span> & A MOVIE DEAL!
          </span>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-4">
            Submit your original skit, get the most votes, and claim the spotlight!
          </p>
          <div className="md:flex hidden flex-col md:flex-row gap-3 ">
            <Link className="bg-green-600 text-white px-8 font-medium h-[45px] flex flex-row justify-center items-center rounded-[40px] shadow hover:bg-green-700 transition" href="/skit-across-nigeria/pgs/video/upload">
                { session?.user?.name ? "Upload My Skit":"Register/ Log In to Participate"}
            </Link>

            <Link className="bg-white text-black font-medium h-[45px] px-8 flex flex-row justify-center items-center rounded-[45px] hover:bg-gray-400 transition" href="/skit-across-nigeria/pgs">
                <PlayCircle className="mr-2 " size={'25px'} />
                View & Vote Skits
            </Link>
          </div>
        </div>

        {/* Banner */}
        <div className="md:w-[48%] w-full h-64 md:h-96 relative shadow-lg">
          <Image
            src={banner}
            alt="Skit Competition Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex md:hidden mt-3 flex-col w-[90%] md:flex-row gap-3 ">
          <Link className="bg-green-600 text-white w-full font-medium h-[45px] flex flex-row justify-center items-center rounded-[40px] shadow hover:bg-green-700 transition" href={session?.user?.name ? "/skit-across-nigeria/pgs/video/upload":"/account/login"}>
              { session?.user?.name ? "Upload My Skit":"Register/ Log In to Participate"}
          </Link>

          <Link className="bg-white text-black font-medium w-full h-[45px] flex flex-row justify-center items-center rounded-[45px] hover:bg-gray-400 transition" href="/skit-across-nigeria/pgs">
              <PlayCircle className="mr-2 " size={'25px'} />
              Watch & Vote Skits
          </Link>
        </div>
      </div>   

      <div className="bg-green-50 text-center py-5 px-[5%]">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">How It Works?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <CircleUserRound className="mx-auto mb-3 rounded-[30px] w-[50px] py-1 bg-green-600" color="white" size={'30px'} />
              <h3 className="font-semibold text-green-950 text-2xl"> Register</h3>
              <p className="px-6 pt-1 pb-5">Sign up for free and submit your skit (max 3 minutes, original content only).</p>
            </div>
            <div className="text-center border-y-2 pt-2 md:pt-0 md:border-x-2 md:border-y-0 border-gray-300">
              <Megaphone className="mx-auto mb-3 rounded-[30px] w-[50px] py-1 bg-green-600" color="white" size={'30px'} />
              <h3 className="font-semibold text-green-950 text-2xl"> Promote</h3>
              <p className="px-6 pt-1 pb-5">Share your skit link on WhatsApp, Instagram, and Facebook to get more votes.</p>
            </div>
            <div className="text-center">
              <Crown className="mx-auto mb-3 rounded-[30px] w-[50px] py-1 bg-green-600" color="white" size={'30px'} />
              <h3 className="font-semibold text-green-950 text-2xl"> Win!</h3>
              <p className="px-6 pt-1 pb-5">The top skits with the highest votes win cash prizes and the grand prize winner gets a movie deal!</p>
            </div>
          </div>
      </div>   
      <div className="mx-auto text-center">

        {/* Countdown */}
        {/* {timeLeft ? (
          <div className="mb-10 text-xl text-gray-800">
            ⏳ Voting Closes In:{" "}
            <span className="font-bold">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>
        ) : (
          <div className="mb-10 text-xl text-red-600 font-semibold">
            🚨 Voting has closed!
          </div>
        )} */}


        {/* Details */}
        <div className=" pt-[70px] pb-[30px] bg-gradient-to-b from-transparent to-gray-200 text-left md:px-9 px-6">
          <div className="max-w-6xl grid md:grid-cols-2 gap-8 mx-auto items-center">

            <div className="max-w-md">
              <h2 className="text-2xl font-bold leading-tight text-gray-800 mb-2">Open to all Content and skit <span className="text-green-600">creators</span> across Nigeria.</h2>
              <p className="text-gray-600 text-[15px]">
                Viewers can vote for their favorite skits and share them on WhatsApp, Facebook, and Instagram.
                Registration is not required to vote.
              </p>

              <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Guidelines</h2>
              <ul className="list-disc text-[15px] list-inside text-gray-700 space-y-1">
                <li className="font-semibold list-none text-green-600">🏆 Monthly Prizes</li>
                <li>The Top 2 videos with the most votes every month will share a prize of ₦1,000,000</li>
                <li>This continues for 6 months</li>
                <li className="font-semibold list-none text-green-700">🌟 Grand Finale</li>
                <li>A total of 12 winners will emerge over 6 months</li>
                <li>These 12 will battle it out in the Reality Show finale for the Ultimate Prize: 
                  <span className="font-semibold text-green-700"> ₦30,000,000 + Movie Deal</span>
                </li>
              </ul>
              <Link className="bg-green-600 mt-5 text-white w-full font-medium h-[45px] flex flex-row justify-center items-center rounded-[40px] shadow hover:bg-green-700 transition" href={session?.user?.name ? "/skit-across-nigeria/pgs/video/upload":"/account/login"}>
                { session?.user?.name ? "Upload My Skit":"Register/ Log In to Participate"}
              </Link>
            </div>

            <div>
              <div className="w-full h-64 md:h-96 relative rounded-2xl">
                <Image
                  src={creatorIllus}
                  alt="Skit Competition Banner"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

          </div>
        </div>

        <section className="py-12 border-b-gray-300 border-b-1 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-medium text-gray-800 mb-7">
              Why Join?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-md transition"
                >
                  <div className="flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Skits */}
        <div className="py-12 md:px-0 px-3 max-w-[1100px] mx-auto">
          <h2 className="text-4xl font-medium text-gray-800 mb-7">Featured Skits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((skit) => (
              <div key={skit} className="rounded-xl border shadow-sm overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={banner} // Replace with real thumbnails
                    alt={`Skit ${skit}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 text-left">
                    <h3 className="font-semibold text-gray-800">Skit Title {skit}</h3>
                    <p className="text-sm text-gray-600 mb-2">by Participant {skit}</p>
                    <Link className="text-primary hover:underline text-sm" href={`/skit-across-nigeria/pgs/video/${skit}`}>
                            Watch
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row max-w-[900px] md:px-0 px-3 mx-auto gap-4 mb-[50px] justify-center">
          <Link className="bg-green-600 text-white w-full font-medium h-[45px] flex flex-row justify-center items-center rounded-[40px] shadow hover:bg-green-700 transition" href="/skit-across-nigeria/pgs/video/upload">
              { session?.user?.name ? "Upload My Skit":"Register/ Log In to Participate"}
          </Link>

          <Link className="border-black border-1 text-black font-medium w-full h-[45px] flex flex-row justify-center items-center rounded-[45px] hover:bg-gray-400 transition" href="/skit-across-nigeria/pgs">
              <PlayCircle className="mr-2 " size={'25px'} />
              Watch & Vote Skits
          </Link>
        </div>
      </div>
    </section>
    </Layout>
  );
}
