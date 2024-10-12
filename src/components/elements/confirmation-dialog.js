import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

const ConfirmationDialog = ({ isOpen, onClose, showDetails }) => {
    useEscapeKeyListener(onClose);

    if (!isOpen) return null;

    const handleOverlayClick = (event) => { onClose() };
    const handleDialogClick = (event) => { event.stopPropagation() };

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 flex flex-col rounded-lg border" onClick={handleDialogClick}>
                <p className="text-center mb-2 font-bold">{showDetails.heading}</p>
                <div className="mx-auto w-full">
                    <span className="w-full m-auto">{showDetails.message}</span>
                    <div className="flex justify-between gap-2">
                        <button type="submit" onClick={() => { onClose(true) }} className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0">{showDetails.truthy}</button>
                        <button type="submit" onClick={() => { onClose(false) }} className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0">{showDetails.falsy}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDialog;