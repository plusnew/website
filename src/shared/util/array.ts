export function fill<T>(amount: number, callback: (index: number) => T): T[] {
  const result: T[] = [];

  for (let i = 0; i < amount; i += 1) {
    result.push(callback(i));
  }

  return result;
}
