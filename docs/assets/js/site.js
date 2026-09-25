/**
 * Main site shared script.
 * - Fills the current year in the footer.
 * - Keeps behavior intentionally minimal so non-JS pages still work.
 */
document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
