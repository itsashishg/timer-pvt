import { useEffect, useState } from "react";
import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

export default function Routine({ isOpen, onClose, currentValue, newRoutineHandler, updateRoutineHandler }) {
    useEscapeKeyListener(onClose);

    const [taskName, setTaskName] = useState('');
    const [routineType, setRoutineType] = useState('DAILY');
    const [daysList, setDaysList] = useState([]);
    const [datesList, setDatesList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(true);

    useEffect(() => {
        setTaskName('');
        setRoutineType('DAILY');
        setDaysList([]);
        setDatesList([]);
    }, [isOpen])

    if (!isOpen) return null;

    const handleOverlayClick = (event) => { onClose() };
    const handleDialogClick = (event) => { event.stopPropagation() };
    const upsertDay = (day) => {
        const newList = daysList;
        newList.find(d => d === day) ? newList.filter(e => e !== day) : newList.push(day);
        setDaysList([...newList]);
    }
    const upsertDate = (date) => {
        const newList = datesList;
        newList.find(d => d === date) ? newList.filter(e => e !== date) : newList.push(date);
        setDatesList([...newList]);
    }
    const handleFormSubmit = () => {
        newRoutineHandler({ taskName: taskName, type: routineType, days: daysList, dates: datesList });
        onClose();
    }
    const getActiveClass = (type, val) => {
        if (type === 'DAY') {
            return daysList.find(d => d === val) ? 'routine-btn active-routine-btn' : 'routine-btn';
        }
        else {
            return datesList.find(e => e === val) ? 'routine-btn active-routine-btn' : 'routine-btn';
        }
    }

    const editTemplate = () => {
        return <>
            <div className="mx-auto w-full">
                <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter task" className="mb-3 w-full rounded-md bg-zinc-800 px-3 py-2 text-zinc-300 outline-none focus:ring-0" />
                <p className="mb-2">Select routing type</p>
                <div className="mb-3 flex items-center justify-around">
                    <button type="button" onClick={() => setRoutineType('DAILY')}
                        className={`routine-btn ${routineType === 'DAILY' ? 'active-routine-btn' : ''}`}>daily</button>
                    <button type="button" onClick={() => setRoutineType('WEEKLY')}
                        className={`routine-btn ${routineType === 'WEEKLY' ? 'active-routine-btn' : ''}`}>weekly</button>
                    <button type="button" onClick={() => setRoutineType('MONTHLY')}
                        className={`routine-btn ${routineType === 'MONTHLY' ? 'active-routine-btn' : ''}`}>monthly</button>
                </div>
                {
                    (routineType === 'WEEKLY') &&
                    <div className="mb-3">
                        <p className="mb-2">On which days</p>
                        <div className="grid grid-cols-4 gap-2">
                            {
                                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => <button key={i} type="button" onClick={() => upsertDay(day)} className={`${getActiveClass('DAY', day)}`}>{day}</button>)
                            }
                        </div>
                    </div>
                }
                {
                    (routineType === 'MONTHLY') &&
                    <div className="mb-3">
                        <p className="mb-2">On which dates</p>
                        <div className="grid grid-cols-7 gap-2">
                            {
                                Array(32).fill().map((date, i) => <button key={i} type="button" onClick={() => upsertDate(i)} className={`${getActiveClass('DATE', i)}`}>{i}</button>)
                            }
                        </div>
                    </div>
                }
                <button type="submit" onClick={handleFormSubmit} className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0">Add Routine</button>
            </div>
        </>
    }

    const showTemplate = () => {
        return <>
            <div class="grid grid-cols-auto-fill-300 gap-2">
                {/* <div class="flex flex-shrink-0 flex-col rounded-lg bg-zinc-800 px-3 py-3">
                    <div class="flex items-center justify-between">
                        <h4 class="text-sm text-zinc-300">SSS</h4>
                    </div>
                    <div class="flex flex-grow flex-col">
                        <div class="mt-2 flex items-center gap-1 text-sm capitalize text-zinc-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat2 inline-block h-4 w-4">
                                <path d="m2 9 3-3 3 3"></path>
                                <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                                <path d="m22 15-3 3-3-3"></path>
                                <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
                            </svg>daily
                        </div>
                    </div>
                    <div class="mb-0.5 mt-4 flex items-center justify-end gap-3 text-zinc-500">
                        <button class="tracking-wide] flex items-center gap-1 text-xs uppercase hover:text-zinc-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen h-4 w-4">
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                            </svg>Edit
                        </button>
                        <button class="flex items-center gap-1 text-xs uppercase tracking-wide hover:text-zinc-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>Delete
                        </button>
                    </div>
                </div> */}
                {

                }
                <div className="flex flex-shrink-0 flex-col rounded-lg bg-zinc-800 px-3 py-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm text-zinc-300">dscc</h4>
                    </div>
                    <div className="flex flex-grow flex-col">
                        <div className="mt-2 flex items-center gap-1 text-sm capitalize text-zinc-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block h-4 w-4" >
                                <path d="m2 9 3-3 3 3"></path>
                                <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                                <path d="m22 15-3 3-3-3"></path>
                                <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
                            </svg>
                            weekly
                        </div>
                        <div className="my-3 flex flex-wrap items-center gap-1">
                            <span className="rounded bg-zinc-700 px-1 py-0.5 text-xs uppercase tracking-wide text-zinc-400">fri</span>
                            <span className="rounded bg-zinc-700 px-1 py-0.5 text-xs uppercase tracking-wide text-zinc-400">mon</span>
                        </div>
                    </div>
                    <div className="mb-0.5 mt-4 flex items-center justify-end gap-3 text-zinc-500">
                        <button className="tracking-wide flex items-center gap-1 text-xs uppercase hover:text-zinc-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                            </svg>
                            Edit
                        </button>
                        <button className="flex items-center gap-1 text-xs uppercase tracking-wide hover:text-zinc-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>;
    }


    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 flex flex-col rounded-lg border" onClick={handleDialogClick}>
                <p className="text-center mb-2 font-bold">Routine Task</p>
                {isUpdate ? editTemplate() : showTemplate()}
            </div>
        </div>
    );
}