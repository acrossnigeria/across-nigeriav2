export default function CycleLoader( {size}) {
    return (
        <div id="cycleLoader" style={{width:size?size:'50px', height:size?size:'50px'}} className={`border-b-3 border-r-3 border-t-3 border-l-3 border-gray-700 border-r-gray-400 rounded-[50%]`}></div>
    )
}