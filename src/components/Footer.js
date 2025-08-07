import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "../../public/images/logo1.png"
import ChangingBottomNoticeBanner from "./ChangingBottomNoticeBanner";
import axios from "axios";

export const Products = [
  { name: " GIVE AWAY QUIZZES" },
  { name: "SKITS ACROSS NIGERIA" },
  { name: "KING & QUEEN ACROSS NIGERIA" },
  { name: "MYSTERY BOXES" },
  { name: "STATE TREASURE HUNT SHOW" },
  { name: "MEGA CASH OUT" },
  { name: "ACROSS NIGERIA REALITY SHOW" },
  { name: "NAIJA VIBES" },
];
function Footer() {
    const [ isGettingAdvert, setIsGettingAverts ] = useState(true);
    const [ footerAdverts, setFooterAdverts ] = useState([]);
    const [ getAdvertRetryCounts, setGetAdvertRetryCounts ] = useState(0);

    const getAdverts = async () => {
        try {
            setIsGettingAverts(true);
            const response = await axios.get('/api/advert/getFooterAdverts');
            const data = response.data.liveBronzeAdverts;
            setFooterAdverts(data);
            setIsGettingAverts(false);
        } catch(err) {
            if ( getAdvertRetryCounts < 3 ) {
            setTimeout(() => {
                setGetAdvertRetryCounts(getAdvertRetryCounts+1);
            }, 2000);
            } else {
                console.log('Three retry to get advert failed, reload page')
            }
        }
    }

    useEffect( () => {
        getAdverts();
    }, [ getAdvertRetryCounts ])

  return (
        <footer className="relative bg-green-800 mb-0 pb-[30px] text-[13px] bottom-0 backdrop-opacity-0 bg-opacity-100 text-white transition duration-700 
                ease-in-out">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <a href="https://acrossnig.com/" className="flex items-center">
                        <Image src={img} width={30} height={30} className="h-8 me-3" alt="AcrossNg Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Across Nigeria™</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase dark:text-white">Resources</h2>
                        <ul className="text-gray-100 dark:text-gray-100 font-medium">
                            <li className="mb-4">
                                <a href="https://acrossnig.com/" className="hover:underline">Across Nigeria™</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Reality TV show</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase dark:text-white">Follow us</h2>
                        <ul className="text-gray-100 dark:text-gray-100 font-medium">
                            <li className="mb-4">
                                <a href="https://www.facebook.com/profile.php?id=61560087734551" className="hover:underline ">Facebook</a>
                            </li>
                            <li>
                                <a href="https://x.com" className="hover:underline">{`X (Twitter)`}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase dark:text-white">Legal</h2>
                        <ul className="text-gray-100 dark:text-gray-100 font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-100 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-100 sm:text-center dark:text-gray-400">© 2025 <a href="https://acrossnig.com/" className="hover:underline">Across Nigeria™</a>. All Rights Reserved.
                </span>
                <div className="flex mt-4 sm:justify-center sm:mt-0"> </div>
            </div>
            </div>
            <ChangingBottomNoticeBanner isLoading={isGettingAdvert} adverts={footerAdverts}/>
        </footer>
    );
}

export default Footer;
