'use client';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { createDemoStore, DemoStore } from '@/stores/demo/index';

export const StoreContext = createContext<StoreApi<DemoStore> | null>(null);

export const DemoProvider = ({
  children,
  initData,
}: {
  children: ReactNode;
  initData: Partial<DemoStore>;
}) => {
  console.log(initData)
  const storeRef = useRef<StoreApi<DemoStore>>(null);
  if (storeRef.current === null) {
    console.log(storeRef.current)
    storeRef.current = createDemoStore(initData);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useDemo: <U>(selector: (state: DemoStore) => U) => U = (
  selector,
) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Missing StoreProvider');
  return useStore(store, selector);
};
