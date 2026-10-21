// Scripts that must run inline, before the page is painted. astro.config.mjs hashes this exact text
// for the Content Security Policy, so each one runs only as written here.
export const INLINE_SCRIPTS = {
  // Entrance animations hide their elements only when JavaScript can reveal them again.
  markJs: "document.documentElement.classList.add('js');",
  // One 404 page serves every missing address: addresses under /it/ get the Italian text,
  // and the language switch changes it in place.
  notFoundLang: `
const labels = { en: 'Language', it: 'Lingua' };
const langSwitch = document.getElementById('lang-switch');
const buttons = langSwitch.querySelectorAll('button');
const show = (lang) => {
  document.documentElement.lang = lang;
  langSwitch.setAttribute('aria-label', labels[lang]);
  for (const el of document.querySelectorAll('[data-lang]')) el.hidden = el.dataset.lang !== lang;
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.value === lang));
};
for (const button of buttons) button.addEventListener('click', () => show(button.value));
show(location.pathname.startsWith('/it/') ? 'it' : 'en');
langSwitch.hidden = false;
`,
};
