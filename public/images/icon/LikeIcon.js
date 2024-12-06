import { useState } from "react";


export default function LikeIcon( { color, size } ) {
    const [ iconSize, setIconSize ] = useState(size?size:'32px');
    return (
        <svg fill={color} width={iconSize} height={iconSize} viewBox="0 0 512 512" id="_x30_1" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke={color}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M471.079,77.334c-46.964-52.452-127.837-55.735-177.137-5.541C268.648,97.547,256,131.784,256,166.021 c0-34.237-12.647-68.473-37.942-94.227c-49.3-50.195-130.173-46.912-177.138,5.541c-106.53,118.98,7.88,303.709,194.087,393.846 c13.275,6.426,28.709,6.426,41.985,0C463.2,381.043,577.61,196.314,471.079,77.334z"></path></g></svg>
    )
}