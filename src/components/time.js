import React, { useState, useEffect } from 'react';

const Time = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const userLocale = navigator.language || 'en-IN';
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [show12hr, setShow12hr] = useState(() => localStorage.getItem('show12hr') ?? true);

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        document.title = 'Timely';
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: show12hr };
        const timeParts = date.toLocaleString(userLocale, options).split(':');
        return timeParts;
    };

    const [hours, minutes] = formatTime(currentTime);
    const amPm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleString(userLocale, options);
    };

    const updateFormat = () => {
        setShow12hr(prev => !prev);
        localStorage.setItem('show12hr', show12hr);
    }

    return (
        <div className="h-full w-full flex flex-col p-2">
            <div className="flex justify-between items-center text-white my-2">
                <div></div>
                <span className="flex justify-between gap-2">
                    <div className="h-10"></div>
                    <button onClick={updateFormat} class="h-9 w-12 rounded font-sans text-sm font-medium text-neutral-400 transition-colors duration-300 sm:inline-block bg-zinc-800 hover:bg-zinc-700">
                        <span class="tabular-nums">{show12hr ? 12 : 24}</span>
                        <span class="ml-[2px] font-medium">hr</span>
                    </button>
                </span>
            </div>
            <div className="flex-grow flex items-center justify-center flex-col">
                <p className="mb-1 flex items-center justify-center text-base text-gray-400 lg:mb-2 lg:text-xl">Timezone: {userTimeZone}</p>
                <p className={`text-8xl font-semibold tabular-nums text-white ${show12hr ? 'ml-[40px]' : '-ml-3'}`}>
                    {hours}
                    <span className="inline-block animate-blink align-text-top mx-1">:</span>
                    {minutes.slice(0, 2)}
                    {show12hr && <span className='ml-2 font-sans text-2xl font-medium text-neutral-600'>{amPm}</span>}
                </p>
                <p className="mt-1 text-base text-gray-400 lg:mt-2 lg:text-xl">{formatDate(currentTime)}</p>
                <div className="mb-[5.5rem]"></div>
            </div>
        </div>
    );
};

export default Time;
