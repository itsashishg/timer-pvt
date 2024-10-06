import React, { useState, useEffect } from 'react';

const Time = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const userLocale = navigator.language || 'en-IN';
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const timeParts = date.toLocaleString(userLocale, options).split(':');
        return timeParts;
    };

    const [hours, minutes] = formatTime(currentTime);
    const amPm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleString(userLocale, options);
    };


    return (
        <div className="h-full w-full flex items-center justify-center flex-col">
            <p className="mb-1 flex items-center justify-center text-base text-gray-400 lg:mb-2 lg:text-xl">Timezone: {userTimeZone}</p>
            <p className="my-2.5 text-5xl font-semibold tabular-nums md:text-7xl lg:text-9xl text-white">
                {hours}
                <span className="inline-block animate-blink align-text-top">:</span>
                {minutes}
                <span className='ml-2 font-sans text-2xl font-medium text-neutral-600'>{amPm}</span>
            </p>
            <p className="mt-1 text-base text-gray-400 lg:mt-2 lg:text-xl">{formatDate(currentTime)}</p>
        </div>
    );
};

export default Time;
