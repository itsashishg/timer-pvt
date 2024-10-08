import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && totalSeconds > 0) {
            interval = setInterval(() => {
                setTotalSeconds((prev) => prev - 1);
            }, 1000);
        } else if (!isActive && totalSeconds === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, totalSeconds]);

    useEffect(() => {
        document.title = 'Timely: Timer';
    }, []);

    const handleInputChange = () => {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        const total = hours * 3600 + minutes * 60 + seconds;
        setTotalSeconds(total);
    };

    const handleStart = () => {
        if (totalSeconds === 0) {
            setTotalSeconds(1500);
        }
        setIsActive(true);
        setIsEditing(false);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
        setIsActive(false);
    };

    const handleStop = () => {
        setIsActive(false);
        setTotalSeconds(0);
        setIsEditing(false);
        setIsPaused(false);
    };

    const addTime = (minutes) => {
        setTotalSeconds((prev) => prev + minutes * 60);
    };

    const formatTime = (sec) => {
        const hours = (Math.floor(sec / 3600)).toString().padStart(2, '0');
        const minutes = (Math.floor((sec % 3600) / 60)).toString().padStart(2, '0');
        const seconds = (sec % 60).toString().padStart(2, '0');
        return { hours, minutes, seconds };
    };

    const displayedTime = formatTime(totalSeconds);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {!isActive ? (
                <div className="text-base text-gray-500">Set timer</div>
            ) : (
                <div className="text-sm text-gray-500 sm:text-base">Time Left</div>
            )}
            <div className="flex space-x-2 mb-4 text-7xl text-white">
                <div className="flex flex-col items-center sm:max-w-[100px]">
                    <div className="relative">
                        <input type="text" value={displayedTime.hours} onChange={handleInputChange}
                            readOnly={!isEditing} onClick={() => setIsEditing(true)} id="hours"
                            className="border-0 bg-inherit text-center focus:outline-none focus:ring-0 w-full pb-7 font-bold sm:pb-9" placeholder="00" />
                        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-zinc-500 sm:text-2xl">hour</span>
                    </div>
                </div>
                <span className="h-full mt-2">:</span>
                <div className="flex flex-col items-center sm:max-w-[100px]">
                    <div className="relative">
                        <input type="text" value={displayedTime.minutes} onChange={handleInputChange}
                            readOnly={!isEditing} onClick={() => setIsEditing(true)} id="minutes"
                            className="border-0 bg-inherit text-center focus:outline-none focus:ring-0 w-full pb-7 font-bold sm:pb-9" placeholder="00" />
                        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-zinc-500 sm:text-2xl">hour</span>
                    </div>
                </div>
                <span className="h-full mt-2">:</span>
                <div className="flex flex-col items-center sm:max-w-[100px]">
                    <div className="relative">
                        <input type="text" value={displayedTime.seconds} onChange={handleInputChange}
                            readOnly={!isEditing} onClick={() => setIsEditing(true)} id="seconds"
                            className="border-0 bg-inherit text-center focus:outline-none focus:ring-0 w-full pb-7 font-bold sm:pb-9" placeholder="00" />
                        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-zinc-500 sm:text-2xl">hour</span>
                    </div>
                </div>
            </div>
            {isActive && (
                <div className="flex space-x-4 mb-4">
                    <button onClick={() => addTime(5)} className="add-time-btn">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>5</span> <span>min</span>
                    </button>
                    <button onClick={() => addTime(10)} className="add-time-btn">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>10</span> <span>min</span>
                    </button>
                    <button onClick={() => addTime(15)} className="add-time-btn">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>15</span> <span>min</span>
                    </button>
                    <button onClick={() => addTime(20)} className="add-time-btn">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>20</span> <span>min</span>
                    </button>
                </div>
            )}
            <div className="mt-2 flex items-center gap-3">
                {!isActive &&
                    <button onClick={handleStart} className="action-btn outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg> Start Timer
                    </button>
                }
                {
                    (isActive) &&
                    <button onClick={handlePause} className="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[12px] w-[12px] sm:h-[17px] sm:w-[17px]">
                            <rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect>
                        </svg>Pause
                    </button>
                }
                {(isActive || isPaused) && (
                    <button onClick={handleStop} className="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                        <span className="hidden sm:block">Reset</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Timer;
