"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";
import { jn } from "@/utils/common.utils";
import { useFetchMember } from "@/services/member/member.service.hooks";
import CopyToClipboardButton from "../CopyToClipboard/CopyToClipboard";

import CalendarSVG from "images/icons/calendar.svg";
import DiscSVG from "images/icons/disc.svg";
import ArchiveSVG from "images/icons/archive.svg";
import BellSVG from "images/icons/bell.svg";
import WorkspaceSVG from "images/icons/columns.svg";
import { usePathname } from "next/navigation";
import { useWorkspaceStore } from "@/stores/workspace.store";

const Sidebar = () => {
  const uid = useAuthStore((s) => s.uid);
  const pathname = usePathname();
  const { data: member } = useFetchMember(uid ?? "", { enabled: !!uid });
  const { photoURL = "" } = member ?? {};
  const sidebarElementClassName =
    "text-center text-black p-3 rounded-full bg-surface-alt hover:bg-highlight transition-md flex items-center justify-center";
  const iconClassName = "[&_path]:stroke-txt";
  const { selectedWorkspace } = useWorkspaceStore();

  const renderProfilePreview = () => {
    return (
      <div className="text-center w-full">
        <div
          className={[
            "flex flex-col items-center rounded-lg mt-4 py-3 mx-2 transition-md",
            "hover:bg-highlight hover:cursor-pointer hover:shadow",
            "active:bg-surf active:shadow-none",
          ].join(" ")}
        >
          <Image
            src={photoURL}
            width="32"
            height="32"
            className="rounded-full"
            alt="Profile picture"
          />
          <CopyToClipboardButton className="mt-2" text={uid} />
        </div>
      </div>
    );
  };

  if (!selectedWorkspace) return null;

  return (
    <aside
      className={jn(
        "Sidebar",
        "bg-surf w-[96px] py-6 overflow-hidden",
        "flex flex-col justify-between items-center",
        "animate-page"
      )}
    >
      {pathname !== "/workspace" ? (
        <Link href="/workspace">
          <WorkspaceSVG className={iconClassName} />
        </Link>
      ) : (
        <div className="h-8 w-8" />
      )}
      <div
        className={jn(
          "flex flex-col gap-y-4 shadow-md bg-surf-alt px-2 py-8 rounded-lg",
          "hover:cursor-pointer"
        )}
      >
        <Link href="/workspace/schedule" className={sidebarElementClassName}>
          <CalendarSVG
            className={jn(iconClassName, "[&_rect]:stroke-txt")}
            alt="schedule"
          />
        </Link>
        <Link href="/workspace/documents" className={sidebarElementClassName}>
          <ArchiveSVG className={iconClassName} alt="documents" />
        </Link>
        <Link
          href="/workspace/notifications"
          className={sidebarElementClassName}
        >
          <BellSVG className={iconClassName} alt="notifications" />
        </Link>
        <Link href="/workspace/backup" className={sidebarElementClassName}>
          <DiscSVG className="[&_path]:fill-txt" alt="backup" />
        </Link>
      </div>
      {renderProfilePreview()}
    </aside>
  );
};

export default Sidebar;
