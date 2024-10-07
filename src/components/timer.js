import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(false);
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

    function isNumber(value) {
        // eslint-disable-next-line no-mixed-operators
        return typeof value === 'number' && isFinite(value) || typeof value === 'string' && value.trim() !== '' && !isNaN(value);
    }

    const handleInputChange = (field, value) => {
        if (!isNumber(value)) {
            return null;
        }
        const numValue = Math.max(0, Math.min(99, Number(value)));
        setTime((prev) => ({ ...prev, [field]: numValue }));
        if (field === 'hours') {
            setTotalSeconds(numValue * 3600 + time.minutes * 60 + time.seconds);
        } else if (field === 'minutes') {
            setTotalSeconds(time.hours * 3600 + numValue * 60 + time.seconds);
        } else if (field === 'seconds') {
            setTotalSeconds(time.hours * 3600 + time.minutes * 60 + numValue);
        }
    };

    const handleStart = () => {
        setIsActive(true);
        setIsEditing(false);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleStop = () => {
        setIsActive(false);
        setTotalSeconds(0);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsEditing(false);
    };

    const addTime = (minutes) => {
        setTotalSeconds((prev) => prev + minutes * 60);
    };

    const formatTime = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const seconds = sec % 60;
        return { hours, minutes, seconds };
    };

    const displayedTime = isActive ? formatTime(totalSeconds) : time;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex space-x-2 mb-4 text-7xl text-white">
                <input value={displayedTime.hours} onClick={() => setIsEditing(true)}
                    onChange={(e) => handleInputChange('hours', e.target.value)} className={`border-0 focus:outline-none focus:ring-0 bg-inherit text-center`}
                    readOnly={!isEditing} max="99" min="0" />
                <span className="h-full mt-2">:</span>
                <input value={displayedTime.minutes}
                    onChange={(e) => handleInputChange('minutes', e.target.value)} className={`border-0 focus:outline-none focus:ring-0 bg-inherit p-2 text-center`}
                    readOnly={!isEditing} max="59" min="0" />
                <span className="h-full mt-2">:</span>
                <input value={displayedTime.seconds} onClick={() => setIsEditing(true)}
                    onChange={(e) => handleInputChange('seconds', e.target.value)} className={`border-0 focus:outline-none focus:ring-0 bg-inherit p-2 text-center`}
                    readOnly={!isEditing} max="59" min="0" />
            </div>
            <div className="flex space-x-4">
                {!isActive && (
                    <button onClick={handleStart} className="flex items-center justify-center bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4 sm:hidden">
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg>
                        <span className="hidden sm:block">Start</span>
                    </button>
                )}
                {isActive && (
                    <>
                        <button onClick={handlePause} className="flex items-center justify-center bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4 sm:hidden">
                                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                            </svg>
                            <span className="hidden sm:block">Pause</span>
                        </button>
                        <button onClick={handleStop} className="flex h-[32px] items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 md:h-[40px] md:px-4 md:py-2 md:text-base lg:h-[44px] lg:rounded-lg lg:text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                            <span className="hidden sm:block">Reset</span>
                        </button>
                    </>
                )}
            </div>
            {isActive && (
                <div className="flex space-x-4 mb-4">
                    <button onClick={() => addTime(5)} className="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>5</span> <span>min</span>
                    </button>
                    <button onClick={() => addTime(10)} className="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>10</span> <span>min</span>
                    </button>
                    <button onClick={() => addTime(15)} className="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>15</span> <span>min</span>
                    </button>
                    <button onClick={() => addTime(20)} className="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                        <span>+<span className="hidden sm:inline">&nbsp;</span>20</span> <span>min</span>
                    </button>
                </div>
            )}
            {!isActive && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                    Edit Time
                </button>
            )}
        </div>
    );
};

export default Timer;
