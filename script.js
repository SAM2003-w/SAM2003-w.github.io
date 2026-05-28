const photoSources = {
  portrait: "assets/photos/portrait.png",
  positioning: "assets/photos/satellite-positioning.png",
  approach: "assets/photos/heterogeneous-approach.png",
  graduation: "assets/photos/polyu-graduation.jpg",
  engine: "assets/photos/engine-inspection.jpg",
  lowAltitude: "assets/photos/low-altitude-cockpit.jpg",
  fieldLaptop: "assets/photos/field-laptop.jpg",
  aeolusTeam: "assets/photos/aeolus-team.jpg",
  airport: "assets/photos/airport-operations.jpg",
  city: "assets/photos/city-architecture.jpg",
  tokyo: "assets/photos/tokyo-street.jpg",
  brandPlay: "assets/photos/brand-play.jpg",
  citySeason: "assets/photos/city-season.jpg",
  foodCulture: "assets/photos/food-culture.jpg",
  travelTown: "assets/photos/travel-town.jpg",
  heritage: "assets/photos/heritage-place.jpg",
  nature: "assets/photos/botanical-light.jpg",
  fintech: "assets/photos/fintech-dashboard.png"
};

function initPhotos() {
  document.querySelectorAll("[data-photo]").forEach((card) => {
    const key = card.dataset.photo;
    const img = card.querySelector("img");
    if (!img || !photoSources[key]) return;
    card.classList.remove("is-missing");
    img.src = photoSources[key];
    img.addEventListener("error", () => {
      card.classList.add("is-missing");
      img.removeAttribute("src");
    }, { once: true });
  });

  document.querySelectorAll(".brand-icon img").forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = img.closest(".brand-icon");
      if (!fallback) return;
      fallback.textContent = fallback.closest(".skill-item")?.innerText.slice(0, 2).toUpperCase() || "SK";
    }, { once: true });
  });
}

function initTiltCards() {
  const cards = document.querySelectorAll(".feature-card, .about-grid article, .intern-card, .education-grid article");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  });

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  const links = [...document.querySelectorAll(".desktop-nav a")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}

function initLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = document.querySelector("[data-lightbox-img]");
  const caption = document.querySelector("[data-lightbox-caption]");
  const close = document.querySelector("[data-lightbox-close]");

  document.querySelectorAll(".life-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (card.classList.contains("is-missing") || !img?.src) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      caption.textContent = card.dataset.caption || "";
      lightbox.hidden = false;
    });
  });

  close.addEventListener("click", () => {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close.click();
  });
}

initPhotos();
initNavigation();
initLightbox();
initTiltCards();
