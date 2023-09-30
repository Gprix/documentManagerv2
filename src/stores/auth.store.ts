// // Geo store

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// import { defaultValues } from "./benefit.store.helpers";
// import { BenefitStoreValues } from "./benefit.store.types";
// import { getStoreSetState } from "../../utils/common.utils";

// export const useBenefitStore = create(
//   persist<BenefitStoreValues>(
//     (set, get) => {
//       return {
//         ...defaultValues,
//         setProductBenefit: payload => {
//           const prev = get().productBenefit;
//           const temporalBenefit = getStoreSetState(payload, prev);
//           set({ productBenefit: temporalBenefit });
//         },
//         reset: () => set({ ...defaultValues })
//       };
//     },
//     {
//       name: "artisn-benefit",
//       storage: createJSONStorage(
//         "__DEV__" in global ? () => AsyncStorage : () => localStorage
//       )
//     }
//   )
// );

interface AuthState {
  uid: string;
}
interface AuthActions {
  setUid: (uid: string) => void;
}

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set, get) => ({
      uid: "",
      setUid: (uid: string) => {
        set({ uid });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
