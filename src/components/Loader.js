import { useLoader } from "@/context/LoaderContext";
import { useState, useEffect } from "react";

export default function Loader() {
    const { loading } = useLoader();
    const [ load, setLoad ] = useState('opacity-[100%]');
    const [ progress, setProgress ] = useState('w-[0%]')
    useEffect(() => {
        if( loading ) { 
            setProgress('w-[60%]')
        }; 
        if( !loading ) { 
            setProgress('w-[200%]');
            setTimeout(() => {
                setProgress('w-[0%]');
            }, 1000);
        }; 

    }, [ loading ])


    return (
            <div className={`h-[5px] ${load} transition duration-[1000] ease-linear bg-orange-600 ${progress}`} style={{ textAlign:'center', position:'fixed', top:'1px', left:'0px', transform:'translate(-50%, -50%)', zIndex:1000}}>
            </div>
    )
}