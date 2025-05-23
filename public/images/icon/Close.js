export default function Close( {bg, size} ) {
    return (
        <svg width={size?size:'25px'} height={size?size:'25px'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Menu / Close_LG">
        <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke={bg?bg:'gray'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </svg>
    )
}