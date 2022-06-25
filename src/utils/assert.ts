export class AssertionError extends Error {}

export function assert(value: boolean, message = "assertion failed") {
  if (!value) {
    throw new AssertionError(message);
  }
}
