import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  dialogType: "create" | "update" | null;
  openDialog: (type: "create" | "update") => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialogType: null,
  openDialog: (type: "create" | "update") => set({ isOpen: true, dialogType: type }),
  closeDialog: () => set({ isOpen: false, dialogType: null }),
}));
