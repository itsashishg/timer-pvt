import useEscapeKeyListener from "../custom-hooks/useEscapeKeyListener";

export default function Routine({ isOpen, onClose }) {
    useEscapeKeyListener(onClose);

    const handleOverlayClick = (event) => { onClose() };

    const handleDialogClick = (event) => { event.stopPropagation() };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog" onClick={handleDialogClick}>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}