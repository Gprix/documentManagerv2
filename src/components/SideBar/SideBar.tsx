"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth/auth.context.hooks";
import Link from "next/link";
import Image from "next/image";

import { getMember } from "@/services/member/member.service";
import { Member } from "@/services/member/member.service.types";

import logo from "images/logo-black.svg";
import CalendarSVG from "images/icons/calendar.svg";
import DiscSVG from "images/icons/disc.svg";
import DocPageSVG from "images/icons/doc-page.svg";
import NotificationsSVG from "images/icons/notifications.svg";
import CopyToClipboardButton from "../shared/CopyToClipboard/CopyToClipboard";
import { useWorkspaceStore } from "@/stores/workspace.store";

const Sidebar = () => {
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const { uid } = useAuth();
  const [photoURL, setPhotoURL] = useState("");
  const sidebarElementClassName =
    "Sidebar__element p-3 rounded-full hover:bg-primaryMedium transition-md";

  const ProfilePreview = () => {
    return (
      <div
        className={[
          "flex flex-col items-center rounded-lg mt-4 py-3 mx-2 transition-md",
          "hover:bg-primaryMedium hover:cursor-pointer hover:shadow",
          "active:bg-primaryDark active:shadow-none",
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
    );
  };

  useEffect(() => {
    if (!uid) return;

    const retrieveUserInfo = async () => {
      const member = await getMember(uid ?? "");
      const { photoURL } = (member as Member) ?? {};

      setPhotoURL(photoURL);
    };

    retrieveUserInfo();
  }, [uid]);

  return (
    <aside
      className={[
        "Sidebar",
        "bg-primaryDark w-[96px] py-6 overflow-hidden",
        "flex flex-col justify-between items-center",
      ].join(" ")}
      id="sidebar"
    >
      <div className="Sidebar__information text-center">
        <div className="Sidebar__information__logo hover:cursor-pointer">
          <Link href="/workspace">
            <Image src={logo} alt="Logo notaria" className="w-full" />
          </Link>
        </div>
        <ProfilePreview />
      </div>

      <div
        className={[
          "flex flex-col gap-y-4 shadow-md bg-primary px-2 py-8 rounded-full",
          "hover:cursor-pointer",
        ].join(" ")}
      >
        <Link href="/workspace/schedule" className={sidebarElementClassName}>
          <Image src={CalendarSVG} alt="schedule" />
        </Link>
        <Link href="/workspace/documents" className={sidebarElementClassName}>
          <Image src={DocPageSVG} alt="documents" />
        </Link>
        <Link
          href="/workspace/notifications"
          className={sidebarElementClassName}
        >
          <Image src={NotificationsSVG} alt="notifications" />
        </Link>
        <Link href="/workspace/backup" className={sidebarElementClassName}>
          <Image src={DiscSVG} alt="backup" />
        </Link>
      </div>

      <div>
        <p
          className="Sidebar__information__workspace-name text-center text-slate-900 font-bold"
          title={selectedWorkspace?.uid}
        >
          {selectedWorkspace?.name}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
