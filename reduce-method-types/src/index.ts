export const reduceObject = <T extends Record<string, T[keyof T]>, K extends keyof T>(
  object: T,
  fields: K[]
): Record<K, T[keyof T]> =>
  Object.keys(object)
    .filter(key => fields.includes(key as K))
    .reduce(
      (prev: Record<string, unknown>, curr: string) => ({
        ...{ [curr]: object[curr] },
      }),
      {}
    ) as Record<K, T[keyof T]>;

console.log(
  reduceObject(
    {
      test: 'test',
      test2: 'test2',
    },
    ['test']
  ).test
);
