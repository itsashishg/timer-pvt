export const ResetBtn = ({ emitStop }) => {
    return <>
        <button onClick={emitStop} className="action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
            </svg>
            <span className="hidden sm:block">Reset</span>
        </button>
    </>;
}


export const PauseBtn = ({ emitPause }) => {
    return <>
        <button onClick={emitPause} className="action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[12px] w-[12px] sm:h-[17px] sm:w-[17px]">
                <rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect>
            </svg>
            <span className="hidden sm:block">Pause</span>
        </button>
    </>;
}


export const StartBtn = ({ emitStart }) => {
    return <>
        <button onClick={emitStart} className="action-btn outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
            <span className="hidden sm:block">Start</span>
        </button>
    </>;
}


export const AddTimeBtn = ({ emitTime, showVal }) => {
    return <>
        <button onClick={emitTime} className="add-time-btn">
            <span>+<span className="hidden sm:inline">&nbsp;</span>{showVal}</span> <span>min</span>
        </button>
    </>;
}