const BASE = window.BASE;

const images = [
  "fifth.webp",
  "second.webp",
  "third.webp",
  "fourth.webp",
  "sixth.webp",
  "seventh.webp",
  "eigth.webp",
  "nineth.webp",
];

const galleryTitle = document.getElementById("gallery_title");
const imageSlider = document.querySelector(".image_slider");
const prevBtn = document.querySelector(".prev");
const galleryContainer = document.querySelector(".gallery_container");
const nextBtn = document.querySelector(".next");

let currentImg = 0;

function fixLang(x) {
  return x === "de" || x === "en" ? x : "de";
}

const langGall = fixLang(
  window.currentLang || localStorage.getItem("lang") || "de",
);

async function renderGall(lang) {
  lang = fixLang(lang);

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  galleryTitle.textContent = lang === "de" ? "Galerie" : "Gallery";

  galleryContainer.innerHTML = images
    .map(
      (img, i) => `
  <img
    src="${BASE}img/${img}"
    alt="Gall Page ${i + 1}"
    class="menu_seite ${i === 0 ? "aktive" : ""}"
    loading="lazy"
  >`,
    )
    .join("");

  showSeite(0);
}

function showSeite(index) {
  const imgs = galleryContainer.querySelectorAll(".menu_seite");
  imgs.forEach((s, i) => s.classList.toggle("aktive", i === index));
}

renderGall(langGall);
showSeite(0);

prevBtn.addEventListener("click", () => {
  currentImg = (currentImg - 1 + images.length) % images.length;
  showSeite(currentImg);
});

nextBtn.addEventListener("click", () => {
  currentImg = (currentImg + 1) % images.length;
  showSeite(currentImg);
});

window.addEventListener("langChanged", (e) => {
  renderGall(e.detail);
});
