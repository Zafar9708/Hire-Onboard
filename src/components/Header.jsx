
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ userName, getInitials }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleProfileClick = () => {
        navigate("/profile");
        setIsDropdownOpen(false);
    };

    const handleSettingsClick = () => {
        navigate("/profilesettings");
        setIsDropdownOpen(false);
    };

    return (
        <div className="fixed top-0 left-[190px] right-0 flex justify-between items-center px-4 py-1 bg-blue-950 shadow-md z-[1100] h-16">
            <h1 className="text-white font-bold text-md">{userName}</h1>

            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded shadow-sm w-1/3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full outline-none"
                />
            </div>

            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={toggleDropdown}
                    className="w-10 h-10 bg-blue-600 rounded-full flex justify-center items-center text-white font-bold cursor-pointer"
                >
                    {getInitials(userName)}
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg py-2 w-40 z-50">
                        <button 
                            onClick={handleProfileClick}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Profile
                        </button>
                        <button 
                            onClick={handleSettingsClick}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;