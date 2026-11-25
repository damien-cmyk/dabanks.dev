// The page's demo: a sample bank of drawn screens, and the notch that adds to it. Nothing is sent anywhere.
const $ = (id) => document.getElementById(id);

const r = (x, y, w, h, q = 4, o = 0.1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${q}" fill="currentColor" opacity="${o}"/>`;
const line = (d, o = 0.8) => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
const dot = (x, y, q, o = 0.14) => `<circle cx="${x}" cy="${y}" r="${q}" fill="currentColor" opacity="${o}"/>`;
const rows = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");

/** Each screen is drawn 240 wide: [height, shapes]. */
const DRAW = {
  table: () => [200, r(20, 22, 70, 10, 5, 0.7) + r(184, 18, 36, 18, 9, 0.9) + rows(6, (i) => r(20, 56 + i * 22, 14, 10, 5, 0.18) + r(44, 56 + i * 22, [72, 54, 64, 80, 48, 60][i], 10, 5, 0.3) + r(148, 56 + i * 22, 30, 10, 5, 0.12) + r(192, 56 + i * 22, 28, 10, 5, 0.12))],
  onboarding: () => [300, dot(120, 92, 40, 0.1) + dot(120, 92, 20, 0.85) + r(56, 160, 128, 14, 7, 0.75) + r(44, 186, 152, 9, 4.5, 0.18) + r(68, 202, 104, 9, 4.5, 0.18) + r(40, 244, 160, 32, 16, 0.9)],
  chart: () => [170, r(20, 22, 48, 9, 4.5, 0.25) + r(20, 40, 88, 18, 9, 0.8) + line("M20 136C50 130 58 96 84 102S120 132 144 100s40-20 76-44") + rows(4, (i) => r(20, 84 + i * 20, 200, 1, 0, 0.12))],
  settings: () => [230, r(20, 22, 62, 12, 6, 0.75) + rows(4, (i) => r(20, 56 + i * 42, 200, 32, 10, 0.06) + r(34, 67 + i * 42, [84, 66, 96, 74][i], 9, 4.5, 0.35) + r(180, 64 + i * 42, 28, 16, 8, i % 2 ? 0.18 : 0.85))],
  empty: () => [190, r(84, 44, 72, 52, 12, 0.08) + line("M108 70h24M120 58v24", 0.6) + r(70, 118, 100, 11, 5.5, 0.6) + r(54, 138, 132, 8, 4, 0.16)],
  chat: () => [260, rows(3, (i) => (i % 2 ? r(92, 24 + i * 58, 128, 42, 16, 0.85) : r(20, 24 + i * 58, 150, 42, 16, 0.1))) + r(20, 210, 200, 32, 16, 0.07) + dot(204, 226, 10, 0.85)],
  pricing: () => [210, rows(3, (i) => r(20 + i * 68, 24, 62, 162, 12, i === 1 ? 0.9 : 0.07)) + `<g style="color:var(--paper)">${r(98, 44, 28, 9, 4.5, 0.6) + r(98, 64, 40, 16, 8, 1)}</g>` + r(30, 44, 24, 9, 4.5, 0.3) + r(30, 64, 36, 16, 8, 0.6) + r(166, 44, 24, 9, 4.5, 0.3) + r(166, 64, 36, 16, 8, 0.6)],
  calendar: () => [220, r(20, 20, 70, 12, 6, 0.75) + rows(20, (i) => r(20 + (i % 5) * 41, 48 + Math.floor(i / 5) * 40, 36, 34, 8, [3, 8, 11].includes(i) ? 0.8 : 0.07))],
  login: () => [240, r(96, 34, 48, 48, 14, 0.9) + r(64, 100, 112, 12, 6, 0.6) + r(36, 132, 168, 30, 10, 0.08) + r(36, 172, 168, 30, 10, 0.85)],
  kanban: () => [200, rows(3, (i) => r(20 + i * 68, 22, 40, 9, 4.5, 0.5) + rows([3, 2, 3][i], (j) => r(20 + i * 68, 44 + j * 46, 62, [38, 38, 38][j], 10, i === 1 && !j ? 0.85 : 0.08)))],
  palette: () => [180, r(20, 26, 200, 128, 16, 0.07) + r(38, 46, 90, 10, 5, 0.6) + r(32, 72, 176, 26, 9, 0.85) + r(44, 112, 96, 9, 4.5, 0.22) + r(44, 132, 72, 9, 4.5, 0.22)],
  player: () => [160, r(20, 20, 200, 96, 14, 0.1) + `<path d="M112 54v28l22-14z" fill="currentColor" opacity=".85"/>` + r(20, 132, 200, 6, 3, 0.12) + r(20, 132, 82, 6, 3, 0.8)],
};
const svg = (kind) => {
  const [h, body] = DRAW[kind]();
  return `<svg viewBox="0 0 240 ${h}" aria-hidden="true">${body}</svg>`;
};

const refs = [
  ["table", "Invoices with filters", "Table"], ["onboarding", "First run", "Onboarding"], ["chart", "Revenue this month", "Chart"],
  ["settings", "Notification settings", "Form"], ["empty", "No projects yet", "Empty state"], ["chat", "Support thread", "Chat"],
  ["pricing", "Three plans", "Pricing"], ["calendar", "Week planner", "Calendar"], ["login", "Sign in", "Form"],
  ["kanban", "Issues by status", "Board"], ["palette", "Command palette", "Search"],
];
const inbox = {
  screen: ["table", "Members and roles", "Table"], video: ["player", "Row to panel", "Motion"],
  tab: ["palette", "Jump to anything", "Search"], paste: ["chart", "Usage over time", "Chart"],
};

const card = ([kind, title, tag], fresh) => {
  const f = document.createElement("figure");
  f.className = fresh ? "card new" : "card";
  f.dataset.tag = tag;
  f.innerHTML = `${svg(kind)}<figcaption>${title}<span>${tag}</span></figcaption>`;
  return f;
};
$("grid").append(...refs.map((x) => card(x)));

// ---------- filters ----------
let tag = "All";
const paint = () => {
  for (const b of $("filters").children) b.setAttribute("aria-pressed", b.textContent === tag);
  for (const c of $("grid").children) c.classList.toggle("off", tag !== "All" && c.dataset.tag !== tag);
};
for (const name of ["All", "Table", "Form", "Chart", "Onboarding", "Empty state", "Search"]) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = name;
  b.onclick = () => { tag = name; paint(); };
  $("filters").append(b);
}
paint();

// ---------- notch ----------
const notch = $("notch"), tiles = notch.querySelector(".tiles");
let timer, total = refs.length;
const phase = (p, status) => {
  notch.dataset.phase = p;
  $("status").textContent = status ?? `${total} refs`;
  tiles.hidden = p === "busy" || p === "saved";
  $("result").hidden = !tiles.hidden;
};
const atTop = () => scrollY < 120;
const settle = () => phase(atTop() || notch.matches(":hover") || notch.contains(document.activeElement) ? "menu" : "idle");
const working = () => ["busy", "saved"].includes(notch.dataset.phase);

tiles.addEventListener("click", (e) => {
  const what = inbox[e.target.closest("button")?.dataset.do];
  if (!what) return;
  clearTimeout(timer);
  const show = (title, sub) => { $("result").innerHTML = `<div class="shot">${svg(what[0])}</div><div><b>${title}</b><span>${sub}</span></div>`; };
  show("Reading the screen", "Naming its patterns");
  phase("busy", "Analyzing");
  timer = setTimeout(() => {
    total += 1;
    tag = "All";
    $("grid").prepend(card(what, true));
    paint();
    show(what[1], what[2]);
    phase("saved", "Saved");
    timer = setTimeout(settle, 1800);
  }, 1300);
});
for (const type of ["pointerenter", "pointerleave", "focusin", "focusout"]) notch.addEventListener(type, () => working() || setTimeout(() => working() || settle(), type === "pointerleave" || type === "focusout" ? 180 : 0));
notch.addEventListener("click", () => notch.dataset.phase === "idle" && phase("menu"));
addEventListener("scroll", () => working() || settle(), { passive: true });
phase("idle");
setTimeout(settle, 500);
