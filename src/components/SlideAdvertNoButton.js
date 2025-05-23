import { BearSlideImage } from "bear-react-carousel";

const SlideAdvertNoButton = ( { imageUrl } ) => {
    return (
        <div className="h-[100%] w-[100%] flex flex-col border-1 justify-evenly items-center border-gray-400 bg-gray-200 rounded-[5px]">
            <BearSlideImage style={{ height:'85%', width:'99%', borderRadius:'5px'}} imageUrl={imageUrl} />
            <div className="flex flex-row justify-start px-3 w-[98%] h-[12%] items-center">
                <span className="text-[12px] text-gray-500">Sponsored</span>
            </div>
        </div>
    )
}

export default SlideAdvertNoButton;