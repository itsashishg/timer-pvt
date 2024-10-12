import React, { useState, useEffect } from 'react';
import { AddTimeBtn, ResetBtn, SettingBtn, StartBtn } from './elements/buttons';
import PomodoroSettings from './settings/pomodoro-settings';

const Pomodoro = () => {
    const [settings, setSettings] = useState({ pomodoro: 1500, short: 300, long: 900 });
    const [time, setTime] = useState(settings.pomodoro);
    const [mode, setMode] = useState('focus');
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audio] = useState(new Audio('/timely/tin-tin-tin.mp3'));
    const [openSetting, setOpenSetting] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && !isPaused && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            clearInterval(interval);
            audio.play();
            alert('Time is up!');
            setIsActive(false);
        } else if (!isActive) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, isPaused, time, audio]);

    useEffect(() => {
        setTime(mode === 'focus' ? settings.pomodoro : mode === 'short' ? settings.short : settings.long);
    }, [settings, mode]);

    useEffect(() => {
        if (isActive) {
            let currentString = formatTime(time);
            if (mode === 'focus') {
                currentString += ' : Focus';
            }
            else if (mode === 'short') {
                currentString += ' : Short Break';
            }
            else {
                currentString += ' : Long Break';
            }
            document.title = currentString;
        } else {
            document.title = 'Timely: Pomodoro';
        }
    }, [isActive, time, mode]);

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
        setTime(settings.pomodoro);
    };

    const addTime = (minutes) => {
        setTime((prevTime) => prevTime + minutes * 60);
    };

    function handleChangeMode(mode, time) {
        setMode(mode);
        setIsActive(false);
        setIsPaused(false);
        setTime(time);
    }

    return (
        <div className="h-full w-full flex flex-col p-2">
            <div className="flex justify-between items-center text-white my-2">
                <div></div>
                <span className="flex justify-between gap-2 mr-10 sm:mr-0">
                    <SettingBtn emitClick={() => setOpenSetting(true)} />
                    <PomodoroSettings isOpen={openSetting} onClose={() => setOpenSetting(false)} currentValue={settings} updateHandler={setSettings} />
                </span>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center sm:w-2/5 m-auto">

                <div className="flex space-x-4 mb-4 -mt-11">
                    <button onClick={() => handleChangeMode('focus', settings.pomodoro)} className={`${mode === 'focus' ? 'action-btn' : 'inactive-btn'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4 sm:hidden">
                            <circle cx="12" cy="12" r="10"></circle><line x1="22" x2="18" y1="12" y2="12"></line><line x1="6" x2="2" y1="12" y2="12"></line><line x1="12" x2="12" y1="6" y2="2"></line><line x1="12" x2="12" y1="22" y2="18"></line>
                        </svg>
                        <span className="hidden sm:block">Focus</span>
                    </button>
                    <button onClick={() => handleChangeMode('short', settings.short)} className={`${mode === 'short' ? 'action-btn' : 'inactive-btn'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4 sm:hidden">
                            <path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                            <path d="M6 2v2"></path>
                        </svg>
                        <span className="hidden sm:block">Short Break</span>
                    </button>
                    <button onClick={() => handleChangeMode('long', settings.long)} className={`${mode === 'long' ? 'action-btn' : 'inactive-btn'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4 sm:hidden">
                            <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path>
                            <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path>
                            <path d="M16 17h4"></path>
                            <path d="M4 13h4"></path>
                        </svg>
                        <span className="hidden sm:block">Long Break</span>
                    </button>
                </div>
                <div className="relative mb-8 flex flex-col gap-2 font-bold text-gray-100 text-8xl">{formatTime(time)}</div>
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
                <div className='mt-5 flex items-center gap-1.5 sm:gap-3'>
                    {isActive ? (
                        <>
                            <button onClick={() => setIsPaused((prev) => !prev)} className="action-btn">
                                {isPaused ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[12px] w-[12px] sm:h-[17px] sm:w-[17px]">
                                        <rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect>
                                    </svg>
                                }
                                <span className="hidden sm:block">{isPaused ? 'Resume' : 'Pause'}</span>
                            </button>
                            <ResetBtn emitStop={handleStop} />
                        </>
                    ) : (
                        <StartBtn emitStart={() => setIsActive(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pomodoro;