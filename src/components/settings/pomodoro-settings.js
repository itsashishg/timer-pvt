import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

const PomodoroSettings = ({ isOpen, onClose, currentValue, updateHandler }) => {
    useEscapeKeyListener(onClose);

    if (!isOpen) return null;

    const handleOverlayClick = (event) => { onClose() };
    const handleDialogClick = (event) => { event.stopPropagation() };

    const handleUpdate = (val, keyName) => {
        updateHandler({ ...currentValue, [keyName]: val });
    }


    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 flex flex-col rounded-lg border" onClick={handleDialogClick}>
                <p className="text-center mb-2 font-bold">Routine Task</p>
                <div className="mx-auto w-full">
                    <p className="mb-2">Pomodoro (mins)</p>
                    <input type="number" defaultValue={currentValue.pomodoro / 60} onChange={(e) => { handleUpdate(e.target.value * 60, 'pomodoro'); e.preventDefault() }} placeholder="Duration in minutes" className="mb-3 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none" />
                    <div className="flex flex-row gap-4"><div>
                        <p className="mb-2">Short break (mins)</p>
                        <input type="number" defaultValue={currentValue.short / 60} onChange={(e) => { handleUpdate(e.target.value * 60, 'short') }} placeholder="Minutes" className="mb-3 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none" />
                    </div>
                        <div>
                            <p className="mb-2">Long break (mins)</p>
                            <input type="number" defaultValue={currentValue.long / 60} onChange={(e) => { handleUpdate(e.target.value * 60, 'long') }} placeholder="Minutes" className="mb-5 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none" />
                        </div>
                    </div>
                    <button type="submit" onClick={(e) => { onClose(); e.preventDefault() }} className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0">Update Settings</button>
                </div>
            </div>
        </div>
    );
}

export default PomodoroSettings;