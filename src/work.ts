export type Lane = "film" | "still" | "media" | "ventures";
export type WorkStatus = "todo" | "live";

export type Work = {
  slug: string;
  lane: Lane;
  title: string;
  role: string;
  year: string;
  plate: string;
  status: WorkStatus;
  blurb: string;
  href?: string;
};

export const lanes: { id: Lane; label: string }[] = [
  { id: "film", label: "Film" },
  { id: "still", label: "Still" },
  { id: "media", label: "Media" },
  { id: "ventures", label: "Ventures" },
];

export const works: Work[] = [
  {
    slug: "todo-film-01",
    lane: "film",
    title: "Title forthcoming",
    role: "Director / DP",
    year: "Year",
    plate: "/stills/irix-65.webp",
    status: "todo",
    blurb: "TODO — Aaron: film title, role, year.",
  },
  {
    slug: "todo-film-02",
    lane: "film",
    title: "Title forthcoming",
    role: "Role",
    year: "Year",
    plate: "/plates/study-leak.webp",
    status: "todo",
    blurb: "TODO — Aaron: second film or commercial cut.",
  },
  {
    slug: "todo-still-01",
    lane: "still",
    title: "Series forthcoming",
    role: "Photographer",
    year: "Year",
    plate: "/stills/aaron-woods.webp",
    status: "todo",
    blurb: "TODO — Aaron: photography series name and 8–12 frames you made.",
  },
  {
    slug: "todo-media-01",
    lane: "media",
    title: "Company forthcoming",
    role: "Owner",
    year: "Year",
    plate: "/plates/study-gate.webp",
    status: "todo",
    blurb: "TODO — Aaron: media company name, one-liner, public URL.",
  },
  {
    slug: "kairos-rejuvenation",
    lane: "ventures",
    title: "Kairos Rejuvenation",
    role: "Co-owner · Operator",
    year: "2023",
    plate: "/plates/study-gate.webp",
    status: "live",
    href: "https://www.kairosrejuvenation.com",
    blurb:
      "Physician-led clinic in Hagerstown, built and run with Dr. Kristina Torrence. One chapter — not the site brand.",
  },
];

export const selected = works.filter((w) => w.lane !== "ventures").slice(0, 4);
