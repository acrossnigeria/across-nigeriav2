// src/components/Testimonials.jsx

import FeedbackCard from "./FeedbackCard";
import Carousel from "nuka-carousel";

const feedback = [
  {
    id: "feedback-1",
    content:
      "My daily 2k is now assured, I love across Nigeria",
    name: "Baba Ifeanyi",
    title: "Subscriber",
    img: "https://i.imgur.com/Dn0qoCG.png",
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. Its exciting how Across Nigeria has helped me have a steady income stream.",
    name: "Ayo Ifeanyi",
    title: "Content Creator",
    img: "https://i.imgur.com/fk8eEvW.png",
  },
  {
    id: "feedback-3",
    content:
      "My content has had more follows thanks to Across nigeria",
    name: "Sabinus prodigee",
    title: "Entertainer",
    img: "https://i.imgur.com/dLxxRDy.png",
  },
];

const Testimonials = () => (
  <section
    id="clients"
    className={`sm:pb-16 pb-6 px-0 flex justify-center items-center flex-col relative `}
  >
    <div className="w-full mx-auto text-center flex bg-gray-800 justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
         
    </div>
    <Carousel autoplay autoplayInterval={3000} wrapAround={true}>
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </Carousel>
  </section>
);

export default Testimonials;