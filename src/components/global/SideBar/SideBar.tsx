"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getMember } from "@/services/member/member.service";
import { Member } from "@/services/member/member.service.types";

import CalendarSVG from "images/icons/calendar.svg";
import DiscSVG from "images/icons/disc.svg";
import DocPageSVG from "images/icons/doc-page.svg";
import NotificationsSVG from "images/icons/notifications.svg";
import CopyToClipboardButton from "../CopyToClipboard/CopyToClipboard";
import { useAuthStore } from "@/stores/auth.store";
import LeftArrowSVG from "images/icons/left-arrow.svg";

const Sidebar = () => {
  const uid = useAuthStore((s) => s.uid);
  const [photoURL, setPhotoURL] = useState("");
  const sidebarElementClassName =
    "text-center text-black p-3 rounded-full hover:bg-primaryMedium transition-md";

  const ProfilePreview = () => {
    return (
      <div className="text-center w-full">
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

    // retrieveUserInfo();
  }, [uid]);

  return (
    <aside
      className={[
        "Sidebar",
        "bg-primaryDark w-[96px] py-6 overflow-hidden",
        "flex flex-col justify-between items-center",
      ].join(" ")}
    >
      <Link href="/workspace">
        <LeftArrowSVG />
      </Link>
      <div
        className={[
          "flex flex-col gap-y-4 shadow-md bg-primary px-2 py-8 rounded-full",
          "hover:cursor-pointer",
        ].join(" ")}
      >
        <Link href="/workspace/schedule" className={sidebarElementClassName}>
          <CalendarSVG alt="schedule" />
        </Link>
        <Link href="/workspace/documents" className={sidebarElementClassName}>
          <DocPageSVG alt="documents" />
        </Link>
        <Link
          href="/workspace/notifications"
          className={sidebarElementClassName}
        >
          <NotificationsSVG alt="notifications" />
        </Link>
        <Link href="/workspace/backup" className={sidebarElementClassName}>
          <DiscSVG alt="backup" />
        </Link>
      </div>
      <ProfilePreview />
    </aside>
  );
};

export default Sidebar;
