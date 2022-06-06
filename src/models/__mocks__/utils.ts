import { vi } from "vitest";

export const assetUrl = vi.fn((path) => `ASSET_PREFIX/${path}`);
