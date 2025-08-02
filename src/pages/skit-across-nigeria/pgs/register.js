/**
 * Safely sets meta, link, and title tags for SEO and social.
 *
 * @param {Object} config
 * @param {string} config.title - The page title
 * @param {string} config.description - Description meta
 * @param {string} config.keywords - Keywords meta
 * @param {string} config.image - Social share image
 * @param {string} config.url - Canonical page URL
*/


import { ShieldCheck, CheckCircle2 } from "lucide-react";
import setRealVH from "../../../../utils/setRealVH";
import Image from "next/image";
import banner from "../../../../public/images/saImage2.png";
import PaystackClick from "@/components/PaystackClick";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { set } from "lodash";
import { useEffect } from "react";

export default function Register() {
    const { data: session } = useSession();
    const router = useRouter();
    // Ensure session is available
    // if (!session) {
    //     return <p>Please log in to continue.</p>;
    // }

    const userEmail = session?.user?.email || '';
    const userId = session?.user?.id || '';
    const amount = 5000; // Registration fee in Naira
    const purpose = "Registration for Skits Across Nigeria";

    const pay = (ref) => {
        // Handle payment success logic here
        console.log("Payment reference:", ref);
        // You can also save the payment reference to your database here
        handlePaymentSuccess(ref);
    };

    const handlePaymentSuccess = (ref) => {
        // Handle successful payment logic here
        console.log("Payment successful:", ref);
        // Redirect or show success message
        router.push("/skit-across-nigeria/pgs/upload-skit");
    };

    // Set the real viewport height for responsive design
    setRealVH();
    useEffect( () => {
        document.addEventListener("DOMContentLoaded", () => {
            configureMeta();
        })
    }, []);


  return (
        <section style={{height:`calc(var(--vh, 1vh)*100)`}} className="bg-white flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-gray-50 rounded-xl shadow-xl border-1 border-gray-300 pb-14 pt-1 px-1">
            <div className="w-full h-[150px] overflow-hidden relative rounded-xl shadow-lg">
                <Image
                src={banner}
                alt="Skit Competition Banner"
                layout="fill"
                objectFit="cover"
                />
            </div>
            <h1 className="text-2xl px-7 font-bold text-gray-900 mb-5 mt-5 text-center">
                Register for Skits Across Nigeria
            </h1>

            <div className="mb-4 space-y-2 px-4">
                <p className="text-gray-700 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-600" />
                    One-time Registration Fee: <strong>₦5,000</strong>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-600" />
                    Upload skits anytime during the 6-month season
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-600" />
                    Eligible to win up to ₦30 Million & Movie Deal
                </p>
            </div>

            <div className="mt-8 w-[90%] mx-auto flex items-center justify-center">
                <PaystackClick email={userEmail} purpose={purpose} amount={amount} buttonText={'Pay ₦5,000 and Register'}/>
            </div>

            <div className="mt-6 text-sm text-gray-600 text-center">
            <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" />
            Secure Payment via Paystack
            </div>
        </div>
        </section>
  );
}

