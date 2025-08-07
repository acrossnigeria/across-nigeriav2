import { Info } from "lucide-react"
import { useState } from "react"

const InfoButton = ( { color="green", content="Nothing to see here." }) => {
    const [ contentVisible, setContentVisible ] = useState(false);
    const [ contentOpacity, setContentOpacity ] = useState("opacity-0");

    const hideContent = () => {
        setContentOpacity("opacity-0");
        setTimeout(() => {
            setContentVisible(false);
        }, 1000);
    }

    const showContent = () => {
        setContentVisible(true);
        setTimeout(() => {
            setContentOpacity("opacity-100");

            setTimeout(() => {
                hideContent();
            }, 5000);
        }, 300);
}

    const handleContent = () => {
        if (contentVisible) {
            hideContent();
        } else {
            showContent();
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-[30px] w-[30px]">
            { contentVisible && (
            <div className={`${contentOpacity} p-2 w-[300px] transition-all ease-in-out duration-300 text-[14px] mt-[140px] mr-[280px] text-gray-700 bg-gray-50 shadow-sm border border-gray-300 rounded-b-[10px] rounded-tl-[10px] fixed`}>
                <span>{content}</span>
            </div>
            )}
            <Info onClick={handleContent} className="hover:opacity-50 cursor-pointer" size={'25px'} color={color}/>
        </div>
    )
}

export default InfoButton;