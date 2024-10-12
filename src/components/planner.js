import React, { useEffect, useState, forwardRef } from "react";
import DisplayCol from "./elements/displayCol";
import useWindowSize from './custom-hooks/window-size';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Routine from "./elements/routine";
import { SettingBtn } from "./elements/buttons";
import PlannerSettings from "./settings/planner-settings";

const Planner = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const screenSize = useWindowSize().type;
    const [taskDetails, setTaskDetails] = useState(new Map());
    const [routineTasks, setRoutineTasks] = useState([]);
    const [openRoutine, setOpenRoutine] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const CustomPicker = forwardRef(
        ({ onClick }, ref) => (
            <button onClick={onClick} ref={ref} className="h-[40px!important] planner-btn hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"></path><path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                </svg>
            </button>
        ),
    );

    useEffect(() => {
        const mapArray = JSON.parse(localStorage.getItem('userTasks'));
        const routineData = JSON.parse(localStorage.getItem('routineTasks'));
        setTaskDetails(new Map(mapArray));
        setRoutineTasks(routineData ?? []);
        document.title = 'Timely: Planner';
    }, []);

    const handleChangeDate = (type) => {
        const newDate = new Date(currentDate);
        type === '<' ? newDate.setDate(currentDate.getDate() - (screenSize === 'xs' ? 1 : 3)) : newDate.setDate(currentDate.getDate() + (screenSize === 'xs' ? 1 : 4));
        setCurrentDate(newDate);
    };

    const updateValues = (date, newList) => {
        const updatedMap = new Map(taskDetails);
        updatedMap.set(date, newList);
        setTaskDetails(updatedMap);
        storeInLocalStorage(Array.from(updatedMap.entries()), 'userTasks');
    }

    const addNewRoutine = (newRoutine) => {
        const newList = routineTasks;
        newList.push({ ...newRoutine, id: uuid(routineTasks.map((task) => task.id)) });
        setRoutineTasks(newList);
        storeInLocalStorage(newList, 'routineTasks');
    }

    const storeInLocalStorage = (data, key) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const clearTasks = () => {
        setTaskDetails(new Map());
        localStorage.removeItem('userTasks');
    }

    const taskManager = (date) => {
        const currentTaskList = taskDetails.get(date.toDateString()) ?? [];

        routineTasks.forEach((routine) => {
            if (currentTaskList.find(task => task.routineTaskId === routine.id) === undefined && !(date <= new Date().setHours(0, 0, 0, 0))) {
                if (routine.type === 'DAILY') {
                    currentTaskList.push({ id: currentTaskList.length + 1, desc: routine.taskName, isDone: false, isRoutine: true, routineTaskId: routine.id });
                }
                else if (routine.type === 'WEEKLY') {
                    let daysToBeAdded = routine.days ?? [];
                    daysToBeAdded.forEach((day) => {
                        if (day === getCurrentDay(date)) {
                            currentTaskList.push({ id: currentTaskList.length + 1, desc: routine.taskName, isDone: false, isRoutine: true, routineTaskId: routine.id });
                        }
                    });
                }
                else if (routine.type === 'MONTHLY') {
                    let datesToBeAdded = routine.dates ?? [];
                    datesToBeAdded.forEach((day) => {
                        if (day === date.getDate()) {
                            currentTaskList.push({ id: currentTaskList.length + 1, desc: routine.taskName, isDone: false, isRoutine: true, routineTaskId: routine.id });
                        }
                    });
                }
            }
        });


        return currentTaskList;
    }

    const generateView = (date) => {
        const viewArray = [];

        if (screenSize !== 'xs' && screenSize !== 'sm') {
            const previousDay = new Date(new Date(date).setDate(date.getDate() - 1));
            viewArray.push({ date: previousDay.toDateString(), tasks: taskManager(previousDay) });
        }

        viewArray.push({ date: new Date(date).toDateString(), tasks: taskManager(new Date(date)) });

        for (let i = 1; i < (screenSize === 'xs' ? 0 : screenSize === 'sm' ? 2 : 3); i++) {
            const nextDay = new Date(new Date(date).setDate(date.getDate() + i));
            viewArray.push({ date: nextDay.toDateString(), tasks: taskManager(nextDay) });
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
            <div className="flex justify-between gap-2">
                <button onClick={() => handleChangeDate('<')} className="change-date-btn flex">
                    <span>&lt;</span>
                </button>
                <button onClick={() => handleChangeDate('>')} className="change-date-btn flex">
                    <span>&gt;</span>
                </button>
                <button onClick={() => setCurrentDate(new Date())} className="planner-btn justify-between hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-90">Today</button>
                <DatePicker selected={currentDate} onChange={(date) => setCurrentDate(date)} customInput={<CustomPicker />} />
            </div>
            <span className="flex justify-between gap-2 mr-10 sm:mr-0">
                <button onClick={() => setOpenRoutine(true)} className="planner-btn border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m17 2 4 4-4 4"></path>
                        <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                        <path d="m7 22-4-4 4-4"></path>
                        <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                    </svg>
                    <span className="hidden items-center gap-1.5 sm:inline-flex">Routine</span>
                </button>
                <SettingBtn emitClick={() => setOpenSetting(true)} />
            </span>
        </div>
        <div className="flex-grow overflow-y-auto">{generateView(currentDate)}</div>
        <Routine isOpen={openRoutine} onClose={() => setOpenRoutine(false)} newRoutineHandler={addNewRoutine} currentValue={routineTasks} />
        <PlannerSettings isOpen={openSetting} onClose={() => setOpenSetting(false)} updateHandler={clearTasks} />
    </div>;
}

export default Planner;

function uuid(existingUIDs) {
    let uid;
    do {
        uid = Math.floor(1000 + Math.random() * 9000).toString();
    } while (existingUIDs.includes(uid));
    return uid;
}
function getCurrentDay(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
}