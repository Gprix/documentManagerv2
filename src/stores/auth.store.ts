import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  uid: string | undefined;
}
interface AuthActions {
  setUid: (uid: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set, get) => ({
      uid: undefined,
      setUid: (uid: string) => {
        set({ uid });
      },
      reset: () => {
        set({ uid: undefined });
      },
    }),
    {
      name: "auth-store",
    }
  )
);
