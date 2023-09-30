// // Geo store

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  uid: string | undefined;
}
interface AuthActions {
  setUid: (uid: string) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set, get) => ({
      uid: undefined,
      setUid: (uid: string) => {
        set({ uid });
      },
    }),
    {
      name: "auth-store",
    }
  )
);
