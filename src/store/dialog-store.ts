import { Withdrawal } from "../types/type-withdrawal";
import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  dialogType: "create" | "update" | null;
  openDialog: (type: "create" | "update") => void;
  closeDialog: () => void;
}
interface Dialog{
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
}

interface DialogAdmin {
  isOpen: boolean;
  selectedWithdrawal: Withdrawal | null;
  openDialog: (withdrawal: Withdrawal) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialogType: null,
  openDialog: (type: "create" | "update") => set({ isOpen: true, dialogType: type }),
  closeDialog: () => set({ isOpen: false, dialogType: null }),
}));


export const useDialogNew= create<Dialog>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true,  }),
  closeDialog: () => set({ isOpen: false,  }),
}))
export const useDialog= create<Dialog>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true,  }),
  closeDialog: () => set({ isOpen: false,  }),
}))

export const useDialogAdmin = create<DialogAdmin>((set) => ({
  isOpen: false,
  selectedWithdrawal: null,
  openDialog: (withdrawal) => set({isOpen: true, selectedWithdrawal: withdrawal}),
  closeDialog: () => set({isOpen: false, selectedWithdrawal: null})
}))