export default function CycleLoader( {size}) {
    return (
        <div id="cycleLoader" style={{width:size?size:'50px', height:size?size:'50px'}} className={`border-b-2 border-r-2 border-t-2 border-l-2 border-gray-700 border-r-gray-400 rounded-[50%]`}></div>
    )
}