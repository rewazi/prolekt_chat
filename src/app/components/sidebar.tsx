'use client';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ setIsModalOpen, setIsModalOpenChat }: SidebarProps) {
  const router = useRouter();
  const handleLogout = async () => {
  
      const response = await fetch('http://localhost/server/logout.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.removeItem('username');
        localStorage.removeItem('PHPSESSID');
        alert(data.message);
        router.push('/'); 
      } 

  };
  return (
    <aside className="w-[360px] bg-[#1E1E1E] flex flex-col justify-between pt-[25px] pb-[25px]">
      <div className="flex flex-col gap-[10px]">
        <div className="w-[360px] text-center text-[48px] pb-[25px] text-white font-bold">
          CHAT
        </div>

        <hr className="w-[300px] mx-auto border-white pb-[25px]" />

        <button
          onClick={() => setIsModalOpenChat(true)}
          className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px] transition duration-300 ease-in-out"
        >
          <img src="/assets/white-plus-icon-3.jpg" className="w-[42px] h-[42px]" alt="plus icon" />
          <span className="font-bold text-[32px] pl-[9px]">New chat</span>
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px] transition duration-300 ease-in-out"
        >
          <img src="/assets/house-64.png" className="w-[42px] h-[42px]" alt="home icon" />
          <span className="font-bold text-[32px] pl-[9px]">All chats</span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px] gap-2 transition duration-300 ease-in-out"
      >
        <img src="/assets/logout-64 (1)-Photoroom.png" className="w-[42px] h-[42px]" alt="logout icon" />
        <span className="font-bold text-[32px] pl-[9px]">Log out</span>
      </button>
    </aside>
  );
}