const BASE = window.BASE;

const homeTexts = {
  en: {
    hero: "Brise – Cocktails & More",
  },
  de: {
    hero: "Brise – Cocktails & Mehr",
  },
};

const heroTitle = document.getElementById("hero_title");
const aboutText = document.getElementById("about_text");
const reservationText = document.getElementById("reservation_text");
const hoursTable = document.getElementById("hours_table");
const aboutTitle = document.getElementById("about_title");
const reservationTitle = document.getElementById("reservation_title");
const hoursTitle = document.getElementById("hours_title");
const reservationPhone = document.getElementById("reservation_phone");



function fixLang(x) {
  return x === "de" || x === "en" ? x : "de";
}

const langHome = fixLang(
  window.currentLang || localStorage.getItem("lang") || "de"
);

// Функция загрузки HTML из файлов
async function loadHTML(path, container) {
  const res = await fetch(path);
  const html = await res.text();
  container.innerHTML = html;
}

// Рендер контента
async function renderHome(lang) {
  lang = fixLang(lang);
  const t = homeTexts[lang];

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  heroTitle.textContent = t.hero;

  aboutTitle.textContent = lang === "de" ? "Über Uns" : "About Us";
  reservationTitle.textContent = lang === "de" ? "Reservierung" : "Reservation";
  hoursTitle.textContent = lang === "de" ? "Öffnungszeiten" : "Opening Hours";

  await loadHTML(`${BASE}lang_text/${lang}/about.html`, aboutText);
  await loadHTML(`${BASE}lang_text/${lang}/reservation.html`, reservationText);
  await loadHTML(`${BASE}lang_text/${lang}/hours.html`, hoursTable);
  await loadHTML(`${BASE}lang_text/${lang}/reservation_tel.html`, reservationPhone);
}

renderHome(langHome);

// при клике на кнопку языка слушает от index
window.addEventListener("langChanged", (e) => {
  renderHome(e.detail);
});
