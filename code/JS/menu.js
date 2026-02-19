const BASE = window.BASE;

const menuTitle = {
  en: {
    drink: "Drinks Menu",
    food: "Snacks & Finger Food",
    btn: "Or...",
  },
  de: {
    drink: "Getränkekarte",
    food: "Snacks & Fingerfood",
    btn: "Oder...",
  },
};

const menus = {
  cocktails: {
    de: [
      "Seite_1.webp",
      "Seite_2.webp",
      "Seite_3.webp",
      "Seite_4.webp",
      "Seite_5.webp",
      "Seite_6.webp",
      "Seite_7.webp",
      "Seite_8.webp",
      "Seite_9.webp",
      "Seite_10.webp",
      "Seite_11.webp",
      "Seite_12.webp",
      "Seite_13.webp",
      "Seite_14.webp",
    ],
    en: [
      "Seite_1.webp",
      "Seite_2.webp",
      "Seite_3.webp",
      "Seite_4.webp",
      "Seite_5.webp",
      "Seite_6.webp",
      "Seite_7.webp",
      "Seite_8.webp",
      "Seite_9.webp",
      "Seite_10.webp",
      "Seite_11.webp",
      "Seite_12.webp",
      "Seite_13.webp",
      "Seite_14.webp",
    ],
  },
  snacks: {
    de: ["Seite_15.webp", "Seite_16.webp"],
    en: ["Seite_15.webp", "Seite_16.webp"],
  },
};

const menuTitleEl = document.getElementById("menu_title");
const menuBtn = document.getElementById("menu_btn");

const menuContainer = document.querySelector(".menu_container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSeite = 0;
let currentMenu = "drink";

function fixLang(x) {
  return x === "de" || x === "en" ? x : "de";
}

const langMenu = fixLang(
  window.currentLang || localStorage.getItem("lang") || "de",
);

async function renderMenu(lang) {
  lang = fixLang(lang);
  const t = menuTitle[lang];

  const menuKey = currentMenu === "drink" ? "cocktails" : "snacks";
  const imgs = menus[menuKey][lang];

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  menuTitleEl.textContent = currentMenu === "drink" ? t.drink : t.food;
  menuBtn.textContent = t.btn;

  menuContainer.innerHTML = imgs
    .map(
      (img, i) => `
      <img
        src="${BASE}img/dr_menu/${lang}/${img}"
        alt="Menu Page ${i + 1}"
        class="menu_seite ${i === 0 ? "active" : ""}"
        loading="lazy"
      >
    `,
    )
    .join("");

  currentSeite = 0;
  showSeite(0);
}

function showSeite(index) {
  const seites = menuContainer.querySelectorAll(".menu_seite");
  seites.forEach((s, i) => s.classList.toggle("active", i === index));
}

renderMenu(langMenu);
showSeite(0);

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentMenu = currentMenu === "drink" ? "food" : "drink";

  const langNow = fixLang(
    window.currentLang || localStorage.getItem("lang") || "de",
  );
  renderMenu(langNow);
});

prevBtn.addEventListener("click", () => {
  const langNow = fixLang(
    window.currentLang || localStorage.getItem("lang") || "de",
  );
  const menuKey = currentMenu === "drink" ? "cocktails" : "snacks";
  const imgs = menus[menuKey][langNow];
  currentSeite = (currentSeite - 1 + imgs.length) % imgs.length;
  showSeite(currentSeite);
});

nextBtn.addEventListener("click", () => {
  const langNow = fixLang(
    window.currentLang || localStorage.getItem("lang") || "de",
  );
  const menuKey = currentMenu === "drink" ? "cocktails" : "snacks";
  const imgs = menus[menuKey][langNow];
  currentSeite = (currentSeite + 1) % imgs.length;
  showSeite(currentSeite);
});

// при клике на кнопку языка слушает от index
window.addEventListener("langChanged", (e) => {
  renderMenu(e.detail);
});

menuContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu_seite")) {
    document.body.classList.toggle("hide_layout");
  }
});
