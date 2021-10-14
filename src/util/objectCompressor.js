import LZString from 'lz-string';

export const toHash = (stateObject) => {
  const str = JSON.stringify(stateObject);
  return LZString.compressToEncodedURIComponent(str);
};

export const fromHash = (hash) => {
  const str = LZString.decompressFromEncodedURIComponent(hash);
  return JSON.parse(str);
};