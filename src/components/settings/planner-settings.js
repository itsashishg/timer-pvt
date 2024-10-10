import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

const PlannerSettings = ({ isOpen, onClose, updateHandler }) => {
    useEscapeKeyListener(onClose);

    if (!isOpen) return null;

    const handleOverlayClick = (event) => { onClose() };
    const handleDialogClick = (event) => { event.stopPropagation() };

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 flex flex-col rounded-lg border" onClick={handleDialogClick}>
                <p className="text-center mb-2 font-bold">Planner Setting</p>
                <div className="mx-auto w-full">
                    <div className="flex justify-between gap-2">
                        <span className="w-full m-auto">Clear Tasks</span>
                        <button type="submit" onClick={() => { onClose(); updateHandler() }} className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0">Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlannerSettings;