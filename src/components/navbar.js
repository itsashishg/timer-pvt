import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return <>
        <nav>
            <div className="md:hidden fixed right-5 top-10">
                <button onClick={toggleMenu} className="text-white focus:outline-none w-5">
                    <svg fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 10a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75ZM1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H1.75Z"></path>
                    </svg>
                </button>
            </div>
            <div className="hidden md:block fixed bottom-10 left-1/2 transform -translate-x-1/2 p-2 w-[300px] bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
                <div className="flex justify-around gap-2">
                    <NavLink to="/" className={({ isActive }) => `text-center text-lg ${isActive ? 'text-blue-500 font-bold' : 'text-gray-800 hover:text-blue-500'}`}>
                        Clock
                    </NavLink>

                    <NavLink to="/pomodoro" className={({ isActive }) => `text-center text-lg ${isActive ? 'text-blue-500 font-bold' : 'text-gray-800 hover:text-blue-500'}`}>
                        Pomodoro
                    </NavLink>
                </div>
            </div>

            {/* Overlay Menu for Small Screens */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col items-center justify-center md:hidden">
                    <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
                        &times;
                    </button>
                    <NavLink to="/" exact className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/pomodoro" className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Pomodoro
                    </NavLink>
                </div>
            )}
        </nav>
    </>
}