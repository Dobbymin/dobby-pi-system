import { NavLink } from "react-router";

import {
  Container,
  FileText,
  Gauge,
  HardDrive,
  LayoutDashboard,
  Network,
  Settings,
  Shell,
  Users,
  Wrench,
} from "lucide-react";

import { ROUTE_PATHS } from "@/shared/constants";
import { cn } from "@/shared/utils";

const NAV_ITEMS = [
  { path: ROUTE_PATHS.MAIN, icon: LayoutDashboard, label: "대시보드" },
  { path: ROUTE_PATHS.SYSTEM, icon: Gauge, label: "시스템" },
  { path: ROUTE_PATHS.SERVICES, icon: Wrench, label: "서비스" },
  { path: ROUTE_PATHS.NETWORK, icon: Network, label: "네트워크" },
  { path: ROUTE_PATHS.STORAGE, icon: HardDrive, label: "스토리지" },
  { path: ROUTE_PATHS.FILES, icon: FileText, label: "파일" },
  { path: ROUTE_PATHS.USERS, icon: Users, label: "사용자" },
  { path: ROUTE_PATHS.TERMINAL, icon: Shell, label: "터미널" },
  { path: ROUTE_PATHS.DOCKER, icon: Container, label: "Docker" },
  { path: ROUTE_PATHS.SETTINGS, icon: Settings, label: "설정" },
] as const;

export function Sidebar() {
  return (
    <aside className='flex h-full w-16 flex-col items-center gap-1 border-r border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-[#0d1117] md:w-56 md:items-start md:px-3'>
      {/* Logo */}
      <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary md:w-full md:justify-start md:px-2'>
        <span className='text-sm font-bold text-white md:text-base'>
          <span className='hidden md:inline'>Dobby</span>
          <span className='md:hidden'>D</span>
        </span>
      </div>

      {/* Nav Items */}
      <nav className='flex w-full flex-1 flex-col gap-1'>
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === ROUTE_PATHS.MAIN}
            className={({ isActive }) =>
              cn(
                "group flex h-10 w-full items-center justify-center gap-3 rounded-lg px-2 text-sm font-medium transition-colors",
                "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                "md:justify-start md:px-3",
                isActive &&
                  "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary dark:bg-primary/20 dark:text-primary",
              )
            }
          >
            <Icon className='size-5 shrink-0' />
            <span className='hidden md:block'>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
