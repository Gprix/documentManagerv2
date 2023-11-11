import { Template } from "@/services/template/template.service.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TemplateState {
  templates: Template[];
}

interface TemplateActions {
  setTemplates: (templates: Template[]) => void;
  reset: () => void;
}

export const useTemplateStore = create(
  persist<TemplateState & TemplateActions>(
    (set, get) => ({
      templates: [],
      setTemplates: (templates: Template[]) => {
        set({ templates });
      },
      reset: () => {
        set({ templates: [] });
      },
    }),
    {
      name: "template-store",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (s) => ({
        templates: s.templates,
      }),
    }
  )
);
