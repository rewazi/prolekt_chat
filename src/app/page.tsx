'use client'

import { useState } from "react";
import "./app.css";
import Sidebar from './components/sidebar';
import Header from './components/header';
import Main from './main/main';
import Modal_window from "./windows/modal_window";

export default function App() {
  const initialUsername = localStorage.getItem("username") || "";
  const [username, setUsername] = useState<string>(initialUsername);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="flex h-screen w-screen">
      <Modal_window username={username} setUsername={setUsername}isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>

      <Sidebar />

      <main className="flex flex-1 flex-col bg-[#121212]">

        <Header username={username} setUsername={setUsername} setIsModalOpen={setIsModalOpen}/>

        <Main />
      </main>
    </div>
  );
}
