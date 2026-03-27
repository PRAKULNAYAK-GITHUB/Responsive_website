const galleryImages = [
  "./assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg",
  "./assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg",
  "./assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg",
  "./assets/aed0e9a718e6863cb177edc099de63dbd908eb05.jpg",
  "./assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg",
  "./assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg",
  "./assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg",
  "./assets/aed0e9a718e6863cb177edc099de63dbd908eb05.jpg"
];

const fragrances = [
  { name: "Original", image: "./assets/a206a3992f8dd3b83e58b96d68af3ba37d448aff.png" },
  { name: "Lily", image: "./assets/b2f71c4475324f34aad0a5dfd4ccc2ae5d683571.png" },
  { name: "Rose", image: "./assets/image1.png" }
];

const plans = {
  single: 99.99,
  double: 169.99
};

let activeImageIndex = 0;
let activeFragrance = fragrances[0];
let activeDoubleFragranceOne = fragrances[0];
let activeDoubleFragranceTwo = fragrances[1];
let activePlan = "single";

const mainImage = document.getElementById("mainProductImage");
const thumbGrid = document.getElementById("thumbGrid");
const galleryDots = document.getElementById("galleryDots");
const fragranceList = document.getElementById("fragranceList");
const fragranceListDoubleOne = document.getElementById("fragranceListDoubleOne");
const fragranceListDoubleTwo = document.getElementById("fragranceListDoubleTwo");
const monthlyBottle = document.getElementById("monthlyBottle");
const freeBottles = document.getElementById("freeBottles");
const doubleMonthlyBottles = document.getElementById("doubleMonthlyBottles");
const doubleFreeBottles = document.getElementById("doubleFreeBottles");
const cartNote = document.getElementById("cartNote");
const toast = document.getElementById("toast");
const searchToggle = document.getElementById("searchToggle");
const siteSearch = document.getElementById("siteSearch");
const siteSearchInput = document.getElementById("siteSearchInput");

function renderGallery() {
  thumbGrid.innerHTML = "";
  galleryDots.innerHTML = "";

  galleryImages.forEach((src, index) => {
    const thumbBtn = document.createElement("button");
    thumbBtn.type = "button";
    thumbBtn.className = index === activeImageIndex ? "active" : "";
    thumbBtn.innerHTML = `<img src="${src}" alt="Product thumbnail ${index + 1}">`;
    thumbBtn.addEventListener("click", () => setMainImage(index));
    thumbGrid.appendChild(thumbBtn);

    const dot = document.createElement("span");
    dot.className = `dot ${index === activeImageIndex ? "active" : ""}`;
    galleryDots.appendChild(dot);
  });
}

function setMainImage(index) {
  activeImageIndex = (index + galleryImages.length) % galleryImages.length;
  mainImage.src = galleryImages[activeImageIndex];
  renderGallery();
}

function renderFragrances() {
  fragranceList.innerHTML = "";
  freeBottles.innerHTML = "";
  fragranceListDoubleOne.innerHTML = "";
  fragranceListDoubleTwo.innerHTML = "";
  doubleMonthlyBottles.innerHTML = "";
  doubleFreeBottles.innerHTML = "";

  fragrances.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `fragrance ${item.name === activeFragrance.name ? "active" : ""}`;
    button.innerHTML = `<div class="fragrance-label"><span class="radio-mark ${item.name === activeFragrance.name ? "checked" : ""}" aria-hidden="true"></span><small>${item.name}</small></div><img src="${item.image}" alt="${item.name} fragrance">`;
    button.addEventListener("click", () => {
      activeFragrance = item;
      monthlyBottle.src = item.image;
      renderFragrances();
      updateCartNote();
    });
    fragranceList.appendChild(button);

    const mini = document.createElement("img");
    mini.src = item.image;
    mini.alt = `${item.name} sample bottle`;
    freeBottles.appendChild(mini);
  });

  renderDoubleFragranceList(fragranceListDoubleOne, activeDoubleFragranceOne, (item) => {
    activeDoubleFragranceOne = item;
    renderFragrances();
    updateCartNote();
  });

  renderDoubleFragranceList(fragranceListDoubleTwo, activeDoubleFragranceTwo, (item) => {
    activeDoubleFragranceTwo = item;
    renderFragrances();
    updateCartNote();
  });

  [activeDoubleFragranceOne, activeDoubleFragranceTwo].forEach((item, index) => {
    const monthly = document.createElement("img");
    monthly.src = item.image;
    monthly.alt = `Monthly bottle ${index + 1} - ${item.name}`;
    doubleMonthlyBottles.appendChild(monthly);
  });

  fragrances.forEach((item) => {
    const mini = document.createElement("img");
    mini.src = item.image;
    mini.alt = `${item.name} sample bottle`;
    doubleFreeBottles.appendChild(mini);
  });
}

function renderDoubleFragranceList(container, activeSelection, onSelect) {
  fragrances.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `fragrance ${item.name === activeSelection.name ? "active" : ""}`;
    button.innerHTML = `<div class="fragrance-label"><span class="radio-mark ${item.name === activeSelection.name ? "checked" : ""}" aria-hidden="true"></span><small>${item.name}</small></div><img src="${item.image}" alt="${item.name} fragrance ${index + 1}">`;
    button.addEventListener("click", () => onSelect(item));
    container.appendChild(button);
  });
}

function updatePlanRows() {
  document.querySelectorAll(".plan-row").forEach((row) => {
    row.classList.toggle("active", row.dataset.plan === activePlan);
  });
  document.querySelectorAll(".plan-content").forEach((content) => {
    const shouldShow = content.id === `${activePlan}PlanContent`;
    content.classList.toggle("active", shouldShow);
  });
  updateCartNote();
}

function updateCartNote() {
  const price = plans[activePlan].toFixed(2);
  if (activePlan === "double") {
    cartNote.textContent = `Double plan, ${activeDoubleFragranceOne.name} + ${activeDoubleFragranceTwo.name} selected - $${price}`;
    return;
  }

  cartNote.textContent = `Single plan, ${activeFragrance.name} selected - $${price}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function setupGalleryNav() {
  document.querySelectorAll(".gallery-nav").forEach((button) => {
    button.addEventListener("click", () => {
      const dir = Number(button.dataset.dir);
      setMainImage(activeImageIndex + dir);
    });
  });
}

function setupPlanSelection() {
  document.querySelectorAll('input[name="plan"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
      activePlan = event.target.value;
      updatePlanRows();
    });
  });
}

function setupAccordion() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    item.querySelector(".accordion-head").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".accordion-head span").textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("open");
        item.querySelector(".accordion-head span").textContent = "-";
      }
    });
  });
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  toggle.addEventListener("click", () => {
    const next = !nav.classList.contains("open");
    nav.classList.toggle("open", next);
    toggle.setAttribute("aria-expanded", String(next));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSiteSearch() {
  const searchableSections = [
    { keywords: ["home", "hero", "live your best life"], target: "#home" },
    { keywords: ["shop", "product", "subscription", "perfume"], target: "#shop" },
    { keywords: ["fragrances", "fragrance", "collection", "scents"], target: "#fragrances" },
    { keywords: ["about", "about us", "why gtg"], target: "#about" },
    { keywords: ["blog", "articles", "guides"], target: "#blog" },
    { keywords: ["contact", "footer", "newsletter"], target: "#contact" }
  ];

  searchToggle.addEventListener("click", () => {
    const next = !siteSearch.classList.contains("open");
    siteSearch.classList.toggle("open", next);
    searchToggle.setAttribute("aria-expanded", String(next));

    if (next) {
      siteSearchInput.focus();
      return;
    }

    siteSearchInput.value = "";
  });

  siteSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = siteSearchInput.value.trim().toLowerCase();

    if (!query) {
      return;
    }

    const match = searchableSections.find((section) =>
      section.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword))
    );

    if (!match) {
      showToast(`No section found for "${siteSearchInput.value}"`);
      return;
    }

    const target = document.querySelector(match.target);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`Moved to ${match.target.replace("#", "")}`);
    siteSearch.classList.remove("open");
    searchToggle.setAttribute("aria-expanded", "false");
    siteSearchInput.value = "";
  });

  siteSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      siteSearch.classList.remove("open");
      searchToggle.setAttribute("aria-expanded", "false");
      siteSearchInput.value = "";
      searchToggle.focus();
    }
  });
}

function setupInPageNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      event.preventDefault();

      if (!hash || hash === "#") {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupCartAction() {
  document.getElementById("addToCart").addEventListener("click", () => {
    const price = plans[activePlan].toFixed(2);
    const selection =
      activePlan === "double"
        ? `${activeDoubleFragranceOne.name} + ${activeDoubleFragranceTwo.name}`
        : activeFragrance.name;

    showToast(`${selection} (${activePlan}) added to cart - $${price}`);
  });
}

function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const email = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMsg");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!email.checkValidity()) {
      msg.textContent = "Please enter a valid email address.";
      msg.style.color = "#ffd6d6";
      return;
    }

    msg.textContent = `Subscribed successfully with ${email.value}`;
    msg.style.color = "#c9ffd6";
    form.reset();
  });
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

renderGallery();
renderFragrances();
setupGalleryNav();
setupPlanSelection();
setupAccordion();
setupMenu();
setupSiteSearch();
setupInPageNavigation();
setupCartAction();
setupNewsletter();
setupRevealAnimation();
updatePlanRows();
