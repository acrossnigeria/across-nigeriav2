import dynamic from 'next/dynamic';
import { useState } from 'react';
import PlayIcon from '../../public/images/icon/PlayIcon';
import PauseIcon from '../../public/images/icon/PauseIcon';
import CycleLoader from './CycleLoader';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });



const VideoTestimonialComponent = () => {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const testimonialVid = "https://res.cloudinary.com/dbstdjvyk/video/upload/v1744549216/testimonialvideo_vcmo4j.mp4";
    const testVid = "/testimonialVideo.mp4";

    const togglePlayPause = () => {
        if (isPlaying) {
            setLoading(false);
        }
        setIsPlaying(prev => !prev);
    };

    return (
        <div className="md:h-[500px] h-[700px] flex flex-col rounded-[10px] justify-center items-center overflow-hidden shadow-lg shadow-black/30 md:flex-row md:w-[100%] w-[95%] md:p-0 p-3 mx-auto bg-gradient-to-r from-green-500 to-red-300">
            <div className="md:w-[45%] w-[100%] text-white flex flex-col justify-center md:mt-0 mt-[-60px] items-center md:h-[100%] h-[48%]">
                <span style={{lineHeight:'23px'}} className='text-[23px] font-semibold'>Real People. Real Stories. Real Rewards.</span>
                <div className='mt-[15px]'> Since our launch, the Across Nigeria Reality Show has rewarded over ₦500,000+ in cash prizes to everyday Nigerians through our skit competitions,
                    quiz shows, and community challenges. From students in Abuja, Kaduna to creators in Lagos and over 30 states in nigeria, real people are winning real money — and you&apos;re next.
                </div>
                <div className='text-yellow-200 md:flex hidden font-semibold mt-[20px]'>
                    Since we kicked off this bold movement, we&apos;ve done more than just entertain — we&apos;ve changed lives.
                    Over the past few months:
                </div>
            </div>
            <div className='relative md:w-[45%] w-[100%] md:h-[100%] h-[50%] flex flex-col items-center justify-center'>
                <div className="absolute top-[20px] md:right-[5%] left-[15%] md:w-[70%] w-[85%] md:h-[80%] h-[95%] border-2 border-white rounded-xl z-0" />
                <div onClick={togglePlayPause} className="md:w-[70%] md:mt-[45px] mt-[-30px] mr-[15%] relative w-[85%] z-50 rounded-[15px] bg-black overflow-hidden cursor-pointer flex flex-col justify-center items-center md:h-[80%] h-[95%]">
                    <ReactPlayer
                        url={testVid} // replace with actual testimonial video
                        playing={isPlaying}
                        loop
                        controls={false}
                        width="100%"
                        height="100%"
                        style={{ borderRadius: '20px' }}
                        onReady={() => setLoading(false)}
                        onBuffer={() => setLoading(true)}
                        onBufferEnd={() => setLoading(false)}
                    />
                    <div className={`${isPlaying ?'opacity-0':'opacity-100'} transition-all cursor-pointer flex flex-col justify-center items-center rounded-full ease-in-out duration-300 h-[50px] absolute w-[50px] bg-green-500/90`} >  
                        <PlayIcon/>
                    </div>
                    { loading && ( 
                        <div className={`transition-all cursor-pointer flex flex-col justify-center items-center h-fit absolute w-fit bg-transparent`} >  
                            <CycleLoader size={'25px'}/>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default VideoTestimonialComponent;