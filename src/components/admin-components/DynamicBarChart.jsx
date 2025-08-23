import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from "chart.js";
import { useState } from "react";
import ShimmerLoader from "../ui/ShimmerLoader";
import ProcessLoader from "../ui/ProcessLoader";

ChartJs.register( LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale )

const DynamicBarChart = ( { dataList, individualLabel, labels, title } ) => {
    const [ showChart, setShowChart ] = useState(true);

    function handleShowChart () {
        setShowChart(!showChart);
    }

    const dataset = {
        labels: [ ...labels ],
        datasets: [
            { 
                label:individualLabel,
                data:dataList,
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
        title: { display:true, text:title }
    }

    return (
     <div className="flex flex-col gap-3 h-full items-center rounded-[15px] border w-[100%] p-2">
        <div className="flex w-[100%] px-2 flex-row justify-between">
            <span className="font-extralight text-[19px]">{title}</span>
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
            <div className="h-full w-[90%] flex flex-col relative justify-center items-center">
                { dataList ? (
                    <Bar data={dataset} options={options}/>
                ) : (
                    <div className="h-full flex flex-col justify-center gap-2 items-center w-[100%]">
                        <ProcessLoader size={'30px'}/>
                        <span className="font-extralight text-[11px]">Loading data...</span>
                    </div>
                ) }
            </div>
        )}

        { !showChart && (
            <div className="border-1 w-[100%] text-[13px] font-extralight flex flex-col rounded-[7px] h-full border-gray-400">
                    <div className=" flex-row flex rounded-t-[7px] bg-gray-300">
                        <div className="w-[35%] p-2">State</div>
                        <div className="w-[65%] border-l-1 border-gray-600 p-2">Users</div>
                    </div>
                    <div className="h-[200px] overflow-y-scroll overflow-x-hidden">
                        { dataList?.map( ( val, index ) => {
                            return (
                            <div key={index} className={`${index === dataList?.length - 1 ? '' : 'border-b-1 border-gray-400'} flex-row flex text-gray-700`}>
                                <div className="w-[36.5%] p-2">{labels[index]}</div>
                                <div className="w-[65%] border-l-1 border-gray-400 p-2">{val}</div>
                            </div>
                            )
                        })}
                    </div>
            </div>
        )}
     </div>
    )
}

export default DynamicBarChart;