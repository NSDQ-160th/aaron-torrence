export type Route =
  | { name: "home" }
  | { name: "work" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "case"; slug: string }
  | { name: "lab" };

export function parsePath(path: string): Route {
  const p = path.replace(/\/+$/, "") || "/";
  if (p === "/" || p === "") return { name: "home" };
  if (p === "/lab") return { name: "lab" };
  if (p === "/work") return { name: "work" };
  if (p === "/about") return { name: "about" };
  if (p === "/contact") return { name: "contact" };
  const m = p.match(/^\/work\/([^/]+)$/);
  if (m) return { name: "case", slug: m[1] };
  return { name: "home" };
}

export function viewId(route: Route): string {
  if (route.name === "case") return "view-case";
  return `view-${route.name}`;
}

export function bindInternalLinks(onGo: (href: string) => void) {
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement | null)?.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) return;
    if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    onGo(href);
  });
}
