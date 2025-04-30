import { useState } from "react";
import DiamondIcon from "../../../../public/images/icon/DiamondIcon";
import LineCrownIcon from "../../../../public/images/icon/LineCrownIcon";
import LineTrophyIcon from "../../../../public/images/icon/LineTrophyIcon";

const StepOne = ( { selectAdvert, selectedAdvert, nextScreen }) => {

    const [ modalBottom, setModalBottom ] = useState('top-[-50px]');
    const [ modalOpacity, setModalOpacity ] = useState('opacity-0');

    const showModal = () => {
        setModalBottom('top-[120px]');
        setModalOpacity('opacity-100');
        setTimeout(() => {
            setModalBottom('top-[-50px]');
            setModalOpacity('opacity-0');
        }, 1500);
    }

    const selectType = (type) => {
        if ( type === selectedAdvert ) {
            selectAdvert(0);
        } else {
            selectAdvert(type);
        }
    }

    const toNextStep = () => {
        if ( selectedAdvert !== 0 ) {
            nextScreen();
        } else {
            showModal();
        }
    }

    return (
        <div className="md:w-[70%] md:ml-[15%] mt-[20px] w-[100%] px-[3%] flex flex-col justify-center items-center text-center text-[18px]">
            <div style={{lineHeight:'16px'}} className={`fixed ${modalBottom} ${modalOpacity} transition-all text-center ease-in-out duration-500 text-red-600 bg-white z-[2000] rounded-[20px] md:w-fit w-[80%] border-b-1 border-red-500 h-fit p-3`}>
                <span>Please select Your preferred advert type</span>
            </div> 
            <span style={{lineHeight:'20px'}} className="md:text-[25px] text-[20px] font-bold">Choose Advert Plan</span>
            <span style={{lineHeight:'20px'}} className="md:mt-[10px] mt-[4px] text-[15px]">Pick your preferred advert level type.</span>
            <div className="w-[100%] flex flex-col md:justify-center md:flex-row gap-3 border-1 mt-[20px]">

                <div onClick={()=>{selectType(1)}} className={`${selectedAdvert===1?'border-blue-500 shadow-lg':'border-white hover:border-blue-300 hover:shadow-lg'} md:w-[23.5%] w-[100%] md:h-[210px] p-2 h-[120px] bg-white border-[3px] transition-all duration-300 ease-in-out cursor-pointer rounded-[7px]`}> 
                    <div className="flex flex-row gap-2 items-center">
                        <DiamondIcon/>
                        <span className="font-bold">Diamond</span>
                    </div>
                    <div className="flex flex-col text-[14px] md:mt-[20px] mt-[4px] gap-1 text-left items-start">
                        <span className=" self-start"><span className="text-blue-500">✔</span> Right at the top of the homepage.</span>
                        <span className=""><span className="text-blue-500">✔</span> Scrolling Only.</span>
                        <span className=""><span className="text-blue-500">✔</span> Premium visibility.</span>
                    </div>
                </div>

                <div onClick={()=>{selectType(2)}} className={`${selectedAdvert===2?'border-yellow-500 shadow-lg':'border-white hover:border-yellow-300 hover:shadow-lg'} md:w-[23.5%] w-[100%] md:h-[210px] p-2 h-[120px] bg-white border-[3px] transition-all duration-300 ease-in-out cursor-pointer rounded-[7px]`}> 
                    <div className="flex flex-row gap-2 items-center">
                        <LineCrownIcon/>
                        <span className="font-bold">Gold</span>
                    </div>
                    <div className="flex flex-col text-[14px] md:mt-[20px] mt-[4px] gap-1 text-left items-start">
                        <span className=" self-start"><span className="text-yellow-500">✔</span> Right after our products section.</span>
                        <span className=""><span className="text-yellow-500">✔</span> Choose  between static or scrolling.</span>
                        <span className=""><span className="text-yellow-500">✔</span> High homepage placement.</span>
                    </div>
                </div>

                <div onClick={()=>{selectType(3)}} className={`${selectedAdvert===3?'border-[#6ccee7] shadow-lg':'border-white hover:border-[#7ee4fd] hover:shadow-lg'} md:w-[23.5%] w-[100%] md:h-[210px] p-2 h-[120px] bg-white border-[3px] transition-all duration-300 ease-in-out cursor-pointer rounded-[7px]`}> 
                    <div className="flex flex-row gap-2 items-center">
                        <LineTrophyIcon/>
                        <span className="font-bold">Silver</span>
                    </div>
                    <div className="flex flex-col text-[14px] md:mt-[20px] mt-[4px] gap-1 text-left items-start">
                        <span className=" self-start"><span className="text-[#6ccee7]">✔</span> Middle of homepage.</span>
                        <span className=""><span className="text-[#6ccee7]">✔</span> Choose between static or scrolling Only.</span>
                        <span className=""><span className="text-[#6ccee7]">✔</span> Affordable mid exposure.</span>
                    </div>
                </div>

                <div onClick={()=>{selectType(4)}} className={`${selectedAdvert===4?'border-[#8d4521] shadow-lg':'border-white hover:border-[#b15f36] hover:shadow-lg'} md:w-[23.5%] w-[100%] md:h-[210px] p-2 h-[120px] bg-white border-[3px] transition-all duration-300 ease-in-out cursor-pointer rounded-[7px]`}> 
                    <div className="flex flex-row gap-2 items-center">
                        <LineCrownIcon/>
                        <span className="font-bold">Bronze</span>
                    </div>
                    <div className="flex flex-col text-[14px] md:mt-[20px] mt-[4px] gap-1 text-left items-start">
                        <span className=" self-start"><span className="text-[#8d4521]">✔</span> Lower part of homepage.</span>
                        <span className=""><span className="text-[#8d4521]">✔</span> Static only.</span>
                        <span className=""><span className="text-[#8d4521]">✔</span> Budget friendly option.</span>
                    </div>
                </div>

            </div>
            <button onClick={toNextStep} className="h-[45px] md:w-[300px] hover:bg-green-700 transition-all duration-300 ease-in-out w-[100%] bg-green-500 border-1 border-black rounded-[25px] mt-[20px] text-white">Continue</button>
        </div>
    )
}

export default StepOne;
{/* <div>
<div className="w-[40px] h-[20px] flex flex-row items-start bg-tranparent border-[1px] border-black rounded-[25px]">
    <div className="h-[18px] w-[18px] border-1 border-black rounded-full bg-green-500"></div>
</div>
</div> */}