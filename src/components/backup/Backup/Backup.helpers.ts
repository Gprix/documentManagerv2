import { formatDate } from "@/utils/date.utils";

export const getLastBackupInfoText = (createdAt: string): string => {
  const date = formatDate(createdAt, "dd/MM/yyyy");
  const time = formatDate(createdAt, "hh:mm:ss");

  return `Último respaldo realizado el ${date} a las ${time}`;
};
