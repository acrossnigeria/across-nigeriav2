import Head from "next/head";

export default function HeadComponent({ title, desc}) {

    return(
        <Head>
            <title>{title ? `${title} - Across Nigeria Reality TV` : "Across Nigeria Reality Show | Win Prizes, Compete & Have Fun"}</title>
            <meta name="description" content={desc ? desc : "Join Across Nigeria Reality Show to participate in exciting giveaways, game shows, and reality competitions. Win cash prizes, challenge your skills, and enjoy thrilling entertainment!"} />
            
            {/* Open Graph / Facebook Meta Tags */}
            <meta property="og:title" content={title ? `${title} - Across Nigeria Reality TV` : "Across Nigeria Reality Show | Win Prizes, Compete & Have Fun"} />
            <meta property="og:description" content="Take part in fun game shows, quizzes, and reality competitions. Win cash prizes, showcase your skills, and engage in thrilling entertainment!" />
            <meta property="og:image" content={"https://acrossnig.com/images/landing/image1.jpg"} />
            <meta property="og:url" content="https://acrossnig.com" />
            <meta property="og:type" content="website" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} - Across Nigeria Reality TV` : "Across Nigeria Reality Show | Win Prizes, Compete & Have Fun"} />
            <meta name="twitter:description" content="Join thrilling game shows, quizzes, and competitions to win cash prizes. Across Nigeria Reality Show offers entertainment, giveaways, and fun challenges!" />
            <meta name="twitter:image" content={"https://acrossnig.com/images/landing/image1.jpg"} />

            {/* Canonical URL */}
            <link rel="canonical" href="https://acrossnig.com" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            
            {/* Powerfully Optimized Meta Keywords for Maximum Reach */}
            <meta name="keywords" content="win money in Nigeria, giveaways in Nigeria, quiz show, across Nigeria, big brother naija, africa magic awards, free cash, Nigeria quiz competition, Nigeria game shows, how to win giveaways, scholarship in Nigeria, online lottery Nigeria, make money online, reality TV Nigeria, bet and win, cash rewards Nigeria, skit competition, talent show Nigeria, entertainment Nigeria, jackpot Nigeria, lotto results, daily cash prizes, naira win, who wants to be a millionaire Nigeria, free airtime giveaways, fast cash Nigeria, betting sites Nigeria, free money offers, instant win Nigeria, online cash prizes, play and win Nigeria, quiz game show, millionaire challenge, naira cash rewards, online raffle draw, best competitions in Nigeria" />

            {/* Robots Meta Tag */}
            <meta name="robots" content="index, follow" />
        </Head>
    )
}
