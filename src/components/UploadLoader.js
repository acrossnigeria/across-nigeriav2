import PassIcon from "../../public/images/icon/PassIcon";
import CycleLoader from "./CycleLoader";

export default function UploadLoader({ percentage }) {
    return (
        <div className="w-full flex flex-row gap-2 items-center justify-around">
            <div className={`h-fit rounded-[5px] w-[75%] flex flex-row items-center bg-green-300`}>
                <div style={{width:percentage}} className={`h-[5px] animate-pulse rounded-[5px] bg-green-600`}></div>
            </div>
            <div className="flex flex-row items-center text-[13px] gap-2">
                <span>{percentage}</span>
                { percentage === '100%'?  <PassIcon size={'20px'}/> : <span>Uploading..</span> } 
            </div>
           
        </div>

    )
}