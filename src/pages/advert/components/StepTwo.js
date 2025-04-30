import { useState } from "react";
import DiamondIcon from "../../../../public/images/icon/DiamondIcon";
import LineCrownIcon from "../../../../public/images/icon/LineCrownIcon";
import LineTrophyIcon from "../../../../public/images/icon/LineTrophyIcon";
import InfoIcon from "../../../../public/images/icon/InfoIcon";

const StepTwo = ( { advertType, nextScreen, setBillingType, billingType, duration, setDuration, displayMode, setDisplayMode }) => {

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

    const selectBillingType = () => {
        if ( billingType === 'daily') {
            setBillingType('monthly');
        } else {
            setBillingType('daily');
        }
    }

    const toNextStep = () => {
        if ( selectedAdvert !== 0 ) {
            nextScreen();
        } else {
            showModal();
        }
    }

    const handleDisplayModeChange = (e) => {
        setDisplayMode(e.target.value)
    }
    const handleDurationChange = (e) => {
        const newValue = e.target.value;

        // Allow only integers
        if (newValue === '' || /^\d+$/.test(newValue)) {
          setDuration(newValue);
        }
    }


    return (
        <div className="md:w-[70%] md:ml-[15%] mt-[20px] w-[100%] px-[3%] flex flex-col items-center text-center text-[18px]">
            <div style={{lineHeight:'16px'}} className={`fixed ${modalBottom} ${modalOpacity} transition-all text-center ease-in-out duration-500 text-red-600 bg-white z-[2000] rounded-[20px] md:w-fit w-[80%] border-b-1 border-red-500 h-fit p-3`}>
                <span>Please select Your preferred advert type</span>
            </div> 
            <span style={{lineHeight:'20px'}} className="md:text-[25px] text-[20px] font-bold">Customize Your advert</span>
            <span style={{lineHeight:'20px'}} className="md:mt-[10px] mt-[4px] text-[15px]">Pick your preferred advert level type.</span>
            <div className="md:w-[70%] w-[93%] h-[450px] bg-white rounded-[10px] p-3 mt-[20px]">
                <div className="flex flex-row items-center justify-center gap-2">
                    <span>Daily</span>
                    <div onClick={selectBillingType} className={`w-[40px] hover:bg-gray-300 cursor-pointer h-[20px] flex flex-row ${billingType==='daily'?'justify-start':'justify-end'} transition-all duration-300 ease-in-out bg-tranparent border-[1px] border-black rounded-[25px]`}>
                        <div className="h-[18px] w-[18px] hover:bg-green-800 transition-all ease-in-out duration-300 border-1 border-black rounded-full bg-green-500"></div>
                    </div>
                    <span>Monthly</span>
                </div> 
                <div className="flex flex-row text-[11px] items-center justify-center gap-2"><InfoIcon/> Select billing type</div>

                <div className="mt-[25px] flex flex-col w-[100%] items-start text-left p-2">
                    <div className="flex flex-col w-[100%] text-[14px]">
                        <span className="font-bold">Number of { billingType === 'daily' ? 'Days':'Months' }</span>
                        <input type="number" step={1} value={duration} min={1} max={365} className="h-[35px] px-3 w-[70%] outline-none ml-[10px] rounded-[5px] mt-[5px] border-1 border-gray-400 bg-gray-50" onChange={handleDurationChange} name="number"/>
                    </div>

                    <div className="flex flex-col w-[100%] mt-[14px] text-[15px]">
                        <span className="font-bold">Choose Display Mode</span>
                        <div className="flex flex-row items-center ml-[10px] cursor-pointer gap-2"><input onChange={handleDisplayModeChange} checked={displayMode==='static'} value={'static'} name="displayMode" className="h-[30px]" type="radio"/><span>Static</span></div>
                        <div className="flex flex-row items-center ml-[10px] cursor-pointer gap-2"><input onChange={handleDisplayModeChange} checked={displayMode==='scroll'} value={'scroll'} name="displayMode" className="h-[30px]" type="radio"/><span>Scrolling</span></div>
                    </div>
                </div>
            </div>
            <button onClick={toNextStep} className="h-[45px] md:w-[300px] hover:bg-green-700 transition-all duration-300 ease-in-out w-[100%] bg-green-500 border-1 border-black rounded-[25px] mt-[20px] text-white">Continue</button>
        </div>
    )
}

export default StepTwo;