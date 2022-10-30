export type sortable<T> = (first: T, second: T) => number;

export type sortableWithOption<T, TOption> = (options?: TOption) => sortable<T>;

export type datable = Date | number | string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericTuple<T> = [(item: T) => any, sortable<any>];

export type ByValuesSorter<T, TTuple extends GenericTuple<T>[]> = [
  ...{
    [Key in keyof TTuple]: TTuple[Key] extends [
      (data: T) => infer U,
      sortable<infer X>
    ]
      ? [U] extends [X]
        ? TTuple[Key]
        : [TypeError, "Sortable type does not match with value provider."]
      : TTuple[Key];
  }
];
