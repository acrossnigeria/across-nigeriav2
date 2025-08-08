import { useState, useEffect, Children } from 'react';
import ShoutOutCard from '../ShoutOutCard';
import Carousel from 'nuka-carousel';


const RegularShoutout = ( { regulars }) => {
    const [ isMobile, setIsMobile ] = useState(true);
    useEffect(()=>{

        if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
            setIsMobile(true)
        } else{setIsMobile(false)}

  // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])
    return (
       <div className='w-[100%]'>
        <Carousel 
        autoplay
        autoplayInterval={3000} 
        wrapAround={true}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        >
        { regulars.map( data => {
            return <ShoutOutCard key={data._id} shoutOutType={'regular'} details={data}/>
         })}
        </Carousel>
       </div>
    )
}

export default RegularShoutout;