import { vi } from "vitest";

export const assetUrl = vi.fn((path) => `URL_PREFIX/${path}`);
