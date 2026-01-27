import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
     <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      <main className="pt-14 md:pl-60 bg-zinc-950 min-h-screen">
        {children}
      </main>
    </>
  );
}
