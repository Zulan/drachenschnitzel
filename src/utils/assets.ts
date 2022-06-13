const assets = import.meta.globEager("@/assets/**/*", { as: "url" });

export function assetUrl(path: string): string {
  const key = Object.keys(assets).find((fullPath) =>
    fullPath.endsWith(`/assets/${path}`)
  );
  if (key === undefined) {
    throw Error(`asset "${path}" not found`);
  }
  return assets[key].default;
}
