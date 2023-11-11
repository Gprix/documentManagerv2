// import { writeNotification } from "@/services/notifications/notifications.service";
import { useCallback, useMemo } from "react";
import { ToastOptions, toast } from "react-toastify";

// import { CONSTANTS } from "@/config/constants";
// const { LOG_NOTIFICATIONS } = CONSTANTS.LOGGERS;

export const useNotification = () => {
  const options: ToastOptions = useMemo(()=>({
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
  }), []);

  const success = useCallback(
    async (message: string, destination?: string[]) =>
      toast.success(message, options),
    [options]
  );
  const info = useCallback(
    async (message: string, destination?: string[]) =>
      toast.info(message, options),
    [options]
  );
  const warning = useCallback(
    async (message: string, destination?: string[]) =>
      toast.warning(message, options),
    [options]
  );
  const error = useCallback(
    async (message: string, destination?: string[]) =>
      toast.error(message, options),
    [options]
  );
  const clear = useCallback(() => toast.dismiss(), []);

  // const success = async (message: string, destination?: string[]) => {
  //   toast.success(message, options);
  //   // TODO: evaluar si hay forma de optimizar esto (si no, quitar)
  //   // LOG_NOTIFICATIONS &&
  //   //   writeNotification({ type: "success", description: message, destination });
  // };

  // const info = async (message: string, destination?: string[]) => {
  //   toast.info(message, options);
  //   // TODO: evaluar si hay forma de optimizar esto (si no, quitar)
  //   // LOG_NOTIFICATIONS &&
  //   //   writeNotification({ type: "info", description: message, destination });
  // };

  // const warning = async (message: string, destination?: string[]) => {
  //   toast.warning(message, options);
  //   // TODO: evaluar si hay forma de optimizar esto (si no, quitar)
  //   // LOG_NOTIFICATIONS &&
  //   //   writeNotification({ type: "warning", description: message, destination });
  // };

  // const error = async (message: string, destination?: string[]) => {
  //   toast.error(message, options);
  //   // TODO: evaluar si hay forma de optimizar esto (si no, quitar)
  //   // LOG_NOTIFICATIONS &&
  //   //   writeNotification({ type: "error", description: message, destination });
  // };

  return useMemo(() => ({ success, info, warning, error, clear }), [clear, error, info, success, warning]);
};
