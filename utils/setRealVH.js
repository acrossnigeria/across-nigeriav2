import { useEffect } from 'react';

const setRealVH = () => {
    useEffect(() => { 
        // Function to set the real viewport height
        // This is necessary to handle mobile browsers' address bar and other UI elements that can change
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            // Set the real viewport height in a CSS variable
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        // Initial call to set the real viewport height
        setVH();
        window.addEventListener('resize', setVH);
        return () => window.removeEventListener('resize', setVH);
    }, []);
}

export default setRealVH;