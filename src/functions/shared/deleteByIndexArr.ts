export function removeElementAtIndex<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length) {
    return array; // Возвращаем массив без изменений, если индекс недействителен
  }

  return [...array.slice(0, index), ...array.slice(index + 1)];
}
