import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, LinearScale, ArcElement, CategoryScale, Tooltip, Legend } from "chart.js";
import CycleLoader from "../CycleLoader";

ChartJs.register(ArcElement, Tooltip, Legend )

const PieChart = ( { data } ) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                positive: 'bottom'
            }, 
            tooltip: {
                enabled: true
            }
        }
    }
    return (
        <div className="w-[100%] h-[200px] flex flex-col items-center bg-white rounded-[20px]">
            { data.datasets[0].data ? (<Pie data={data} options={options}/> ) : (
                <div className="h-[200px] w-[80%] font-extralight text-[12px] flex flex-col justify-center items-center">
                    <CycleLoader size={'30px'}/>
                    Loading data...
                </div>) }
        </div>

    )
}

export default PieChart;