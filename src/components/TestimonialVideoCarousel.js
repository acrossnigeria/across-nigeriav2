import dynamic from 'next/dynamic';
import { useState } from 'react';
import PlayIcon from '../../public/images/icon/PlayIcon';
import PauseIcon from '../../public/images/icon/PauseIcon';
import CycleLoader from './CycleLoader';


const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


const TestimonialVideoCarousel = () => {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [index, setIndex] = useState(0);

    const testimonialVid = "https://res.cloudinary.com/dbstdjvyk/video/upload/v1744549216/testimonialvideo_vcmo4j.mp4";
    const testVid = "/testimonialVideo.mp4";

    const testimonialVideos = [
        testVid,
        testVid,
        testVid,
        testVid,
        testVid,
        testVid,
        testVid,
        testVid,
    ]

    const togglePlayPause = () => setIsPlaying((prev) => !prev);

    const nextSlide = () => {
        setIsPlaying(false); // pause before changing
        setIndex((prev) => (prev + 1) % testimonialVideos.length);
    };

    const prevSlide = () => {
        setIsPlaying(false);
        setIndex((prev) =>
        prev === 0 ? testimonialVideos.length - 1 : prev - 1
        );
    };

    return (
        <div className="md:h-[500px] h-fit flex flex-col md:border-y-1 md:border-y-green-500 justify-between md:px-[3%] px-1 items-center overflow-hidden md:flex-row w-full mx-auto bg-transparent">
            <div className="md:w-[45%] w-[100%] md:flex hidden flex-col justify-center items-center h-full z-50">
                <span style={{lineHeight:'23px'}} className='text-[25px] text-green-700 font-semibold'>Real People. Real Stories. Real Rewards.</span>
                <div className='mt-4'> Since our launch, the Across Nigeria Reality Show has rewarded over ₦500,000+ in cash prizes to everyday Nigerians through our skit competitions,
                    quiz shows, and community challenges. From students in Abuja, Kaduna to creators in Lagos and over 30 states in nigeria, real people are winning real money — and you&apos;re next.
                </div>
            </div>
            <div className="md:w-[40%] w-full max-w-2xl overflow-hidden relative">
            {/* Slide Track */}
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
                {testimonialVideos.map((testVid, i) => (
                    <div key={i} onClick={togglePlayPause} className="min-w-full h-[400px] flex items-center justify-center relative">
                        <ReactPlayer
                        url={testVid}
                        playing={isPlaying && i === index}
                        loop
                        controls={false}
                        width="100%"
                        height="100%"
                        onReady={() => setLoading(false)}
                        onBuffer={() => setLoading(true)}
                        onBufferEnd={() => setLoading(false)}
                        />

                        {/* Play Icon Overlay */}
                        <div className={`${ isPlaying ? "opacity-0" : "opacity-100" } transition-opacity duration-300 hover:cursor-pointer absolute w-[50px] h-[50px] bg-green-500/80 flex items-center justify-center rounded-full`}>
                            <PlayIcon />
                        </div>

                        {/* Loader */}
                        {loading && (
                            <div className="absolute">
                                <CycleLoader size={"25px"} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-0 right-0 px-2 flex justify-between items-center -translate-y-1/2">
                <button onClick={prevSlide} className="bg-green-700/60 text-white p-2 text-[30px] rounded-full hover:bg-green-500">
                    {'❮'}
                </button>
                <button onClick={nextSlide} className="bg-green-700/60 text-white p-2 text-[30px] rounded-full hover:bg-green-500">
                    {'❯'}
                </button>
            </div>
            </div>

        </div>
    )
}

export default TestimonialVideoCarousel;
// 