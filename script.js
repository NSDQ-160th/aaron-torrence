const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.getElementById("nav-links");
const backdrop = document.querySelector(".nav-backdrop");
const year = document.getElementById("year");

if (year) year.textContent = String(new Date().getFullYear());

function menuOpen() {
  return nav?.classList.contains("open") ?? false;
}

function setMenu(open) {
  if (!toggle || !nav) return;
  nav.classList.toggle("open", open);
  document.body.classList.toggle("nav-locked", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  const label = toggle.querySelector(".nav-toggle-text");
  if (label) label.textContent = open ? "Close" : "Menu";
  if (backdrop) {
    backdrop.hidden = !open;
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");
  }
  if (open) {
    navLinks?.querySelector("a")?.focus();
  }
}

if (toggle && nav && navLinks) {
  toggle.addEventListener("click", () => setMenu(!menuOpen()));

  backdrop?.addEventListener("click", () => setMenu(false));

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches && menuOpen()) {
      setMenu(false);
    }
  });
}

const reveal = document.querySelectorAll(".reveal");
if (reveal.length && "IntersectionObserver" in window) {
  const motionOk = window.matchMedia("(prefers-reduced-motion: reduce)").matches === false;
  if (motionOk) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveal.forEach((el) => io.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add("in"));
  }
} else {
  reveal.forEach((el) => el.classList.add("in"));
}

const header = document.querySelector(".nav");
if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
