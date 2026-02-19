const BASE = window.BASE;

const activityBoxTitles = {
  en: {
    darts: "Darts",
    live: "Live Football Broadcasts",
    party: "Seasonal Parties",
  },
  de: {
    darts: "Darts",
    live: "Live Fußballübertragungen",
    party: "Saisonale Partys",
  },
};

const activTitle = document.getElementById("activity_title");
const dartsTitle = document.getElementById("darts_title");
const dartsText = document.getElementById("darts_text");
const liveTitle = document.getElementById("live_title");
const liveText = document.getElementById("live_text");
const partyTitle = document.getElementById("party_title");
const partyText = document.getElementById("party_text");

function fixLang(x) {
  return x === "de" || x === "en" ? x : "de";
}

const langActiv = fixLang(
  window.currentLang || localStorage.getItem("lang") || "de",
);

async function loadHTML(path, container) {
  const res = await fetch(path);
  const html = await res.text();
  container.innerHTML = html;
}

async function renderActiv(lang) {
  lang = fixLang(lang);
  const t = activityBoxTitles[lang];

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  dartsTitle.textContent = t.darts;
  liveTitle.textContent = t.live;
  partyTitle.textContent = t.party;

  activTitle.textContent = lang === "de" ? "Aktivitäten" : "Activities";

  await loadHTML(`${BASE}lang_text/${lang}/darts.html`, dartsText);
  await loadHTML(`${BASE}lang_text/${lang}/live_tv.html`, liveText);
  await loadHTML(`${BASE}lang_text/${lang}/parties.html`, partyText);
}

renderActiv(langActiv);

window.addEventListener("langChanged", (e) => {
  renderActiv(e.detail);
});
