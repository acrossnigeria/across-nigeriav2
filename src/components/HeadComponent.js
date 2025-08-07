import Head from "next/head";

export default function HeadComponent({ 
        title = "Home", 
        desc =  "Join Across Nigeria Reality Show to participate in exciting giveaways, game shows, and reality competitions. Win cash prizes, challenge your skills, and enjoy thrilling entertainment!", 
        image = "https://acrossnig.com/images/frontBanner.jpg",
        url = "https://acrossnig.com",
        keywords = "win money in Nigeria, giveaways in Nigeria, quiz show, across Nigeria, big brother naija, africa magic awards, free cash, Nigeria quiz competition, Nigeria game shows, how to win giveaways, scholarship in Nigeria, online lottery Nigeria, make money online, reality TV Nigeria, bet and win, cash rewards Nigeria, skit competition, talent show Nigeria, entertainment Nigeria, jackpot Nigeria, lotto results, daily cash prizes, naira win, who wants to be a millionaire Nigeria, free airtime giveaways, fast cash Nigeria, betting sites Nigeria, free money offers, instant win Nigeria, online cash prizes, play and win Nigeria, quiz game show, millionaire challenge, naira cash rewards, online raffle draw, best competitions in Nigeria",
        canonical = "https://acrossnig.com"
        }) {

    return(
        <Head>
            <title>{`${title} - Across Nigeria Reality Show`}</title>
            <meta name="description" content={desc} />
            
            {/* Open Graph / Facebook Meta Tags */}
            <meta property="og:title" content={`${title} - Across Nigeria Reality Show`} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} - Across Nigeria Reality Show`} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            
            {/* Powerfully Optimized Meta Keywords for Maximum Reach */}
            <meta name="keywords" content={keywords} />

            {/* Robots Meta Tag */}
            <meta name="robots" content="index, follow" />
        </Head>
    )
}
