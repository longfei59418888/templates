export type AsyncAction<R, P = undefined | Array<unknown>> = P extends undefined
  ? () => Promise<R>
  : P extends Array<unknown>
    ? (...args: P) => Promise<R>
    : (args: P) => Promise<R>;

export type Action<R, P = undefined | Array<unknown>> = P extends undefined
  ? () => R
  : P extends Array<unknown>
    ? (...args: P) => R
    : (args: P) => R;
