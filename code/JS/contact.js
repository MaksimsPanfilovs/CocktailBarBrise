const links = {
  en: {
    href: "https://www.google.com/maps/place/Lehderstra%C3%9Fe+72,+13086+Berlin/@52.5621463,13.5263711,14z/data=!4m6!3m5!1s0x47a84df072732133:0x723d1972f466dd76!8m2!3d52.5511274!4d13.4349119!16s%2Fg%2F11q2nb3pxs?authuser=0&hl=en&entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9704.088299005125!2d13.427185638091228!3d52.55112560000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84df072732133%3A0xadb01c97c57c0561!2sCocktailbar%20Brise!5e0!3m2!1sen!2sde!4v1756415977150!5m2!1sen!2sde",
  },
  de: {
    href: "https://www.google.com/maps/place/Lehderstra%C3%9Fe+72,+13086+Berlin/@52.5621463,13.5263711,14z/data=!4m6!3m5!1s0x47a84df072732133:0x723d1972f466dd76!8m2!3d52.5511274!4d13.4349119!16s%2Fg%2F11q2nb3pxs?authuser=0&hl=de&entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9704.088299005125!2d13.427185638091228!3d52.55112560000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84df072732133%3A0xadb01c97c57c0561!2sCocktailbar%20Brise!5e0!3m2!1sen!2sde!4v1756415977150!5m2!1sen!2sde",
  },
};

const contactTitle = document.querySelector(".cont_title");
const addressTitle = document.getElementById("adr_title");
const addressLink = document.getElementById("adr_link");
const telTitle = document.getElementById("tel_title");
const emailTitle = document.getElementById("post");
const emailLink = document.getElementById("email");
const frameLink = document.getElementById("iframe_map");

function fixLang(x) {
  return x === "de" || x === "en" ? x : "de";
}

const langCont = fixLang(
  window.currentLang || localStorage.getItem("lang") || "de",
);

async function renderContact(lang) {
  lang = fixLang(lang);
  const l = links[lang];

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  contactTitle.textContent = lang === "de" ? "Kontakt" : "Contacts";
  addressTitle.textContent = lang === "de" ? "Adresse" : "Address";
  telTitle.textContent = lang === "de" ? "Telefon" : "Phone";
  emailTitle.textContent = lang === "de" ? "E-mail" : "Email";

  addressLink.href = l.href;
  addressLink.target = "_blank";

  frameLink.src = l.src;
  console.log("FrameLink: ", frameLink);
}

renderContact(langCont);

emailLink.addEventListener("click", (e) => {
  e.preventDefault();
  const langNow = fixLang(
    window.currentLang || localStorage.getItem("lang") || "de",
  );

  navigator.clipboard.writeText(emailLink.textContent);

  if (langNow === "de") {
    emailLink.textContent = "E-Mail kopiert!";
  } else {
    emailLink.textContent = "Email copied!";
  }

  setTimeout(() => {
    emailLink.textContent = "cocktailbarbrise@web.de";
  }, 1500);
});

window.addEventListener("langChanged", (e) => {
  renderContact(e.detail);
});

