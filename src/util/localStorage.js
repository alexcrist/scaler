import { fromHash, toHash } from './stateHasher';

const KEY = 'd';

export const loadLocal = () => {
  const hash = localStorage.getItem(KEY);
  if (hash === null) {
    return null;
  }
  return fromHash(hash);
};

export const saveLocal = (data) => {
  const hash = toHash(data);
  localStorage.setItem(KEY, hash);
};