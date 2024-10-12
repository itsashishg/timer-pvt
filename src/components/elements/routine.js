import { useEffect, useState } from "react";
import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

export default function Routine({ isOpen, onClose, updateHandler }) {
    useEscapeKeyListener(onClose);

    const [taskName, setTaskName] = useState('');
    const [routineType, setRoutineType] = useState('DAILY');
    const [daysList, setDaysList] = useState([]);
    const [datesList, setDatesList] = useState([]);

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
        updateHandler({ taskName: taskName, type: routineType, days: daysList, dates: datesList });
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


    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 flex flex-col rounded-lg border" onClick={handleDialogClick}>
                <p className="text-center mb-2 font-bold">Routine Task</p>
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
            </div>
        </div>
    );
}