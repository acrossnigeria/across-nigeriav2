import logo from "../../public/images/logo1.png";
import Image from "next/image";

export default function IntroLoader() {
    return (
        <div className="h-screen flex flex-col justify-center w-full bg-green-700">
          <div style={{}} className="flex items-center justify-center">
            <Image src={logo} alt="Logo"  className="h-[100px] w-[90px]" />
          </div>
        </div>
    )
}