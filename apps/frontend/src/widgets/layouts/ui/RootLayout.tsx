import { Outlet } from "react-router";

import { RootHeader } from "../components";
import { Sidebar } from "../components/sidebar";

export default function RootLayout() {
  return (
    <div className='flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#0d1117]'>
      <RootHeader />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
