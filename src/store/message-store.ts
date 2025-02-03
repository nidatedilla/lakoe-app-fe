import { create } from 'zustand';

interface MessageTemplate {
  id: string;
  content: string;
  name: string;
}

interface MessageStore {
  templates: MessageTemplate[];
  setTemplates: (templates: MessageTemplate[]) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  templates: [],
  setTemplates: (templates) => set({ templates }),
}));
