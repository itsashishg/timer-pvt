import React, { useEffect, useState } from "react";

const Planner = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    // const [taskDetails, setTaskDetails] = useState({ date: new Date(), tasks: [] });

    // useEffect(() => {
    //     setCurrentDate(new Date());
    // }, []);

    const handleChangeDate = (type) => {
        if (type === '<') {
            const previousDay = new Date(currentDate);
            previousDay.setDate(currentDate.getDate() - 2);
            setCurrentDate(previousDay);
        }
        else {
            const nextDay = new Date(currentDate);
            nextDay.setDate(currentDate.getDate() + 5);
            setCurrentDate(nextDay);
        }
    };

    const generateView = (date) => {
        const viewArray = [];
        const today = date;
        console.log(date)
        const previousDay = new Date(today);
        previousDay.setDate(today.getDate() - 1);
        viewArray.push({ date: previousDay, tasks: [] });

        viewArray.push({ date: today, tasks: [] });

        for (let i = 1; i <= 3; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            viewArray.push({ date: nextDay, tasks: [] });
        }

        return <>
            <div className="flex items-center justify-between h-full w-full gap-2 p-2">
                {
                    viewArray.map((dayAndTask, index) => (
                        <div className="h-full w-full rounded-md p-1" key={index}>{dayAndTask.date.toDateString()}</div>
                    ))
                }
            </div>
        </>;
    }

    return <div className="h-full w-full flex flex-col">
        <div className="flex justify-between text-white p-2">
            <span>Planner</span>
            <span>Add routine  bg-gray-500tasks</span>
        </div>
        <div className="flex justify-between items-center">
            <span>Today</span>
            <span className="flex justify-between gap-1">
                <button onClick={() => handleChangeDate('<')} className="bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                    <span>&lt;</span>
                </button>
                <button onClick={() => handleChangeDate('>')} className="bg-zinc-800 px-3 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:py-1.5 rounded-lg py-2">
                    <span>&gt;</span>
                </button>
            </span>
        </div>
        <div className="flex-grow">{generateView(currentDate)}</div>
    </div>;
}

export default Planner;