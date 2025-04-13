import Carousel from "nuka-carousel";
import Awesome from "../../../public/images/illustration/Awesome";
import Link from "next/link";

const funFacts = [
    { id:1, text: "Did you know? A shout out isn't just for ads. its the perfect way to celebrate birthdays, achievements, or just to spread some love" },
    { id:2, text:"85% of people love receiving a shout out from their friends or family! Who doesn't enjoy being noticed?" },
    { id:1, text:"Shout outs have been shown to boost your mood by 30%! send one today and make someone's day a little brighter!" },
    { id:1, text:"Shout outs aren't just for business! From birthdays to 'just because' it's a fun way to share special moments" },
    { id:1, text:"People are 40% more likely to remember a special shouout than a traditional message. make your shoutout unforgettable" },
    { id:1, text:"Think a shoutout is just for big occasions? Think again You can send a shout out for literally anything from 'Good morning!' to 'You nailed it!'" },
    { id:1, text:"A shout can be a great way to make someone feel special, no matter the occasion. it's like sending a hug through the internet!" },
    { id:1, text:"Shout outs are the perfect way to celebrate life's small wins, big momments, or just a random act of kindeness!"}
]

const NoShoutOut = () => {
    return (
        <div className="md:w-[100%] flex flex-col items-center pt-[20px] w-[95%] rounded-[10px] h-[530px] bg-gray-100 border-1 border-gray-400">
            <div className=" ml-[-25px] mb-2"><Awesome/></div>
            <span className="w-[90%] text-gray-600 text-[17px] text-center">Wow, no shout outs today, but you can be next!</span>
            <span className="w-[85%] text-gray-600 text-[17px] text-center">Be the first to leave a shout out! Secure your spot today</span>
            <Link href='/shoutout/booking'><button className="w-[150px] h-[45px] hover:bg-green-800 bg-green-600 rounded-[30px] mt-[10px] text-white">Book now</button></Link>
            <div className="w-[85%] mt-[40px] flex flex-col md:w-[400px]">
                <span className="text-green-600 text-[17px]">Fun facts</span>
                <Carousel 
                autoplay 
                autoplayInterval={10000}  
                withoutControls
                wrapAround={true}>
                    { funFacts.map( (fact)=>{
                        return <span key={fact.id}>{fact.text}</span>
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default NoShoutOut;