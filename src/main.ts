import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { about, approach, contact, kairosFootnote } from "./copy";
import { works, selected, type Work } from "./work";
import { bindInternalLinks, parsePath, viewId, type Route } from "./router";
import type { Engine } from "./webgl/engine";
import { studio } from "./r3f/studio";

gsap.registerPlugin(ScrollTrigger);

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

function tile(w: Work) {
  const kairos = w.slug === "kairos-rejuvenation";
  const href = w.status === "live" && w.href ? w.href : `/work/${w.slug}`;
  const ext = Boolean(w.href);
  return `<a class="tile${w.status === "todo" ? " is-todo" : ""}${kairos ? " is-kairos" : ""}" href="${href}" ${ext ? 'target="_blank" rel="noopener"' : ""}>
    <img src="${w.plate}" alt="" />
    <div class="tile-body">
      <div class="tile-meta">${w.lane} · ${w.role} · ${w.year}</div>
      <h3>${w.title}</h3>
      <p>${w.blurb}</p>
    </div>
  </a>`;
}

document.getElementById("selected-grid")!.innerHTML = selected.map(tile).join("");
document.getElementById("work-grid")!.innerHTML = works.map(tile).join("");
document.getElementById("approach-grid")!.innerHTML = approach
  .map(
    (a) =>
      `<article><span>${a.label}</span><h3>${a.title}</h3><p>${a.body}</p></article>`
  )
  .join("");

const setText = (id: string, value: string) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
};
setText("about-short", about.short);
setText("about-also", about.also);
setText("about-also-2", about.also);
setText("about-long-1", about.long[0]);
setText("about-long-2", about.long[1]);
setText("email-todo", contact.emailTodo);
setText("email-todo-2", contact.emailTodo);
setText("contact-note", contact.note);

const foot = `<strong>${kairosFootnote.label}</strong><br />
  ${kairosFootnote.name} — ${kairosFootnote.with}<br />
  <a href="${kairosFootnote.url}">${kairosFootnote.url.replace("https://", "")}</a><br />
  ${kairosFootnote.address}<br />
  ${kairosFootnote.phone} · ${kairosFootnote.email}`;
for (const id of ["kairos-foot", "kairos-foot-2"]) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = foot;
}

const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav-toggle") as HTMLButtonElement | null;
toggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.textContent = open ? "Close" : "Menu";
  document.body.classList.toggle("is-locked", Boolean(open));
});
document.getElementById("nav-links")?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).tagName === "A") {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.textContent = "Menu";
    document.body.classList.remove("is-locked");
  }
});

const views = ["view-home", "view-work", "view-about", "view-contact", "view-case"];
let engine: Engine | null = null;
let lenis: Lenis | null = null;
let homeTriggers: ScrollTrigger[] = [];

function show(route: Route) {
  if (route.name === "lab") {
    window.location.assign("/lab");
    return;
  }
  const id = viewId(route);
  for (const v of views) {
    const el = document.getElementById(v);
    if (el) el.hidden = v !== id;
  }
  if (route.name === "case") {
    const item = works.find((w) => w.slug === route.slug);
    const root = document.getElementById("case-root");
    if (root) {
      root.innerHTML = item
        ? `<p class="eyebrow">${item.lane}</p>
           <h1>${item.title}</h1>
           <p class="section-lede">${item.role} · ${item.year}</p>
           <p>${item.blurb}</p>
           <img src="${item.plate}" alt="" style="margin-top:1.5rem;max-width:48rem" />
           <p class="todo" style="margin-top:1rem">TODO — Aaron: stills, reel cut, tools for this piece.</p>
           <p><a href="/work">← Work</a></p>`
        : `<h1>Not found</h1><p><a href="/work">Work</a></p>`;
    }
  }
  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true });
  ScrollTrigger.refresh();
  if (route.name === "home") engine?.setScene("hero");
  else if (route.name === "about") engine?.setScene("about");
  else if (route.name === "contact") engine?.setScene("contact");
  else engine?.setScene("work");
}

const dip = document.getElementById("dip");
const iris = document.getElementById("iris");

function go(href: string) {
  const url = href.startsWith("http") ? new URL(href) : new URL(href, window.location.origin);
  if (url.origin !== window.location.origin) {
    window.location.href = href;
    return;
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const next = () => {
    history.pushState({}, "", url.pathname);
    show(parsePath(url.pathname));
    dip?.classList.remove("is-on");
  };
  if (reducedMotion) {
    next();
    return;
  }
  dip?.classList.add("is-on");
  window.setTimeout(next, 180);
}

document.addEventListener("pointermove", (e) => {
  studio.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  studio.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  if (!iris) return;
  iris.style.left = `${e.clientX}px`;
  iris.style.top = `${e.clientY}px`;
});
document.addEventListener("pointerover", (e) => {
  const on = Boolean((e.target as HTMLElement | null)?.closest(".tile"));
  iris?.classList.toggle("is-on", on);
  document.body.classList.toggle("is-iris", on);
});

bindInternalLinks(go);
window.addEventListener("popstate", () => show(parsePath(window.location.pathname)));
show(parsePath(window.location.pathname));

const loader = document.getElementById("loader");
const count = document.getElementById("loader-count");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) document.documentElement.classList.add("is-reduced");

let p = 0;
const tickLoader = (done: boolean) => {
  p = Math.min(24, p + (done ? 8 : 1));
  if (count) count.textContent = String(p).padStart(2, "0");
  if (p < 24) requestAnimationFrame(() => tickLoader(done));
  else loader?.classList.add("is-done");
};

async function boot() {
  const { canWebGL } = await import("./webgl/engine");
  const boot3d = canWebGL() && !reduced;
  const stage = document.getElementById("stage");
  if (!boot3d || !stage) {
    document.documentElement.classList.add("is-fallback");
    tickLoader(true);
    return;
  }
  const isLab = window.location.pathname.replace(/\/+$/, "") === "/lab";
  if (isLab) {
    document.body.classList.add("is-lab");
    const { mountLab } = await import("./r3f/mount");
    mountLab(stage);
    tickLoader(true);
    return;
  }
  const [{ mountStudio }, { bindScroll }] = await Promise.all([
    import("./r3f/mount"),
    import("./webgl/scroll-map"),
  ]);
  engine = mountStudio(stage);
  lenis = new Lenis({ autoRaf: false });
  lenis.on("scroll", ScrollTrigger.update);
  homeTriggers = bindScroll(engine);
  const loop = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  tickLoader(true);
}

void homeTriggers;
void boot();
