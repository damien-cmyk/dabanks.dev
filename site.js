// The page is its own demo: what the visitor captures is cut out of the page, described, and banked.
// Everything happens in the tab, nothing is sent anywhere.
import { SCREENS, screen, cutout } from "./screens.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, html = "") => Object.assign(document.createElement(tag), { className: cls, innerHTML: html });
const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const small = matchMedia("(max-width: 720px), (hover: none)");
const desk = $("desk"), notch = $("notch");

// ---------- the bank ----------
/** @type {{title:string, tags:string[], text:string, draw:() => HTMLElement, mine?:boolean}[]} */
const bank = Object.entries(SCREENS).map(([id, s]) => ({
  title: s.title, tags: s.tags,
  text: [s.title, s.product, s.kind, s.words, ...s.tags, ...Object.entries(s.parts).flat(2)].join(" ").toLowerCase(),
  draw: () => screen(id),
}));
let mine = 0;

/** As large as its frame allows, whatever its shape. */
const fitIn = (shot, height) => {
  const [w, h] = shot.style.aspectRatio.split("/").map(Number);
  shot.style.width = `min(100%, ${Math.round((height * w) / h)}px)`;
};
const thumb = (ref) => { const t = el("div", "thumb"); t.append(ref.draw()); return t; };

function bankIt(ref) {
  bank.unshift(ref);
  if (ref.mine) {
    mine += 1;
    $("tally").textContent = mine === 1 ? "You banked 1 screen while you were here." : `You banked ${mine} screens while you were here.`;
  }
  paintGrid(ref);
  paintRecent();
}
const paintRecent = () => $("recent").replaceChildren(...bank.slice(0, 4).map(thumb));

// ---------- find ----------
function paintGrid(fresh) {
  const words = $("q").value.toLowerCase().split(/\s+/).filter(Boolean);
  const found = bank.filter((r) => words.every((w) => r.text.includes(w)));
  const draw = () => {
    $("grid").replaceChildren(...(found.length ? found.map((r) => {
      const f = el("figure", r === fresh ? "card new" : "card");
      const frame = el("div", "card-in"), shot = r.draw();
      fitIn(shot, 208);
      frame.append(shot);
      f.append(frame, el("figcaption", "", `${r.title}<span>${r.tags.slice(0, 3).join(", ")}</span>`));
      return f;
    }) : [el("p", "none", "Nothing like that in the bank yet.")]));
    $("count").textContent = words.length ? `${found.length} of ${bank.length}` : `${bank.length} refs`;
  };
  if (!fresh && !still && document.startViewTransition && words.length) document.startViewTransition(draw); else draw();
}
const search = (word) => {
  $("q").value = word;
  markTries();
  paintGrid();
};
const markTries = () => { for (const b of $("tries").children) b.classList.toggle("on", b.textContent === $("q").value); };
$("tries").append(...["table", "warm", "map", "segmented control", "keyboard"].map((word) => {
  const b = Object.assign(el("button", ""), { type: "button", textContent: word });
  b.addEventListener("click", () => search($("q").value === word ? "" : word));
  return b;
}));
$("q").addEventListener("input", () => { markTries(); paintGrid(); });

// ---------- notch ----------
let timer;
const phase = (p, status) => {
  notch.dataset.phase = p;
  $("ears").setAttribute("aria-expanded", p === "menu");
  $("status").textContent = status ?? (p === "idle" ? `${bank.length}` : `${bank.length} refs`);
};
const working = () => ["busy", "saved"].includes(notch.dataset.phase);
const inside = () => notch.matches(":hover") || notch.contains(document.activeElement);
const settle = () => working() || phase(inside() ? "menu" : "idle");
const later = () => { clearTimeout(timer); timer = setTimeout(settle, 220); };
notch.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && settle());
notch.addEventListener("pointerleave", later);
notch.addEventListener("focusin", (e) => e.target.matches(":focus-visible") && settle());
notch.addEventListener("focusout", later);
$("ears").addEventListener("click", () => working() || phase(notch.dataset.phase === "menu" && !notch.matches(":hover") ? "idle" : "menu"));
addEventListener("keydown", (e) => e.key === "Escape" && !working() && (document.activeElement.blur?.(), phase("idle")));
document.addEventListener("pointerdown", (e) => !notch.contains(e.target) && !working() && phase("idle"));

/** Runs a ref through the notch: reading, saved, then back to rest. */
async function take(ref) {
  clearTimeout(timer);
  const show = (title, sub) => {
    const text = el("div", "");
    text.append(Object.assign(el("b", ""), { textContent: title }), Object.assign(el("span", ""), { textContent: sub }));
    $("result").replaceChildren(thumb(ref), text);
  };
  show("Reading the screen", "Naming its patterns");
  phase("busy", "Analyzing");
  await wait(1250);
  bankIt(ref);
  show(ref.title, ref.tags.join(", "));
  phase("saved", "Saved");
  await wait(2000);
  if (notch.dataset.phase === "saved") { notch.dataset.phase = "idle"; settle(); }
}

notch.querySelector(".tiles").addEventListener("click", (e) => {
  const what = e.target.closest("button")?.dataset.do;
  if (!what || working()) return;
  document.activeElement.blur();
  if (what === "capture") { scrollTo({ top: 0, behavior: still ? "auto" : "smooth" }); return void setTimeout(demo, scrollY > 80 ? 700 : 100); }
  const s = SCREENS[what];
  const verb = { player: "Recording", stay: "Tab", calendar: "Link" }[what];
  take({ title: `${s.title}, ${verb.toLowerCase()}`, tags: s.tags, text: `${verb} ${s.title} ${s.words} ${s.tags.join(" ")}`.toLowerCase(), draw: () => screen(what), mine: true });
});

// ---------- capture ----------
/** Says what a rectangle of the desk covers: the part it overlaps most, else the headline, else nothing known. */
function describe(rect) {
  const d = desk.getBoundingClientRect();
  const area = (node) => {
    const b = node.getBoundingClientRect();
    const w = Math.min(b.right, d.left + rect.x + rect.w) - Math.max(b.left, d.left + rect.x);
    const h = Math.min(b.bottom, d.top + rect.y + rect.h) - Math.max(b.top, d.top + rect.y);
    return w > 0 && h > 0 ? w * h : 0;
  };
  const top = (nodes, f = area) => [...nodes].map((n) => [f(n), n]).sort((a, b) => b[0] - a[0])[0] ?? [0];
  const [sArea, s] = top(desk.querySelectorAll(":scope > .s"));
  const [hArea] = top(desk.querySelectorAll("h1, .hero p"));
  if (!sArea && !hArea) return { title: "Empty space", tags: ["negative space", "layout"], text: "empty space whitespace negative layout" };
  if (hArea > sArea) return { title: "Dabanks headline", tags: ["typography", "hero", "headline"], text: "dabanks headline typography hero type landing page" };
  const meta = SCREENS[s.dataset.screen];
  const box = s.getBoundingClientRect();
  const whole = sArea > box.width * box.height * 0.7;
  const [, part] = top(s.querySelectorAll("[data-part]"), (n) => { const b = n.getBoundingClientRect(); const a = area(n); return a / (b.width * b.height) > 0.25 ? a : a / 8; });
  const name = part?.dataset.part;
  if (whole || !name) return { title: meta.title, tags: meta.tags, text: `${meta.title} ${meta.words} ${meta.tags.join(" ")}`.toLowerCase() };
  const [pattern, components] = meta.parts[name];
  return { title: `${meta.title}, ${name}`, tags: components.split(", "), text: `${meta.title} ${name} ${pattern} ${components} ${meta.words} ${meta.tags.join(" ")}`.toLowerCase() };
}

async function capture(rect, byHand, id) {
  const info = describe(rect);
  const master = id ? null : cutout(desk, rect);
  const draw = () => (id ? screen(id) : cutout.copy(master));
  const d = desk.getBoundingClientRect();
  const fly = draw();
  fly.classList.add("fly");
  Object.assign(fly.style, { left: `${d.left + rect.x}px`, top: `${d.top + rect.y}px`, width: `${rect.w}px` });
  document.body.append(fly);
  if (!still) {
    phase("busy", "Analyzing");
    const k = Math.min(104 / rect.w, 64 / rect.h), n = notch.getBoundingClientRect();
    const to = [innerWidth / 2 - Math.min(600, innerWidth - 44) / 2 + 20 - (d.left + rect.x), 46 - n.top - (d.top + rect.y)];
    await fly.animate([
      { transform: "none", offset: 0 },
      { transform: "scale(1.03)", offset: 0.18, easing: "cubic-bezier(.5,0,.2,1)" },
      { transform: `translate(${to[0]}px, ${to[1]}px) scale(${k})`, opacity: 1, offset: 0.94 },
      { transform: `translate(${to[0]}px, ${to[1]}px) scale(${k})`, opacity: 0 },
    ], { duration: 820 }).finished;
  }
  fly.remove();
  await take({ ...info, draw, mine: byHand });
}

const sel = $("sel");
const paintSel = (x, y, w, h) => {
  sel.hidden = false;
  sel.classList.remove("flash");
  Object.assign(sel.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
  $("size").textContent = `${Math.round(w)} × ${Math.round(h)}`;
};
const shoot = async (rect, byHand = true, id) => {
  sel.classList.add("flash");
  await wait(still ? 0 : 110);
  sel.hidden = true;
  await capture(rect, byHand, id);
};

let drag = null, ran = false;
const here = (e) => { const d = desk.getBoundingClientRect(); return [Math.max(0, Math.min(d.width, e.clientX - d.left)), Math.max(0, Math.min(d.height, e.clientY - d.top))]; };
desk.addEventListener("pointerdown", (e) => {
  if (e.button || e.target.closest("a, button") || e.pointerType !== "mouse" || small.matches || working()) return;
  ran = true;
  stopDemo();
  drag = here(e);
  desk.setPointerCapture(e.pointerId);
  e.preventDefault();
});
const box = (e) => { const [x, y] = here(e); return { x: Math.min(x, drag[0]), y: Math.min(y, drag[1]), w: Math.abs(x - drag[0]), h: Math.abs(y - drag[1]) }; };
desk.addEventListener("pointermove", (e) => { if (drag) { const r = box(e); paintSel(r.x, r.y, r.w, r.h); } });
desk.addEventListener("pointerup", (e) => {
  if (!drag) return;
  const r = box(e);
  drag = null;
  if (r.w < 24 || r.h < 24) return void (sel.hidden = true);
  shoot(r);
});
desk.addEventListener("pointercancel", () => { drag = null; sel.hidden = true; });

/** The whole screen, for a tap or the keyboard. */
const takeScreen = (s) => {
  if (working()) return;
  ran = true;
  stopDemo();
  const d = desk.getBoundingClientRect(), b = s.getBoundingClientRect();
  const x = Math.max(0, b.left - d.left), y = Math.max(0, b.top - d.top);
  shoot({ x, y, w: Math.min(b.right - d.left, d.width) - x, h: Math.min(b.bottom - d.top, d.height) - y }, true, s.dataset.screen);
};
for (const id of ["invoices", "delivery", "player", "energy", "calendar", "palette", "inbox"]) {
  const s = screen(id);
  s.tabIndex = 0;
  s.setAttribute("role", "button");
  s.setAttribute("aria-label", `Capture ${SCREENS[id].title}`);
  s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); takeScreen(s); } });
  s.addEventListener("click", () => small.matches && takeScreen(s));
  desk.insertBefore(s, sel);
}

// ---------- the first capture plays by itself, so nobody has to read the hint ----------
let playing = 0, demos = 0;
const ghost = $("ghost");
const stopDemo = () => { playing += 1; ghost.style.opacity = 0; };
async function demo() {
  if (small.matches || still || working()) return;
  const run = ++playing, gone = () => run !== playing;
  const d = desk.getBoundingClientRect();
  const part = (screenId, name) => desk.querySelector(`[data-screen="${screenId}"] [data-part="${name}"]`).getBoundingClientRect();
  const p = demos++ % 2 ? part("energy", "area chart") : part("palette", "results");
  const a = [p.left - d.left - 12, p.top - d.top - 12], b = [Math.min(p.right - d.left + 12, d.width - 8), Math.min(p.bottom - d.top + 12, d.height - 8)];
  const at = (x, y) => { ghost.style.left = `${x}px`; ghost.style.top = `${y}px`; };
  const move = (from, to, ms, each) => new Promise((ok) => {
    const t0 = performance.now();
    const step = (t) => {
      if (gone()) return ok();
      const u = Math.min(1, (t - t0) / ms), k = u < 0.5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2;
      const x = from[0] + (to[0] - from[0]) * k, y = from[1] + (to[1] - from[1]) * k;
      at(x, y);
      each?.(x, y);
      u < 1 ? requestAnimationFrame(step) : ok();
    };
    requestAnimationFrame(step);
  });
  at(d.width * 0.56, d.height * 0.66);
  ghost.style.opacity = 1;
  await move([d.width * 0.56, d.height * 0.66], a, 900);
  if (gone()) return;
  await wait(160);
  await move(a, b, 800, (x, y) => paintSel(a[0], a[1], x - a[0], y - a[1]));
  if (gone()) return void (sel.hidden = !drag);
  ghost.style.opacity = 0;
  shoot({ x: a[0], y: a[1], w: b[0] - a[0], h: b[1] - a[1] }, false);
}

$("try").addEventListener("click", () => {
  if (!small.matches && !still) return void demo();
  takeScreen(desk.querySelector('[data-screen="invoices"]'));
});

// ---------- read ----------
{
  const ids = ["invoices", "player", "calendar", "delivery", "stay"], stage = $("stage"), scene = $("scene");
  // Two soft lights and a ground, taken from the capture itself.
  const LIGHT = { invoices: ["#7fb08d", "#e9c9a6", "#2f6b48"], player: ["#f2a65a", "#8c2f1b", "#c2511f"], calendar: ["#f3c969", "#8fcfc0", "#f2a48f"], delivery: ["#b8dcec", "#ffb08a", "#8fc4a4"], stay: ["#f6cfa8", "#e48a63", "#4d7f90"] };
  let cycle, at = -1, now = ids[0], held = false;
  const focus = (name) => {
    const meta = SCREENS[now];
    stage.classList.toggle("focus", !!name);
    for (const p of stage.querySelectorAll("[data-part]")) p.classList.toggle("on", p.dataset.part === name);
    for (const b of $("patterns").querySelectorAll("button")) b.classList.toggle("on", !name || b.dataset.name === name);
    $("components").textContent = name ? meta.parts[name][1] : meta.tags.join(", ");
  };
  const show = (id) => {
    now = id;
    at = -1;
    const meta = SCREENS[id], s = screen(id);
    fitIn(s, 448);
    stage.replaceChildren(s);
    if (!still) s.animate([{ opacity: 0, transform: "scale(0.97)" }, {}], { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" });
    ["--a", "--b", "--c"].forEach((v, i) => scene.style.setProperty(v, LIGHT[id][i]));
    $("read-title").textContent = `${meta.product}, ${meta.title}`;
    $("read-use").textContent = meta.use;
    $("swatches").replaceChildren(...meta.palette.map((c) => Object.assign(el("i", ""), { style: `background:${c}`, title: c })));
    $("patterns").replaceChildren(...Object.entries(meta.parts).map(([name, [pattern]]) => {
      const li = el("li", ""), b = Object.assign(el("button", ""), { type: "button", textContent: pattern });
      b.dataset.name = name;
      for (const on of ["pointerenter", "focus", "click"]) b.addEventListener(on, () => { held = true; focus(name); });
      li.append(b);
      return li;
    }));
    for (const b of $("tabs").children) { b.classList.toggle("on", b.dataset.id === id); b.setAttribute("aria-pressed", b.dataset.id === id); }
    focus(null);
  };
  $("tabs").append(...ids.map((id) => {
    const b = Object.assign(el("button", ""), { type: "button", textContent: SCREENS[id].title });
    b.dataset.id = id;
    b.addEventListener("click", () => { held = true; show(id); });
    return b;
  }));
  show(now);
  const tick = () => {
    if (held) return;
    const names = Object.keys(SCREENS[now].parts);
    at += 1;
    if (at < names.length) focus(names[at]); else show(ids[(ids.indexOf(now) + 1) % ids.length]);
  };
  new IntersectionObserver(([e]) => {
    clearInterval(cycle);
    if (e.isIntersecting && !still) cycle = setInterval(tick, 1800);
  }, { threshold: 0.5 }).observe(scene);
}

// ---------- compare ----------
{
  const cmp = $("cmp"), split = $("split"), seg = [...document.querySelectorAll(".seg button")];
  let anim = 0;
  const set = (x) => {
    cmp.style.setProperty("--x", x);
    split.value = x;
    for (const b of seg) { const on = +b.dataset.x === 100 ? x >= 50 : x < 50; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); }
  };
  const glide = (to, ms = 900) => {
    const id = ++anim, from = +split.value, t0 = performance.now();
    if (still) return set(to);
    const step = (t) => {
      if (id !== anim) return;
      const u = Math.min(1, (t - t0) / ms), k = u < 0.5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2;
      set(from + (to - from) * k);
      if (u < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  split.step = "any";
  split.addEventListener("input", () => { anim += 1; set(+split.value); });
  for (const b of seg) b.addEventListener("click", () => glide(+b.dataset.x));
  set(100);
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); setTimeout(() => +split.value === 100 && glide(36, 1600), 900); } }, { threshold: 0.5 }).observe(cmp);
  $("log").append(...[["invoices", "Invoices", "Its filter chips and its bar of bulk actions"], ["energy", "Weekly energy", "The figure first, its chart beside it"], ["palette", "Command palette", "Plain rows, one highlight at a time"]].map(([id, from, what]) => {
    const li = el("li", "");
    li.append(thumb({ draw: () => screen(id) }), el("div", "", `<b>${from}</b><span>${what}</span>`));
    return li;
  }));
}

// ---------- keys ----------
{
  const SAYS = { 6: "Draw around what you like. Dabanks keeps it.", 7: "Record a motion worth keeping.", 8: "Keep the page you're on, whole.", 9: "Paste a post. Its picture, clip and words come along." };
  const pad = [...document.querySelectorAll("button.key")];
  let run = 0;
  const say = async (n) => {
    const r = ++run, text = SAYS[n], out = $("key-text");
    for (const b of pad) { b.classList.toggle("on", b.dataset.key === n); b.setAttribute("aria-pressed", b.dataset.key === n); }
    out.setAttribute("aria-label", text);
    const write = (i) => out.replaceChildren(text.slice(0, i), Object.assign(el("span", ""), { textContent: text.slice(i) }));
    if (still) return write(text.length);
    for (let i = 0; i <= text.length; i++) {
      if (r !== run) return;
      write(i);
      await wait(22);
    }
  };
  for (const b of pad) b.addEventListener("click", () => say(b.dataset.key));
  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.matches("input") || !SAYS[e.key]) return;
    const b = $("keys").getBoundingClientRect();
    if (b.top < innerHeight && b.bottom > 0) say(e.key);
  });
  $("key-text").append(Object.assign(el("span", ""), { textContent: SAYS[6] }));
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); run || say("6"); } }, { threshold: 0.5 }).observe($("keys"));
}

paintGrid();
paintRecent();
phase("idle");
document.fonts.ready.then(() => setTimeout(() => { if (!ran && scrollY < 200 && !document.hidden) demo(); }, 1100));
