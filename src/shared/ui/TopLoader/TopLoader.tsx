import NextTopLoader from 'nextjs-toploader';

export const TopLoader = () => {
    return (
        <NextTopLoader
            color="#7F69C9"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            zIndex={1600}
            showAtBottom={false}
        />
    );
};