import { toHash } from './objectCompressor';

export const shareUrl = async (saveData) => {
  const hash = toHash(saveData);
  const url = window.location.origin + window.location.pathname + '?d=' + hash;
  try {
    await navigator.clipboard.writeText(url);
    alert('A link to your work has been copied to your clipboard.');
  } catch (e) {
    prompt('Save the following URL to access your work:', url);
  }
};