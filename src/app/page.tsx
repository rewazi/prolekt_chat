'use client'

import { useState } from "react";
import "./app.css";
import Sidebar from './components/sidebar';
import Header from './components/header';
import Main from './main/main';

export default function App() {
  const [username, setUsername] = useState<string>("Guest");


  return (
    <div className="flex h-screen w-screen">

      <Sidebar />


      <main className="flex flex-1 flex-col bg-[#121212]">

        <Header username={username} setUsername={setUsername} />

        <Main />
      </main>
    </div>
  );
}
