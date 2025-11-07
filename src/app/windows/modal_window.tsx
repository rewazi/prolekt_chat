'use client';
import { useState, type Dispatch, type SetStateAction } from "react";

interface ModalWindowProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}


export default function ModalWindow({ username, setUsername, isOpen, setIsOpen }: ModalWindowProps) {
  function handleSignIn() {
    if (username.trim() !== "") {
      console.log("Введённое имя:", username);
      localStorage.setItem("username", username.trim());
      setIsOpen(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-gray-700 rounded-[15px] p-6 w-[400px] shadow-2xl">
        <h2 className="text-white text-[28px] font-bold mb-4">Log in</h2>
        
        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-2 block">Username</label>
          <input
            autoFocus
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSignIn();
              }
            }}
          />
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}