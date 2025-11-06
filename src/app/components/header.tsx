'use client';
import { useState } from 'react';

interface HeaderProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({ username, setUsername }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const changeNickname = (): void => {
    const newName = prompt("Enter new nickname:", username);
    if (newName && newName.trim() !== "") {
      setUsername(newName.trim());
    }
  };

  return (
    <div className="flex justify-between h-[100px] px-[85px] py-[15px] bg-[#1E1E1E] relative">
      <div className="w-[400px] h-[70px] relative">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full h-full bg-[white] placeholder:text-[20px] text-gray-400 placeholder:text-gray-400 rounded-[25px] py-[15px] pl-[75px] focus:ring-[2px] focus:ring-blue-500 duration-500 ease-in-out focus:outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="absolute left-[15px] top-[15px] w-[40px] h-[40px] text-gray-400"
        >
          <path
            strokeLinecap="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
          />
        </svg>
      </div>

      <div
        className="flex items-center px-[20px] hover:bg-[#464646] rounded-[25px] w-[300px] cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src="assets/user-profile-icon.png" className="rounded-full w-[50px] h-[50px]" alt="User avatar" />
        <span className="text-gray text-[28px] pl-[10px]">{username}</span>
        <img
          src="/assets/chevron-icon.png"
          className="w-auto h-[14px] pl-[10px] pt-[6px]"
          alt="Chevron icon"
        />
      </div>

      {menuOpen && (
        <div className="absolute right-[85px] top-[100px] bg-[#2e2e2e] rounded-[25px] z-50 overflow-hidden shadow-lg">
          <button
            className="block w-full text-left px-[10px] py-[10px] text-[18px] text-white hover:bg-[#3a3a3a]"
            onClick={changeNickname}
          >
            Change nickname
          </button>
          <button
            className="block w-full text-left px-[10px] py-[10px] text-[18px] text-white hover:bg-[#3a3a3a]"
          >
            Change avatar
          </button>
        </div>
      )}
    </div>
  );
}
