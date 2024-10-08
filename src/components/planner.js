import React, { useEffect, useState } from "react";
import DisplayCol from "./elements/displayCol";
import useWindowSize from './custom-hooks/window-size';

const Planner = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const screenSize = useWindowSize().type;
    // const [taskDetails, setTaskDetails] = useState({ date: new Date(), tasks: [] });

    // useEffect(() => {
    //     setCurrentDate(new Date());
    // }, []);

    const handleChangeDate = (type) => {
        const newDate = new Date(currentDate);
        type === '<' ? newDate.setDate(currentDate.getDate() - (screenSize === 'xs' ? 1 : 2)) : newDate.setDate(currentDate.getDate() + (screenSize === 'xs' ? 1 : 5));
        setCurrentDate(newDate);
    };

    const generateView = (date) => {
        const viewArray = [];
        const today = date;

        if (screenSize !== 'xs' && screenSize !== 'sm') {
            const previousDay = new Date(today);
            previousDay.setDate(today.getDate() - 1);
            viewArray.push({ date: previousDay, tasks: [] });
        }

        viewArray.push({ date: today, tasks: [] });

        for (let i = 1; i < (screenSize === 'xs' ? 0 : screenSize === 'sm' ? 2 : 3); i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            viewArray.push({ date: nextDay, tasks: [] });
        }

        return <>
            <div className="flex items-center flex-col justify-between h-full w-full gap-2 sm:flex-row">
                {
                    viewArray.map((dayAndTask, index) => (
                        <DisplayCol key={index} data={dayAndTask} />
                    ))
                }
            </div >
        </>;
    }

    return <div className="h-full w-full flex flex-col p-2">
        <div className="flex justify-between items-center text-white m-2">
            <span className="hidden sm:inline">Planner</span>
            <span className="flex justify-between gap-2">
                <button className="planner-btn border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m17 2 4 4-4 4"></path>
                        <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                        <path d="m7 22-4-4 4-4"></path>
                        <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                    </svg>
                    <span className="hidden items-center gap-1.5 sm:inline-flex">Routine</span>
                </button>
                <button className="planner-btn justify-between hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-90">Today</button>
                <button className="planner-btn hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2v4"></path><path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                    </svg>
                </button>
                <button onClick={() => handleChangeDate('<')} className="change-date-btn">
                    <span>&lt;</span>
                </button>
                <button onClick={() => handleChangeDate('>')} className="change-date-btn">
                    <span>&gt;</span>
                </button>
            </span>
        </div>
        <div className="flex-grow">{generateView(currentDate)}</div>
    </div>;
}

export default Planner;