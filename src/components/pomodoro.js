import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
    const [time, setTime] = useState(1500); // Default to 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && !isPaused && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!isActive || time === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, isPaused, time]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    };

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(false);
        setTime(1500);
    };

    const addTime = (minutes) => {
        setTime((prevTime) => prevTime + minutes * 60);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-2/5 m-auto">
            <div className="flex space-x-4 mb-4">
                <button onClick={() => setTime(1500)} class="flex items-center justify-center rounded-md bg-zinc-800 px-3 py-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crosshair block h-4 w-4 sm:hidden">
                        <circle cx="12" cy="12" r="10"></circle><line x1="22" x2="18" y1="12" y2="12"></line><line x1="6" x2="2" y1="12" y2="12"></line><line x1="12" x2="12" y1="6" y2="2"></line><line x1="12" x2="12" y1="22" y2="18"></line>
                    </svg>
                    <span class="hidden sm:block">Focus</span>
                </button>
                <button onClick={() => setTime(300)} class="flex items-center justify-center rounded-md px-3 py-3 transition-colors sm:py-1.5 bg-transparent text-zinc-700 hover:bg-zinc-800 hover:text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee block h-4 w-4 sm:hidden">
                        <path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                        <path d="M6 2v2"></path>
                    </svg>
                    <span class="hidden sm:block">Short Break</span>
                </button>
                <button onClick={() => setTime(900)} class="flex items-center justify-center rounded-md px-3 py-3 transition-colors sm:py-1.5 bg-transparent text-zinc-700 hover:bg-zinc-800 hover:text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-footprints block h-4 w-4 sm:hidden">
                        <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path>
                        <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path>
                        <path d="M16 17h4"></path>
                        <path d="M4 13h4"></path>
                    </svg>
                    <span class="hidden sm:block">Long Break</span>
                </button>
            </div>
            <div className="relative my-8 flex flex-col gap-2 text-6xl font-bold text-gray-100 sm:my-8 sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">{formatTime(time)}</div>
            <div class="mx-auto mb-3 mt-2 h-1 w-[200px] overflow-hidden rounded-lg bg-zinc-800 sm:w-full"><div class="h-full rounded-lg bg-zinc-500 transition-all w-0"></div></div>
            <div className="flex space-x-4 mb-4">
                <button onClick={() => addTime(5)} class="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                    <span>+<span class="hidden sm:inline">&nbsp;</span>5</span> <span>min</span>
                </button>
                <button onClick={() => addTime(10)} class="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                    <span>+<span class="hidden sm:inline">&nbsp;</span>10</span> <span>min</span>
                </button>
                <button onClick={() => addTime(15)} class="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                    <span>+<span class="hidden sm:inline">&nbsp;</span>15</span> <span>min</span>
                </button>
                <button onClick={() => addTime(20)} class="flex flex-col items-center justify-center rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-400 sm:block sm:bg-transparent sm:px-2">
                    <span>+<span class="hidden sm:inline">&nbsp;</span>20</span> <span>min</span>
                </button>
            </div>
            <div className='mt-5 flex items-center gap-1.5 sm:gap-3'>
                {isActive ? (
                    <>
                        <button onClick={() => setIsPaused((prev) => !prev)} class="flex items-center justify-center bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                            {isPaused ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play block h-4 w-4 sm:hidden">
                                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause block h-4 w-4 sm:hidden">
                                    <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                                    <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                                </svg>
                            }
                            <span class="hidden sm:block">{isPaused ? 'Resume' : 'Pause'}</span>
                        </button>
                        <button onClick={handleStop} class="flex items-center justify-center bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw block h-4 w-4 sm:hidden">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                            <span class="hidden sm:block">Reset</span>
                        </button>
                    </>
                ) : (
                    <button onClick={() => setIsActive(true)} class="flex items-center justify-center bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play block h-4 w-4 sm:hidden">
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg>
                        <span class="hidden sm:block">Start</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pomodoro;