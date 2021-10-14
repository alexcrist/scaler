import _ from 'lodash';
import { fromHash, toHash } from './objectCompressor';

const RECENT_KEY = 'd';
const LOCAL_SAVES_KEY = 'saves';

// Load / save the user's current work =========================================

export const loadRecent = () => {
  const hash = localStorage.getItem(RECENT_KEY);
  if (hash === null) {
    return null;
  }
  return fromHash(hash);
};

export const storeRecent = (data) => {
  const hash = toHash(data);
  localStorage.setItem(RECENT_KEY, hash);
};

// Load / save the user's explicitly saved work ================================

export const loadLocalSaves = () => {
  let saves = localStorage.getItem(LOCAL_SAVES_KEY);
  if (saves === null) {
    return [];
  } else {
    saves = fromHash(saves);
  }

  const savesArray = [];
  for (const name of Object.keys(saves)) {
    const { data, date } = saves[name];
    savesArray.push({
      name,
      data,
      date
    });
  }

  return _(savesArray)
    .sortBy('date')
    .reverse()
    .value();
};

export const saveLocal = (data) => {
  let saves = localStorage.getItem(LOCAL_SAVES_KEY);
  if (saves === null) {
    saves = {};
  } else {
    saves = fromHash(saves);
  }

  const name = prompt('Save as:')
  if (name === null) {
    return;
  }
  if (name === '') {
    alert('Invalid name.');
    return;
  }

  const previous = saves[name];
  if (previous) {
    const shouldOverwrite = window.confirm(`Overwrite previous "${name}"?`);
    if (!shouldOverwrite) {
      return;
    }
  }

  saves[name] = {
    data,
    date: Date.now()
  };

  localStorage.setItem(LOCAL_SAVES_KEY, toHash(saves));
};
