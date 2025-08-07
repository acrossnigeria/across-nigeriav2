import { set } from "lodash"
import { useState } from "react"

const FaqCard = ( { data } ) => {
    const [ q1, setQ1 ] = useState(false)
    const [ q2, setQ2 ] = useState(false)
    const [ q3, setQ3 ] = useState(false)
    const [ q4, setQ4 ] = useState(false)
    const [ q5, setQ5 ] = useState(false)

    const buttons = [
        [ q1, setQ1 ],
        [ q2, setQ2 ],
        [ q3, setQ3 ],
        [ q4, setQ4 ],
        [ q5, setQ5 ],
    ]
    return (
        <div className="w-[100%] bg-green-800 rounded-t-[35px] py-[20px] pb-[80px]">
            <div className="text-[23px] text-center text-white font-light">Frequently Asked Questions</div>
            <div className="flex flex-col text-white mt-[15px] justify-center items-center">
                { data.map( (qa, index) => {
                    return (
                        <div key={index} className="md:w-[50%] mt-[15px] w-[90%]">
                            <div onClick={()=>{buttons[index][1](!buttons[index][0])}} className="w-[100%] border-1 border-green-600 bg-gradient-to-t from-green-700 cursor-pointer to-green-800 rounded-[5px] flex flex-row justify-between items-center font-light p-2">
                                <span>{qa.q}</span>
                                <span className="text-[20px]">{buttons[index][0]?'-':'+'}</span>
                            </div>
                            <div className={`${buttons[index][0]?'h-fit p-2':'h-0'} bg-green-500 transition-all ease-in-out duration-[3000] overflow-hidden rounded-b-[5px] font-light text-[15px] text-white`}>
                                <span>
                                    {qa.a}
                                </span>
                            </div>
                        </div>
                    )})
                }
                    
            </div>
        </div>
    )
}

export default FaqCard;