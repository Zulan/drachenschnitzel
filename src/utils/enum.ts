export function enumFromStringValue<T>(
  enm: { [s: string]: T },
  value: string
): T {
  if ((Object.values(enm) as unknown as string[]).includes(value)) {
    return value as unknown as T;
  }
  throw new Error(`Invalid enum value: ${value}`);
}
