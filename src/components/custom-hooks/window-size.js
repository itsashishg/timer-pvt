import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        type: getScreenType(window.innerWidth),
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowSize({
                width: width,
                height: window.innerHeight,
                type: getScreenType(width),
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

const getScreenType = (width) => {
    if (width < 576) {
        return 'xs';
    } else if (width >= 576 && width < 768) {
        return 'sm';
    } else if (width >= 768 && width < 992) {
        return 'md';
    } else if (width >= 992 && width < 1200) {
        return 'lg';
    } else {
        return 'xl';
    }
};

export default useWindowSize;
