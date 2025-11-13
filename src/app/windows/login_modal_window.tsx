'use client';
import { useState, type Dispatch, type SetStateAction } from "react";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

export default function LoginModal({ isOpen, setIsOpen, setUsername }: LoginModalProps) {
  const [formData, setFormData] = useState({
      name: '',
      password: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    fetch('http://localhost/server/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        password: formData.password
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        setUsername(data.user.name);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('PHPSESSID', data.session_id);
      setFormData({ name: '', password: '' });
    })
    .catch(() => {
      console.error('Ошибка соединения с сервером');
    });
  }

  function handleClose() {
    setFormData({ name: '', password: '' });
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-gray-700 rounded-[15px] p-6 w-[400px] shadow-2xl">
          <h2 className="text-white text-[28px] font-bold mb-4">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Name</label>
              <input
                autoFocus
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
                disabled={!formData.name.trim() || !formData.password.trim()}
              >
                Confirm
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}