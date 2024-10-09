import { useEffect, useState } from "react";
import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

export default function Routine({ isOpen, onClose }) {
    useEscapeKeyListener(onClose);
    const [routineTask, setRoutineTask] = useState({ task: '', type: '', day: '', date: '' });
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const handleOverlayClick = (event) => { onClose() };
    const handleDialogClick = (event) => { event.stopPropagation() };
    const handleFormSubmit = () => {
        console.log(routineTask);
        onClose();
    }

    useEffect(() => {
        setRoutineTask({ task: '', type: '', day: '', date: '' });
    }, [])

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 flex flex-col rounded-lg border" onClick={handleDialogClick}>
                <p className="text-center mb-2 font-bold">Routine Task</p>
                <div className="mx-auto">
                    <input type="text" value={routineTask.task} onChange={(e) => setRoutineTask({ ...routineTask, task: e.target.value })} placeholder="Enter task" className="mb-3 w-full rounded-md bg-zinc-800 px-3 py-2 text-zinc-300 outline-none focus:ring-0" />
                    <p className="mb-2">Select routing type</p><div className="mb-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => setRoutineTask({ ...routineTask, type: 'DAILY' })}
                            className={`routine-btn ${routineTask.type === 'DAILY' ? 'active-routine-btn' : ''}`}>daily</button>
                        <button type="button" onClick={() => setRoutineTask({ ...routineTask, type: 'WEEKLY' })}
                            className={`routine-btn ${routineTask.type === 'WEEKLY' ? 'active-routine-btn' : ''}`}>weekly</button>
                        <button type="button" onClick={() => setRoutineTask({ ...routineTask, type: 'BI_WEEKLY' })}
                            className={`routine-btn ${routineTask.type === 'BI_WEEKLY' ? 'active-routine-btn' : ''}`}>bi-weekly</button>
                        <button type="button" onClick={() => setRoutineTask({ ...routineTask, type: 'MONTHLY' })}
                            className={`routine-btn ${routineTask.type === 'MONTHLY' ? 'active-routine-btn' : ''}`}>monthly</button>
                    </div>
                    {
                        (routineTask.type === 'BI_WEEKLY' || routineTask.type === 'WEEKLY') &&
                        <div className="mb-3">
                            <p className="mb-2">On which days</p>
                            <div className="grid grid-cols-4 gap-2">
                                {
                                    weekDays.map((day, i) => <button key={i} type="button" onClick={() => setRoutineTask({ ...routineTask, day: day })} className={`routine-btn ${routineTask.day === day ? 'active-routine-btn' : ''}`}>{day}</button>)
                                }
                            </div>
                        </div>
                    }
                    {
                        (routineTask.type === 'MONTHLY') &&
                        <div className="mb-3">
                            <p className="mb-2">On which dates</p>
                            <div className="grid grid-cols-7 gap-2">
                                {
                                    Array(32).fill().map((date, i) => <button key={i} type="button" onClick={() => setRoutineTask({ ...routineTask, date: i })} className={`routine-btn ${routineTask.date === i ? 'active-routine-btn' : ''}`}>{i}</button>)
                                }
                            </div>
                        </div>
                    }
                    <button type="submit" onClick={handleFormSubmit} className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0">Add Routine</button>
                </div>
            </div>
        </div>
    );
}