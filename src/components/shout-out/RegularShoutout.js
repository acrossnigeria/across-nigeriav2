import { useState, useEffect, Children } from 'react';
import ShoutOutCard from '../ShoutOutCard';
import testImage from '../../../public/images/model/model2.jpg';
import Carousel from 'nuka-carousel';

const prototype = [
    { _id:'yg6et6', mediaUrl: testImage, Likes: [1, 2, 4], comments: [ {_id:'4h5y6', text: 'this is a test', user: {name:'ali'}}], name:'birthday', shoutOut:'happy birthday' },
    { _id:'ngtr6', mediaUrl: testImage, Likes: [1, 2, 4], comments: [ {_id:'4h5y6', text: 'this is a test', user: {name:'ali'}}], name:'birthday', shoutOut:'happy birthday' },
    { _id:'546g5gv', mediaUrl: testImage, Likes: [1, 2, 4], comments: [ {_id:'4h5y6', text: 'this is a test', user: {name:'ali'}}], name:'birthday', shoutOut:'happy birthday' },
]

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