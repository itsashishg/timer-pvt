import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return <>
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 w-1/2 bg-white bg-opacity-30 backdrop-blur-md rounded-full shadow-lg">
            <div className="flex justify-around">
                <NavLink to="/" className={({ isActive }) => `text-center text-lg ${isActive ? 'text-blue-500 font-bold' : 'text-gray-800 hover:text-blue-500'}`}>
                    Clock
                </NavLink>

                <NavLink to="/search" className={({ isActive }) => `text-center text-lg ${isActive ? 'text-blue-500 font-bold' : 'text-gray-800 hover:text-blue-500'}`}>
                    search
                </NavLink>
            </div>
        </div>
    </>
}