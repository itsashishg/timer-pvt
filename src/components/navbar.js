import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return <>
        <nav className="main-nav small-device sm:large-device">
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
        </nav>
    </>
}