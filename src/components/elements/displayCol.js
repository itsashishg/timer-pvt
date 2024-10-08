import React, { useEffect, useState } from "react";

export default function DisplayCol({ data, updateTask }) {

    const [addElement, setAddElement] = useState(false);
    const [totalTasks, setTotalTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        setTotalTasks(data.tasks);
        setNewTask('');
        setAddElement(false);
    }, [data]);

    const handleAddData = (event) => {
        if (event.key === 'Enter' && newTask.trim()) {
            event.preventDefault();
            const updatedList = [...data.tasks, { id: data.tasks.length + 1, desc: newTask, isDone: false }];
            setTotalTasks(updatedList);
            updateTask(data.date, updatedList);
            setNewTask('');
            setAddElement(false);
        }
    }

    return <>
        <div className={`flex min-h-[400px] h-full w-full flex-grow flex-col overflow-hidden rounded-xl border bg-zinc-900 p-4 ${new Date().toDateString() === data.date ? 'border-sky-700' : 'border-zinc-800'}`}>
            <h3 className="flex justify-between py-4 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <span>{data.date}</span>
            </h3>
            <div className="flex flex-grow flex-col">
                <div className="border-b-2 border-t-2 last:mb-0 active:cursor-grabbing border-b-transparent border-t-transparent">
                    {
                        totalTasks.map((task, index) => (
                            <div key={index} className="relative -mx-3 flex cursor-pointer select-none items-start gap-3 px-3 py-2.5 active:bg-zinc-800 group hover:bg-zinc-800">
                                <button className={`z-[20] mt-[2.15px] flex h-[17px] w-[17px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-zinc-600 hover:border-zinc-400 ${task.isDone ? 'bg-zinc-700 text-zinc-950' : ''}`}>
                                    {
                                        task.isDone &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="relative top-[0.4px] h-[12px]">
                                            <path d="M20 6 9 17l-5-5"></path>
                                        </svg>
                                    }
                                </button>
                                <div className="flex flex-grow flex-col gap-2">
                                    <h4 className={`items-start gap-1.5 text-sm group-hover:text-zinc-300 ${task.isDone ? 'text-zinc-700 line-through' : 'text-zinc-400'}`}>{task.desc}</h4>
                                </div>
                                <div className="absolute right-1 top-1/2 z-[20] hidden -translate-y-1/2 items-center justify-center gap-2 rounded-lg bg-zinc-800 px-2 py-2 group-hover:flex">
                                    <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                                        </svg>
                                    </button>
                                    <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line x1="10" x2="10" y1="11" y2="17"></line>
                                            <line x1="14" x2="14" y1="11" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        (!addElement && (totalTasks.length !== 0)) &&
                        <div className="mt-3 flex items-center justify-start">
                            <button onClick={() => setAddElement(true)} className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-700 px-3 py-1.5 text-sm text-zinc-500 transition-colors group hover:border-zinc-500 hover:text-zinc-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex h-[15px] w-[15px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md group-hover:border-zinc-400">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                <span className="text-sm ">Add new task</span>
                            </button>
                        </div>
                    }
                </div>
                {
                    (totalTasks.length === 0 && !addElement) &&
                    <div className="custom-scrollbar relative flex flex-grow flex-col overflow-y-scroll">
                        <div className="absolute inset-0 flex flex-col gap-5 px-3">
                            <div className="flex-grow pb-10">
                                <div>
                                    <div className="absolute inset-0 flex flex-1 flex-grow flex-col items-center justify-center gap-1 text-sm text-zinc-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3 flex h-[45px] w-[45px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-800">
                                            <path d="m9 11 3 3L22 4"></path>
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                        </svg>
                                        <p>No tasks for this day</p>
                                        <p>
                                            <button onClick={() => setAddElement(true)} className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300">Add a new task</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    addElement &&
                    <form className="relative my-1 flex items-center justify-start">
                        <input onChange={(e) => setNewTask(e.target.value)} onKeyDown={handleAddData} className="flex-grow rounded-lg border border-zinc-700 bg-transparent px-3 py-2.5 pb-12 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none" placeholder="Type and press enter to save or esc to cancel" />
                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button type="submit" onChange={handleAddData} className="group flex items-center gap-1 rounded-md text-xs uppercase tracking-wide text-zinc-500 hover:text-zinc-300">
                                    <span className="hidden rounded-md bg-zinc-800 px-2 py-0.5 group-hover:bg-zinc-700 md:inline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" className="h-4 w-4">
                                            <g fill="currentColor">
                                                <path d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z"></path>
                                                <path d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z"></path>
                                            </g>
                                        </svg>
                                    </span>Save
                                </button>
                                <button onClick={() => setAddElement(false)} type="button" className="group flex items-center gap-1 rounded-md text-xs uppercase tracking-wide text-zinc-500 hover:text-zinc-300">
                                    <span className="hidden rounded-md bg-zinc-800 px-2 py-0.5 group-hover:bg-zinc-700 md:inline">Esc</span>Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    </>;
}