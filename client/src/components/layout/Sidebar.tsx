import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  FileText,
  Briefcase,
  MessagesSquare,
  Bot,
} from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/utils/cn";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/interview", label: "Interview prep", icon: MessagesSquare },
  { to: "/mock-interview", label: "AI mock interview", icon: Bot },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-soft text-accent-bright"
                  : "text-ink-muted hover:bg-surface-raised hover:text-ink"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border px-6 py-4 font-mono text-[11px] text-ink-faint">
        <span className="text-accent-bright">$</span> build_your_career()
      </div>
    </aside>
  );
}
