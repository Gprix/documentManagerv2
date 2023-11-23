import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DataBlocksState {
  dataBlocks: DataBlock[];
}

interface DataBlocksActions {
  setDataBlocks: (dataBlocks: DataBlock[]) => void;
  reset: () => void;
}

export const useDataBlocksStore = create(
  persist<DataBlocksState & DataBlocksActions>(
    (set, get) => ({
      dataBlocks: [],
      setDataBlocks: (dataBlocks: DataBlock[]) => {
        set({ dataBlocks });
      },
      reset: () => {
        set({
          dataBlocks: [],
        });
      },
    }),
    {
      name: "datablocks-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
