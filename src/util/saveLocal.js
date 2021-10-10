import { fromHash, toHash } from './hasher';

const key = 'd';

export const loadLocal = () => {
  const hash = localStorage.getItem(key);
  if (hash === null) {
    return null;
  }

  return fromHash(hash);
};

export const saveLocal = (data) => {
  const hash = toHash(data);
  localStorage.setItem(key, hash);
};