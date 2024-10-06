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

    const handleInputChange = (field, value) => {
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
            <div className="flex space-x-2 mb-4 text-7xl" onClick={() => setIsEditing(true)}>
                <input type="number" value={displayedTime.hours}
                    onChange={(e) => handleInputChange('hours', e.target.value)} className={`border-none bg-inherit`}
                    disabled={!isEditing} max="99" min="0" />
                <span className="h-full ">:</span>
                <input type="number" value={displayedTime.minutes}
                    onChange={(e) => handleInputChange('minutes', e.target.value)} className={`border-none bg-inherit p-2`}
                    disabled={!isEditing} max="59" min="0" />
                <span>:</span>
                <input type="number" value={displayedTime.seconds} onClick={() => setIsEditing(true)}
                    onChange={(e) => handleInputChange('seconds', e.target.value)} className={`border-none bg-inherit p-2`}
                    disabled={!isEditing} max="59" min="0" />
            </div>
            <div className="flex space-x-4">
                {!isActive && (
                    <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Start
                    </button>
                )}
                {isActive && (
                    <>
                        <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Pause
                        </button>
                        <button onClick={handleStop} className="bg-red-500 text-white px-4 py-2 rounded">
                            Stop

                        </button>
                    </>
                )}
            </div>
            {isActive && (
                <div className="mt-4">
                    <button onClick={() => addTime(5)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                        +5 min
                    </button>
                    <button onClick={() => addTime(10)} className="bg-green-500 text-white px-4 py-2 rounded">
                        +10 min
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
