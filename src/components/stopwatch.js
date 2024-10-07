import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        document.title = 'Timely: Stopwatch';
    }, []);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([time, ...laps]);
    };

    const renderFormattedTime = (time) => {
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 1);

        return (
            <div className="flex items-baseline">
                {hours > 0 && (
                    <span className="text-6xl font-bold">{hours}</span>
                )}
                {hours > 0 && <span className="ml-1 text-lg text-zinc-500 md:text-2xl mr-5">h</span>}
                {minutes > 0 && (
                    <span className="text-6xl font-bold">{minutes}</span>
                )}
                {(minutes > 0 || hours > 0) && <span className="ml-1 text-lg text-zinc-500 md:text-2xl mr-5">m</span>}
                <span className="text-6xl font-bold">{seconds}</span>
                <span className="ml-1 text-lg text-zinc-500 md:text-2xl mr-5">s</span>
                <span className="text-6xl font-bold">{milliseconds.toString().padStart(3, '0')}</span>
                <span className="ml-1 text-lg text-zinc-500 md:text-2xl">ms</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-3 flex flex-row gap-2 text-3xl font-medium tabular-nums md:mb-5 md:text-5xl lg:mb-7 lg:gap-5 lg:text-7xl text-white">{renderFormattedTime(time)}</h1>
            <div className="mb-4">
                {!isRunning ? (
                    <button onClick={handleStart} className="flex h-[32px] items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 md:h-[40px] md:px-4 md:py-2 md:text-base lg:h-[44px] lg:rounded-lg lg:text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg>
                        <span className="hidden sm:block">Start Timer</span>
                        <span className="block sm:hidden">Start Timer</span>
                    </button>
                ) : (
                    <div className='flex items-center gap-2 md:gap-2 lg:gap-3'>
                        <button onClick={handlePause} className="flex h-[32px] items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 md:h-[40px] md:px-4 md:py-2 md:text-base lg:h-[44px] lg:rounded-lg lg:text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                                <rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect>
                            </svg>
                            <span className="hidden sm:block">Pause</span>
                        </button>
                        <button onClick={handleLap} className="flex h-[32px] items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 md:h-[40px] md:px-4 md:py-2 md:text-base lg:h-[44px] lg:rounded-lg lg:text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                <line x1="4" x2="4" y1="22" y2="15"></line>
                            </svg>
                            <span className="hidden sm:block">Lap</span>
                        </button>
                        <button onClick={handleReset} className="flex h-[32px] items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 md:h-[40px] md:px-4 md:py-2 md:text-base lg:h-[44px] lg:rounded-lg lg:text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                            <span className="hidden sm:block">Reset</span>
                        </button>
                    </div>
                )}
            </div>
            {laps.length > 0 && (
                <div className="w-full max-w-md overflow-y-scroll h-32 border border-gray-300 rounded">
                    <h2 className="text-xl font-semibold mb-2">Laps</h2>
                    <ul className="list-disc pl-5">
                        {laps.map((lap, index) => (
                            <li key={index}>{renderFormattedTime(lap)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;

