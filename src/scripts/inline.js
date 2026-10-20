// Scripts that must run inline, before the page is painted. astro.config.mjs hashes this exact text
// for the Content Security Policy, so each one runs only as written here.
export const INLINE_SCRIPTS = {
  // Entrance animations hide their elements only when JavaScript can reveal them again.
  markJs: "document.documentElement.classList.add('js');",
  // One 404 page serves every missing address: addresses under /it/ get the Italian text.
  notFoundLang: `
if (location.pathname.startsWith('/it/')) {
  document.documentElement.lang = 'it';
  document.title = 'Pagina non trovata, Daniele Greco';
  for (const el of document.querySelectorAll('[data-lang]')) el.hidden = el.dataset.lang !== 'it';
}
`,
};
