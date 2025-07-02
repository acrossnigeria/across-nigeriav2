const { InfoIcon } = require("lucide-react")

const InfoText = ( { text, type='neutral', className }) => {
    const types = {
        "neutral":'text-gray-500',
        "warning":'text-red-500',
    }
    return (
        <div className={`${className} w-full flex flex-row gap-1 justify-center items-center`}>
            <InfoIcon strokeWidth={1} size={'18px'} className={'text-black'}/>
            <span className={`${types[type]} text-[15px]`}>{text}</span>
        </div>
    )
}

export default InfoText;