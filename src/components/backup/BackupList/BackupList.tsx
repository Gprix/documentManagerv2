"use client";

import { useEffect, useState } from "react";

import { BackupListProps } from "./BackupList.types";
import BackupCard from "../BackupCard/BackupCard";
import { getBackupsInWorkspace } from "@/services/backup/backup.service";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { Backup } from "@/types/backup.types";
import { jn } from "@/utils/common.utils";

export const BackupList = (props: BackupListProps) => {
  const { className } = props;
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const { uid: workspaceId } = selectedWorkspace ?? {};
  const [backups, setBackups] = useState<Backup[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
    const getBackups = async () => {
      const _backups = await getBackupsInWorkspace(workspaceId);
      setBackups(_backups as Backup[]);
    };

    getBackups();
  }, [workspaceId]);

  return (
    <section
      className={jn(
        "BackupList",
        "bg-surf-semi-contrast w-1/2 flex flex-col gap-y-2 m-8 rounded-lg",
        className
      )}
    >
      {backups?.map((backup) => {
        const { name, uid, createdAt } = backup;

        return (
          <BackupCard
            key={uid}
            uid={uid}
            name={name}
            createdAt={createdAt}
            className="first:mt-3 last:mb-3 mx-3"
          />
        );
      })}
    </section>
  );
};
