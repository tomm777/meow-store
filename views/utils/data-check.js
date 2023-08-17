export const failValidation = (element, content) => {
  element.style.display = 'block';
  element.textContent = content;
};
export const elementNone = (element) => {
  element.style.display = 'none';
  return true;
};
