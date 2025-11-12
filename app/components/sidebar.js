'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();

  return (
    <aside className="w-[360px] bg-[#1E1E1E] flex flex-col justify-between pt-[25px] pb-[25px]">
      <div className="flex flex-col gap-[10px]">
        <div className="w-[360px] text-center text-[48px] pb-[25px]">APP NAME EXAMPLE</div>
        <hr className="w-[300px] mx-auto border-white pb-[25px]" />
        <button className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px]">
          <img src="/assets/white-plus-icon-3.jpg" className="w-[42px] h-[42px]" alt="icon" />
          <span className="font-bold text-[32x] pl-[9px]">New chat</span>
        </button>
        <button onClick={() => router.push('./')} className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px]">
          <img src="/assets/house-64.png" className="w-[42px] h-[42px]" alt="icon" />
          <span className="font-bold text-[32x] pl-[9px]">All chats</span>
        </button>
        <button className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px]">
          <img src="/assets/speech-bubble-64.png" className="w-[42px] h-[42px]" alt="icon" />
          <span className="font-bold text-[32x] pl-[9px]">My chats</span>
        </button>
      </div>
      <button className="w-[275px] h-[60px] mx-auto flex items-center text-white hover:bg-[#464646] pl-[14px] rounded-[25px] gap-2">
        <img src="/assets/logout-64 (1)-Photoroom.png" className="w-[42px] h-[42px]" alt="icon" />
        <span className="font-bold text-[32x] pl-[9px]">Log out</span>
      </button>
    </aside>
  );
}
