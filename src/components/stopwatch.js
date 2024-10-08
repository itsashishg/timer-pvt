import React, { useEffect, useState } from 'react';
import { ResetBtn, StartBtn, PauseBtn } from './elements/buttons';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        document.title = 'Timely: Stopwatch';
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
        setIsPaused(false);
    };

    const handleLap = () => {
        if (laps.length > 0) {
            setLaps([{ lapTime: time - laps[0].elapsedTime, elapsedTime: time }, ...laps]);
        }
        else {
            setLaps([{ lapTime: time, elapsedTime: time }, ...laps]);
        }
    };

    const renderFormattedTime = (time, textClass, subTextClass) => {
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 1);

        return (
            <div className="flex items-baseline">
                {hours > 0 && (
                    <span className={`${textClass} font-bold`}>{hours}</span>
                )}
                {hours > 0 && <span className={`${subTextClass} ml-1 text-zinc-500 mr-5`}>h</span>}
                {minutes > 0 && (
                    <span className={`${textClass} font-bold`}>{minutes}</span>
                )}
                {(minutes > 0 || hours > 0) && <span className={`${subTextClass} ml-1 text-zinc-500 mr-5`}>m</span>}
                <span className={`${textClass} font-bold`}>{seconds}</span>
                <span className={`${subTextClass} ml-1 text-zinc-500 mr-5`}>s</span>
                <span className={`${textClass} font-bold`}>{milliseconds.toString().padStart(3, '0')}</span>
                <span className={`${subTextClass} ml-1 text-zinc-500 mr-5`}>ms</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-3 flex flex-row gap-2 text-8xl font-medium tabular-nums text-white">{renderFormattedTime(time, 'text-8xl', 'text-lg')}</h1>
            <div className="mb-4 mt-2 flex items-center gap-3">
                {!isActive && <StartBtn emitStart={handleStart} />}
                {
                    (isActive) && <>
                        <PauseBtn emitPause={handlePause} />
                        <button onClick={handleLap} className="action-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                <line x1="4" x2="4" y1="22" y2="15"></line>
                            </svg>
                            <span className="hidden sm:block">Lap</span>
                        </button>
                    </>
                }
                {(isActive || isPaused) && <ResetBtn emitStop={handleReset} />}
            </div>
            {laps.length > 0 && (
                <div class="overflow-auto max-h-36 relative w-2/5 mx-auto rounded-xl flex flex-col">
                    {laps.map((lap, index) => (
                        <div class={`flex items-center justify-between px-3 py-2 ${index % 2 === 0 ? 'bg-neutral-700' : 'bg-neutral-800'}`}>
                            <span className="text-white font-semibold">Lap {laps.length - index}</span>
                            <div class="flex flex-col">
                                <strong class="text-slate-900 font-medium dark:text-slate-200 mb-1">{renderFormattedTime(lap.lapTime, 'text-sm', 'text-xs')}</strong>
                                <span class="text-slate-500 font-medium dark:text-slate-400">{renderFormattedTime(lap.elapsedTime, 'text-sm', 'text-xs')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Stopwatch;

