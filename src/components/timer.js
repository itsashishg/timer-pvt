import React, { useState, useEffect } from 'react';
import { PauseBtn, ResetBtn, StartBtn, AddTimeBtn } from './elements/buttons';

const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [audio] = useState(new Audio('/timely/tin-tin-tin.mp3'));

    useEffect(() => {
        let interval = null;
        if (isActive && !isPaused && totalSeconds > 0) {
            interval = setInterval(() => {
                setTotalSeconds((prevTime) => prevTime - 1);
            }, 1000);
        } else if (isActive && totalSeconds === 0) {
            clearInterval(interval);
            audio.play();
            alert('Time is up!');
            setIsActive(false);
        } else if (!isActive) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, isPaused, totalSeconds, audio]);

    useEffect(() => {
        if (isActive) {
            let currentTime = formatTime(totalSeconds);
            document.title = `${currentTime.hours !== '00' ? currentTime.hours + ':' : ''}${currentTime.minutes}:${currentTime.seconds} : left!`;
        } else {
            document.title = 'Timely: Timer';
        }
    }, [isActive, totalSeconds]);

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
        <div className="h-full w-full flex flex-col p-2">
            <div className="flex justify-between items-center text-white my-2">
                <div></div>
                <span className="flex justify-between gap-2">
                    <div className="h-10"></div>
                </span>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center sm:w-2/5 m-auto">
                {!isActive ? (
                    <div className="text-base text-gray-500">Click to set timer</div>
                ) : (
                    <div className="text-sm text-gray-500 sm:text-base">Time Left</div>
                )}
                <div className="flex space-x-2 mb-4 text-6xl sm:text-8xl text-white">
                    <div className="flex flex-col items-center sm:max-w-[130px]">
                        <div className="relative">
                            <input type="text" value={displayedTime.hours} onChange={handleInputChange}
                                readOnly={!isEditing} onClick={() => setIsEditing(true)} id="hours"
                                className="border-0 bg-inherit text-center focus:outline-none focus:ring-0 w-full pb-7 font-bold sm:pb-9" placeholder="00" />
                            <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-zinc-500 sm:text-2xl">hour</span>
                        </div>
                    </div>
                    <span className="h-full mt-2">:</span>
                    <div className="flex flex-col items-center sm:max-w-[130px]">
                        <div className="relative">
                            <input type="text" value={displayedTime.minutes} onChange={handleInputChange}
                                readOnly={!isEditing} onClick={() => setIsEditing(true)} id="minutes"
                                className="border-0 bg-inherit text-center focus:outline-none focus:ring-0 w-full pb-7 font-bold sm:pb-9" placeholder="00" />
                            <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-zinc-500 sm:text-2xl">minutes</span>
                        </div>
                    </div>
                    <span className="h-full mt-2">:</span>
                    <div className="flex flex-col items-center sm:max-w-[130px]">
                        <div className="relative">
                            <input type="text" value={displayedTime.seconds} onChange={handleInputChange}
                                readOnly={!isEditing} onClick={() => setIsEditing(true)} id="seconds"
                                className="border-0 bg-inherit text-center focus:outline-none focus:ring-0 w-full pb-7 font-bold sm:pb-9" placeholder="00" />
                            <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-zinc-500 sm:text-2xl">seconds</span>
                        </div>
                    </div>
                </div>
                {
                    isActive &&
                    <>
                        <div className="mx-auto mb-3 mt-2 h-1 w-[200px] overflow-hidden rounded-lg bg-zinc-800 sm:w-full"><div className="h-full rounded-lg bg-zinc-500 transition-all w-0"></div></div>
                        <div className="flex space-x-4 mb-4">
                            <AddTimeBtn emitTime={() => addTime(5)} showVal={5} />
                            <AddTimeBtn emitTime={() => addTime(10)} showVal={10} />
                            <AddTimeBtn emitTime={() => addTime(15)} showVal={15} />
                            <AddTimeBtn emitTime={() => addTime(20)} showVal={20} />
                        </div>
                    </>
                }
                <div className="mt-2 flex items-center gap-3">
                    {!isActive && <StartBtn emitStart={handleStart} />}
                    {(isActive) && <PauseBtn emitPause={handlePause} />}
                    {(isActive || isPaused) && (<ResetBtn emitStop={handleStop} />)}
                </div>
            </div>
        </div>
    );
};

export default Timer;
