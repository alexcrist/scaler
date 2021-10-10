import LZString from 'lz-string';

export const toHash = (object) => {
  const str = JSON.stringify(object);
  return LZString.compressToEncodedURIComponent(str);
};

export const fromHash = (hash) => {
  const str = LZString.decompressFromEncodedURIComponent(hash);
  return JSON.parse(str);
};