/**
 * Concat and returns a string of class names.
 * 
 * @param {...string} classes - The class names to be concatenated.
 * @returns {string} - The concatenated string of class names.
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}