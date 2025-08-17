import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import ProcessLoader from "../ui/ProcessLoader";

ChartJs.register(ArcElement, Tooltip, Legend )

const PieChart = ( { data } ) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }, 
            tooltip: {
                enabled: true
            }
        }
    }
    return (
        <div className="w-[100%] h-[200px] flex flex-col items-center bg-white/20 border border-white/40 rounded-[20px]">
            { data.datasets[0].data ? (<Pie data={data} options={options}/> ) : (
                <div className="h-[200px] w-[80%] font-extralight text-[12px] gap-2 flex flex-col justify-center items-center">
                    <ProcessLoader size={'30px'}/>
                    Loading data...
                </div>) }
        </div>

    )
}

export default PieChart;