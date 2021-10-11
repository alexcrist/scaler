export const downloadFile = (filename, textContent) => {
  const element = document.createElement('a');
  element.setAttribute('href', textContent);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};