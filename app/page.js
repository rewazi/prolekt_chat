'use client'
import * as React from "react";
import "./app.css";
import Sidebar from './components/sidebar';
import Header from './components/header';
import Main from './main/main'


export default function App() {

  return (
      <div className="flex h-screen w-screen">
        <Sidebar />

        <main className="flex flex-1 flex-col bg-[#121212]">
          <Header />

          <Main />
          
        </main>
      </div>
  );
}
