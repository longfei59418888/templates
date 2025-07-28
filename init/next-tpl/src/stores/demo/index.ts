import { createStore } from 'zustand/vanilla';

export interface DemoState {
  data?: string;
}

interface DemoAction {
  setData: (data: string) => void;
}
export type DemoStore = DemoState & DemoAction;

export const createDemoStore = (initState: Partial<DemoStore>) => {
  return createStore<DemoStore>()((set) => ({
    ...initState,
    setData: (newData) => set({ data: newData }),
  }));
};
