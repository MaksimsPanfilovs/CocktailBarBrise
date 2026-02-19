window.BASE = "../";

// Тексты, которые короткие и не требуют отдельного файла
const texts = {
  en: {
    nav: [
      { title: "Drinks menu", href: window.BASE + "menu/index.html" },
      { title: "Gallery", href: window.BASE + "gallery/index.html" },
      { title: "Activities", href: window.BASE + "activities/index.html" },
      { title: "Contacts", href: window.BASE + "contacts/index.html" },
    ],
  },
  de: {
    nav: [
      { title: "Getränkekarte", href: window.BASE + "menu/index.html" },
      { title: "Galerie", href: window.BASE + "gallery/index.html" },
      { title: "Aktivitäten", href: window.BASE + "activities/index.html" },
      { title: "Kontakt", href: window.BASE + "contacts/index.html" },
    ],
  },
};

// Элементы
const burger = document.getElementById("menu_toggle");
const navCont = document.querySelector("nav");
const navLeft = document.getElementById("nav_left");
const langToggle = document.getElementById("lang_toggle");

function fixLang(x) {
  return x === "de" || x === "en" ? x : "de";
}

let currentLang = fixLang(localStorage.getItem("lang"));
window.currentLang = currentLang;

// Рендер контента
async function render(lang) {
  const t = texts[lang];

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  // Навигация
  navLeft.innerHTML = `<ul>${t.nav
    .map((item) => `<li><a href="${item.href}">${item.title}</a></li>`)
    .join("")}</ul>`;

  // Кнопка
  langToggle.textContent = lang === "de" ? "EN" : "DE";
}

// Инициализация
render(currentLang);

// Переключение языка
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "de" ? "en" : "de";
  window.currentLang = currentLang;
  render(currentLang);

  // 🔔 сообщаем всем
  window.dispatchEvent(new CustomEvent("langChanged", { detail: currentLang }));
});

// открыть / закрыть по бургеру
burger.addEventListener("click", (e) => {
  e.stopPropagation(); // ⛔ не даём событию всплыть
  navCont.classList.toggle("is_open");
});

// клик внутри меню — НЕ закрывать
navLeft.addEventListener("click", (e) => {
  e.stopPropagation();
});

// клик ВНЕ меню — закрыть
document.addEventListener("click", () => {
  if (navCont.classList.contains("is_open")) {
    navCont.classList.remove("is_open");
  }
});

navLeft.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navCont.classList.remove("is_open");
  });
});
