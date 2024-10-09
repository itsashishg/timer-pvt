import React, { useEffect, useState } from "react";
import DisplayCol from "./elements/displayCol";
import useWindowSize from './custom-hooks/window-size';

const Planner = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const screenSize = useWindowSize().type;
    const [taskDetails, setTaskDetails] = useState(new Map());

    // To add mock entries
    useEffect(() => {
        // setTaskDetails(new Map().set(new Date().toDateString(), [{ id: 1, desc: 'Something' }, { id: 1, desc: 'Anything' }, { id: 1, desc: 'Nothing' }, { id: 1, desc: 'Everything' }]))
        const currentMap = new Map();
        currentMap.set(new Date().toDateString(), [{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false },{ id: 1, desc: 'Something', isDone: true }, { id: 2, desc: 'Anything', isDone: false }]);
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        currentMap.set(nextDay.toDateString(), [{ id: 1, desc: 'Nothing', isDone: false }, { id: 2, desc: 'Everything', isDone: false }]);
        setTaskDetails(currentMap);
    }, []);

    const handleChangeDate = (type) => {
        const newDate = new Date(currentDate);
        type === '<' ? newDate.setDate(currentDate.getDate() - (screenSize === 'xs' ? 1 : 3)) : newDate.setDate(currentDate.getDate() + (screenSize === 'xs' ? 1 : 4));
        setCurrentDate(newDate);
    };

    const updateValues = (date, newList) => {
        const currentData = taskDetails;
        currentData.set(date, newList);
        setTaskDetails(currentData);
    }

    const generateView = (date) => {
        const viewArray = [];

        if (screenSize !== 'xs' && screenSize !== 'sm') {
            const previousDay = new Date(new Date(date).setDate(date.getDate() - 1)).toDateString();
            viewArray.push({ date: previousDay, tasks: taskDetails.get(previousDay) ?? [] });
        }

        viewArray.push({ date: new Date(date).toDateString(), tasks: taskDetails.get(new Date(date).toDateString()) ?? [] });

        for (let i = 1; i < (screenSize === 'xs' ? 0 : screenSize === 'sm' ? 2 : 3); i++) {
            const nextDay = new Date(new Date(date).setDate(date.getDate() + i)).toDateString();
            viewArray.push({ date: nextDay, tasks: taskDetails.get(nextDay) ?? [] });
        }

        return <>
            <div className="flex items-center flex-col justify-between h-full w-full gap-2 sm:flex-row">
                {
                    viewArray.map((dayAndTask, index) => (
                        <DisplayCol key={index} data={dayAndTask} updateTask={updateValues} />
                    ))
                }
            </div >
        </>;
    }

    return <div className="h-full w-full flex flex-col p-2">
        <div className="flex justify-between items-center text-white my-2">
            <span className="hidden sm:inline text-3xl font-semibold">Planner</span>
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
                <button onClick={() => setCurrentDate(new Date())} className="planner-btn justify-between hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-90">Today</button>
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
        <div className="flex-grow overflow-y-auto">{generateView(currentDate)}</div>
    </div>;
}

export default Planner;