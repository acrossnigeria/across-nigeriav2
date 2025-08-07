import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from "chart.js";
import { responsive } from "@cloudinary/react";
import CycleLoader from "../CycleLoader";
import Checkbox from "../Checkbox";
import { useEffect, useState } from "react";

ChartJs.register( LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale )

const BarChart = ( { data } ) => {
    const [ showChart, setShowChart ] = useState(true);

    const title = 'Users Based On Residence'
    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    function handleShowChart () {
        setShowChart(!showChart);
    }

    const dataset = {
        labels: [ ...nigeriaStates ],
        datasets: [
            { 
                label:'users',
                data:data?.list,
                backgroundColor: "#22c55e",
                borderColor: "black",
                borderWidth: 0,
            },
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top'}
        }, 
        title: { display:true, text:'Number Of Users Based On State'}
    }

    return (
     <div className="flex flex-col gap-[5x] h-[460px] items-center rounded-[5px]  bg-white w-[100%] p-3">
        <div className="flex w-[100%] px-2 flex-row justify-between">
            <span className="font-extralight text-[22px]">{title}</span>
            <div className="flex gap-2 flex-row items-center">
                <span className="text-[13px]">Show chart</span>
                <input
                    type="checkbox"
                    id="termsCheckbox"
                    value={showChart}
                    checked={showChart}
                    className='accent-blue-700 cursor-pointer h-[17px] w-[17px]'
                    onChange={handleShowChart}
                />
            </div>
        </div>
        { showChart && (
            <div className="h-[290px] w-[100%]">
                { data ? (
                    <Bar data={dataset} options={options}/>
                ) : (
                    <div className="h-[290px] flex flex-col justify-center items-center w-[100%]">
                        <CycleLoader size={'30px'}/>
                        <span className="font-extralight text-[12px]">Loading data...</span>
                    </div>
                ) }
            </div>
        )}

        { !showChart && (
            <div className="border-1 w-[100%] text-[15px] font-extralight flex flex-col border-gray-400">
                    <div className="border-b-1 flex-row flex border-gray-500 bg-gray-300">
                        <div className="w-[35%] pl-3">State</div>
                        <div className="w-[65%] border-l-1 border-gray-600 pl-3">Users</div>
                    </div>
                    <div className="h-[263px] overflow-y-scroll overflow-x-hidden">
                        { data?.list?.map( ( val, index ) => {
                            return (
                            <div key={index} className="border-b-1  flex-row flex border-gray-400 text-gray-700">
                                <div className="w-[35%] pl-3">{nigeriaStates[index]}</div>
                                <div className="w-[65%] border-l-1 border-gray-400 pl-3">{val}</div>
                            </div>
                            )
                        })}
                    </div>
            </div>
        )}
        { (data?.lowestStates && data?.highestStates) ? (
        <div className="flex border-1 w-[100%] border-gray-400 text-[11px] flex-col self-center mt-[5px] font-extralight">
                <div className="border-b-1 flex-row flex border-gray-500 bg-gray-300">
                    <div className="w-[35%] pl-2">Metric</div>
                    <div className="w-[65%] border-l-1 border-gray-600 pl-2">Value</div>
                </div>

                <div className="border-b-1 flex-row flex border-gray-400 text-gray-700">
                    <div className="w-[35%] pl-2">Top States by Users</div>
                    <div className="w-[65%] border-l-1 border-gray-400 pl-2">{data.highestStates}</div>
                </div>
                <div className="flex-row flex border-gray-400 text-gray-700">
                    <div className="w-[35%] pl-2">States with Lowest Users</div>
                    <div className="w-[65%] border-l-1 border-gray-400 pl-2">{data.lowestStates}</div>
                </div>
            </div>
        ) : (
            <div className="h-[70px] bg-gray-300 w-[90%] animate-pulse mt-2"></div>
        ) }
     </div>
    )
}

export default BarChart;