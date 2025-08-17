import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from "chart.js";
import { useState } from "react";
import ShimmerLoader from "../ui/ShimmerLoader";
import ProcessLoader from "../ui/ProcessLoader";

ChartJs.register( LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale )

const BarChart = ( { data } ) => {
    const [ showChart, setShowChart ] = useState(true);

    const title = 'Users Based On State'
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
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 2,
                width: '100%'
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
     <div className="flex flex-col gap-3 h-full items-center rounded-[15px] border shadow-lg  bg-white w-[100%] p-3">
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
            <div className="h-[270px] w-[100%] flex flex-col justify-center items-center">
                { data ? (
                    <Bar data={dataset} options={options}/>
                ) : (
                    <div className="h-[290px] flex flex-col justify-center gap-2 items-center w-[100%]">
                        <ProcessLoader size={'30px'}/>
                        <span className="font-extralight text-[11px]">Loading data...</span>
                    </div>
                ) }
            </div>
        )}

        { !showChart && (
            <div className="border-1 w-[100%] text-[13px] font-extralight flex flex-col rounded-[7px] h-[290px] border-gray-400">
                    <div className=" flex-row flex rounded-t-[7px] bg-gray-300">
                        <div className="w-[35%] p-2">State</div>
                        <div className="w-[65%] border-l-1 border-gray-600 p-2">Users</div>
                    </div>
                    <div className="h-[200px] overflow-y-scroll overflow-x-hidden">
                        { data?.list?.map( ( val, index ) => {
                            return (
                            <div key={index} className={`${index === data?.list?.length - 1 ? '' : 'border-b-1 border-gray-400'} flex-row flex text-gray-700`}>
                                <div className="w-[36.5%] p-2">{nigeriaStates[index]}</div>
                                <div className="w-[65%] border-l-1 border-gray-400 p-2">{val}</div>
                            </div>
                            )
                        })}
                    </div>
            </div>
        )}
        { data ? (
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
                    <div className="w-[35%] pl-2">States with Users {'< 11'}</div>
                    <div className="w-[65%] border-l-1 border-gray-400 pl-2">{data.lowestStates}</div>
                </div>
            </div>
        ) : (
            <ShimmerLoader roundedness={'7px'} width={'100%'} height={'100px'} />
        ) }
     </div>
    )
}

export default BarChart;