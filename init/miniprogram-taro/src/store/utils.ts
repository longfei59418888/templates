import { StoreApi, UseBoundStore, create } from 'zustand'
import { capitalize } from '@tarojs/shared'
import { Mutate, StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla'

type Hook<T> = {
  [K in keyof T as `use${Capitalize<string & K>}`]: () => T[K]
}

type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

export function createSelectorHooks<T, A = {}, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
  initializer: StateCreator<T & A, [], Mos>,
) {
  const store = create(initializer)
  Object.keys(store.getState() as StateCreator<T & A, [], Mos>).forEach((key) => {
    const selector = (state: ExtractState<Mutate<StoreApi<T & A>, Mos>>) => state[key]
    store[`use${capitalize(key)}`] = () => store(selector)
  })
  return store as UseBoundStore<StoreApi<T & A> & T & A> & Hook<T & A>
}
