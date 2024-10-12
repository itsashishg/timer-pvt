import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return <>
        <nav>
            {/* Hamburger menu */}
            <div className="md:hidden fixed right-5 top-6">
                <button onClick={toggleMenu} className="text-white focus:outline-none w-5">
                    <svg fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 10a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75ZM1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H1.75Z"></path>
                    </svg>
                </button>
            </div>
            {/* Main nav */}
            <div className="hidden md:block main-nav absolute z-20 h-10">
                <div className="flex items-center justify-around gap-2 h-full">
                    <NavLink to="/timely/" className={({ isActive }) => `text-center leading-5 text-base ${isActive ? 'text-gray-400 font-semibold' : 'text-gray-600 hover:text-gray-500'}`}>
                        Clock
                    </NavLink>

                    <NavLink to="/timely/pomodoro" className={({ isActive }) => `text-center leading-5 text-base ${isActive ? 'text-gray-400 font-semibold' : 'text-gray-600 hover:text-gray-500'}`}>
                        Pomodoro
                    </NavLink>

                    <NavLink to="/timely/timer" className={({ isActive }) => `text-center leading-5 text-base ${isActive ? 'text-gray-400 font-semibold' : 'text-gray-600 hover:text-gray-500'}`}>
                        Timer
                    </NavLink>

                    <NavLink to="/timely/stopwatch" className={({ isActive }) => `text-center leading-5 text-base ${isActive ? 'text-gray-400 font-semibold' : 'text-gray-600 hover:text-gray-500'}`}>
                        Stopwatch
                    </NavLink>

                    <NavLink to="/timely/planner" className={({ isActive }) => `text-center leading-5 text-base ${isActive ? 'text-gray-400 font-semibold' : 'text-gray-600 hover:text-gray-500'}`}>
                        Planner
                    </NavLink>
                </div>
            </div>

            {/* Overlay Menu for Small Screens */}
            {isOpen && (
                <div className="fixed inset-0 bg-zinc-800 bg-opacity-90 z-50 flex flex-col items-center justify-center md:hidden">
                    <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
                        &times;
                    </button>
                    <NavLink to="/timely/" className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/timely/pomodoro" className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Pomodoro
                    </NavLink>
                    <NavLink to="/timely/timer" className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Timer
                    </NavLink>
                    <NavLink to="/timely/stopwatch" className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Stopwatch
                    </NavLink>
                    <NavLink to="/timely/planner" className="text-white text-2xl py-4" onClick={() => setIsOpen(false)}>
                        Planner
                    </NavLink>
                </div>
            )}
        </nav>
    </>
}