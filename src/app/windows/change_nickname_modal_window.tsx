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
      console.log("Your name:", username);
      localStorage.setItem("username", username.trim());
      setIsOpen(false);
    }
  }

  function handleClose() {
    if (username.trim() !== "") {
      setIsOpen(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-gray-700 rounded-[15px] p-6 w-[400px] shadow-2xl">
        <h2 className="text-white text-[28px] font-bold mb-4">Change of Nickname</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Username</label>
            <input
              autoFocus
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={!username.trim()}
              className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
              disabled={!username.trim()}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}