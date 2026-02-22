import type { ServiceStatus } from "@/entities/service";
import { cn } from "@/shared/utils";

const statusConfig: Record<ServiceStatus, { label: string; dotClass: string; badgeClass: string }> =
  {
    active: {
      label: "active",
      dotClass: "bg-emerald-500",
      badgeClass: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
    },
    inactive: {
      label: "inactive",
      dotClass: "bg-slate-400",
      badgeClass: "bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20",
    },
    failed: {
      label: "failed",
      dotClass: "bg-red-500",
      badgeClass: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20",
    },
    activating: {
      label: "activating",
      dotClass: "animate-pulse bg-yellow-500",
      badgeClass: "bg-yellow-500/10 text-yellow-400 ring-1 ring-inset ring-yellow-500/20",
    },
    deactivating: {
      label: "deactivating",
      dotClass: "animate-pulse bg-orange-400",
      badgeClass: "bg-orange-500/10 text-orange-400 ring-1 ring-inset ring-orange-500/20",
    },
  };

type Props = { status: ServiceStatus };

export function ServiceStatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.badgeClass,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </span>
  );
}
