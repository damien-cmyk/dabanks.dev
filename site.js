// The page is its own demo: what the visitor captures is cut out of the page, described, and banked.
// Everything happens in the tab, nothing is sent anywhere.
import { SHOWN, REFS, PEOPLE, FEATURED } from "./bank.js?v=ad276c34";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, html = "") => Object.assign(document.createElement(tag), { className: cls, innerHTML: html });
const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const small = matchMedia("(max-width: 720px), (hover: none)");
const desk = $("desk"), notch = $("notch");

// ---------- the bank: real refs, each with its designer ----------
const esc = (t) => t.replace(/[&<>"]/g, (ch) => `&#${ch.charCodeAt(0)};`);
const face = (handle) => (PEOPLE[handle].face ? `<img class="face" src="people/${handle}.jpg" alt="" loading="lazy">` : `<span class="face">${esc(PEOPLE[handle].name[0])}</span>`);
const byline = (id, text) => {
  const { by, url } = REFS[id];
  return `<a class="by" href="${url}" target="_blank" rel="noopener" title="See the post by @${by}">${face(by)}<b>${esc(text ?? `${PEOPLE[by].name} @${by}`)}</b></a>`;
};
const fit = new ResizeObserver((list) => { for (const { target, contentRect } of list) target.style.setProperty("--k", contentRect.width / target.dataset.w); });
/** A ref, as wide as the place it is given. */
function screen(id) {
  const r = REFS[id], s = el("div", r.dark ? "s dark" : "s", `<img src="refs/${id}.jpg" alt="${esc(r.title)}, by ${esc(PEOPLE[r.by].name)}" loading="lazy" decoding="async" draggable="false">`);
  s.style.aspectRatio = `${r.w} / ${r.h}`;
  return s;
}
/** The recording of a ref, laid over its picture once it plays. */
const moves = (id) => REFS[id].clip && !still && !navigator.connection?.saveData;
function play(s, id) {
  let v = s.querySelector("video");
  if (!v) {
    v = Object.assign(el("video", ""), { src: `clips/${id}.mp4`, muted: true, loop: true, playsInline: true, tabIndex: -1 });
    v.setAttribute("aria-hidden", "true");
    v.addEventListener("playing", () => v.classList.add("on"), { once: true });
    s.append(v);
  }
  v.play().catch(() => {});
}
const onScreen = new IntersectionObserver((list) => {
  for (const { target, isIntersecting } of list) if (isIntersecting) play(target, target.dataset.clip); else target.querySelector("video")?.pause();
}, { threshold: 0.2 });
const live = (s, id) => { if (moves(id)) { s.dataset.clip = id; onScreen.observe(s); } };
/** A piece of the page, cut out where the visitor drew: a copy of what was under it, shifted and clipped. */
function cutout(rect) {
  const d = desk.getBoundingClientRect(), s = el("div", "s cut"), i = el("div", "i"), copy = desk.cloneNode(false);
  s.dataset.w = rect.w;
  s.style.aspectRatio = `${rect.w} / ${rect.h}`;
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", "Your capture");
  i.style.cssText = `width:${rect.w}px;height:${rect.h}px`;
  copy.removeAttribute("id");
  copy.style.cssText = `position:absolute;margin:0;width:${desk.offsetWidth}px;height:${desk.offsetHeight}px;left:${-rect.x}px;top:${-rect.y}px;pointer-events:none`;
  for (const node of desk.children) {
    const b = node.getBoundingClientRect();
    if (node.dataset.ui !== undefined || b.right < d.left + rect.x || b.left > d.left + rect.x + rect.w || b.bottom < d.top + rect.y || b.top > d.top + rect.y + rect.h) continue;
    const c = node.cloneNode(true), v = node.querySelector("video.on");
    c.querySelector("video")?.remove();
    if (v?.videoWidth) {
      const k = Math.min(1, (v.clientWidth * 2) / v.videoWidth), frame = Object.assign(document.createElement("canvas"), { width: v.videoWidth * k, height: v.videoHeight * k });
      frame.getContext("2d").drawImage(v, 0, 0, frame.width, frame.height);
      c.querySelector("img").src = frame.toDataURL("image/jpeg", 0.85);
    }
    for (const n of [c, ...c.querySelectorAll("*")]) { n.removeAttribute("id"); n.removeAttribute("tabindex"); if (n.tagName === "A" || n.tagName === "BUTTON") n.tabIndex = -1; }
    copy.append(c);
  }
  i.append(copy);
  s.append(i);
  return s;
}
const again = (cut) => { const c = cut.cloneNode(true); fit.observe(c); return c; };

/** @type {{title:string, tags:string[], text:string, id?:string, draw:() => HTMLElement, mine?:boolean}[]} */
const words = (id) => { const r = REFS[id]; return [r.title, r.by, PEOPLE[r.by].name, r.use, ...r.tags, ...r.patterns].join(" ").toLowerCase(); };
const bank = SHOWN.map((id) => ({ id, title: REFS[id].title, tags: REFS[id].tags, text: words(id), draw: () => screen(id) }));
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
let whole = false, found = [];
function paintGrid(fresh) {
  const typed = $("q").value.toLowerCase().split(/\s+/).filter(Boolean);
  found = bank.filter((r) => typed.every((w) => r.text.includes(w)));
  const draw = () => {
    const some = typed.length || whole ? found : found.slice(0, 12);
    $("grid").replaceChildren(...(found.length ? some.map((r) => {
      const f = el("figure", r === fresh ? "card new" : "card");
      const frame = Object.assign(el("button", "card-in"), { type: "button", ariaLabel: `Open ${r.title}` }), shot = r.draw();
      frame.addEventListener("click", () => openRef(r));
      fitIn(shot, 204);
      frame.append(shot);
      if (r.id && moves(r.id)) {
        f.addEventListener("pointerenter", () => play(shot, r.id));
        f.addEventListener("pointerleave", () => { shot.querySelector("video").pause(); shot.querySelector("video").remove(); });
      }
      f.append(frame, el("figcaption", "", `<b>${esc(r.title)}</b>${r.id ? byline(r.id) : `<span class="by">${esc(r.tags.slice(0, 3).join(", "))}</span>`}`));
      return f;
    }) : [el("p", "none", "Nothing like that in the bank yet.")]));
    if (some.length < found.length) {
      const more = Object.assign(el("button", "pill more"), { type: "button", textContent: `Show all ${found.length}` });
      more.addEventListener("click", () => { whole = true; paintGrid(); });
      $("grid").append(more);
    }
    $("count").textContent = typed.length ? `${found.length} of ${bank.length}` : `${bank.length} refs`;
  };
  if (!fresh && !still && document.startViewTransition && typed.length) document.startViewTransition(draw); else draw();
}
const search = (word) => {
  $("q").value = word;
  markTries();
  paintGrid();
};
const markTries = () => { for (const b of $("tries").children) b.classList.toggle("on", b.textContent === $("q").value); };
$("tries").append(...["table", "command palette", "mobile app", "badge", "dark", "file upload"].map((word) => {
  const b = Object.assign(el("button", ""), { type: "button", textContent: word });
  b.addEventListener("click", () => search($("q").value === word ? "" : word));
  return b;
}));
$("q").addEventListener("input", () => { markTries(); paintGrid(); });

// ---------- a ref, opened: the whole picture and what the bank knows of it ----------
let opened = 0;
function openRef(r) {
  opened = Math.max(0, found.indexOf(r));
  fillRef();
  if (!$("ref").open) $("ref").showModal();
  $("ref-close").focus();
}
const KINDS = { screen: "Screen", ui_lib: "UI library", tool: "Design tool", skill: "Skill" };
const show = (node, on) => { node.closest("div, section").hidden = !on; };
function fillRef() {
  const r = found[opened], R = r.id && REFS[r.id], shot = r.draw(), [w, h] = shot.style.aspectRatio.split("/").map(Number);
  shot.style.setProperty("--r", w / h);
  $("ref-media").replaceChildren(shot);
  if (r.id && moves(r.id)) play(shot, r.id);
  $("ref-title").textContent = r.title;
  $("ref-kind").textContent = $("ref-type").textContent = KINDS[R?.kind] ?? "Screen";
  for (const id of ["ref-link", "ref-url", "ref-open"]) { $(id).hidden = !R; if (R) $(id).href = R.url; }
  $("ref-link").innerHTML = R ? `x.com <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>` : "";
  $("ref-url").textContent = R?.url ?? "";
  show($("ref-url"), !!R);
  if (R) {
    $("ref-by").href = `https://x.com/${R.by}`;
    $("ref-by").innerHTML = `${face(R.by)}<span>${esc(PEOPLE[R.by].name)}</span>`;
  }
  show($("ref-by"), !!R);
  $("ref-product").textContent = R?.product ?? "";
  show($("ref-product"), !!R?.product);
  $("ref-summary").textContent = R?.summary ?? "";
  show($("ref-summary"), !!R?.summary);
  $("ref-use").textContent = R?.use ?? "";
  show($("ref-use"), !!R?.use);
  // where the bank knows where each pattern sits, pointing at it shows the spot, as in the window above
  const parts = R?.parts ?? [], lens = parts.length ? el("i", "lens") : null;
  if (lens) shot.append(lens);
  const aim = (n) => {
    const part = parts[n];
    lens.classList.toggle("on", !!part);
    if (part) ["left", "top", "width", "height"].forEach((k, i) => { lens.style[k] = `${part[i + 2]}%`; });
    [...$("ref-patterns").children].forEach((b, i) => b.classList.toggle("on", i === n));
  };
  $("ref-patterns").replaceChildren(...(parts.length ? parts.map(([p]) => p) : R?.patterns ?? []).map((p, n) => {
    const b = Object.assign(el(parts.length ? "button" : "span", "tag"), { textContent: p[0].toUpperCase() + p.slice(1) });
    if (parts.length) {
      b.type = "button";
      for (const on of ["pointerenter", "focus", "click"]) b.addEventListener(on, () => aim(n));
      for (const off of ["pointerleave", "blur"]) b.addEventListener(off, () => aim(-1));
    }
    return b;
  }));
  show($("ref-patterns"), $("ref-patterns").children.length > 0);
  $("ref-tags").replaceChildren(...r.tags.filter((t) => !["ui", "ux", "minimal", "saas", "web app"].includes(t)).map((t) => Object.assign(el("span", "tag"), { textContent: t })));
  show($("ref-tags"), $("ref-tags").children.length > 0);
  $("ref-swatches").replaceChildren(...(R?.palette ?? []).map((c) => Object.assign(el("i", ""), { style: `background:${c}`, title: c })));
  show($("ref-swatches"), !!R?.palette?.length);
  $("ref").querySelector(".d-body").scrollTop = 0;
}
const step = (by) => { opened = (opened + by + found.length) % found.length; fillRef(); };
$("ref-prev").addEventListener("click", () => step(-1));
$("ref-next").addEventListener("click", () => step(1));
$("ref-close").addEventListener("click", () => $("ref").close());
$("ref").addEventListener("click", (e) => { if (e.target === $("ref")) $("ref").close(); });
$("ref").addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea")) return;
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
$("ref").addEventListener("close", () => $("ref-media").querySelector("video")?.pause());

// ---------- notch ----------
let timer;
const phase = (p, status) => {
  notch.dataset.phase = p;
  $("ears").setAttribute("aria-expanded", p === "menu");
  $("status").textContent = status ?? (p === "idle" ? `${bank.length}` : `${bank.length} refs`);
};
let flying = false;
const working = () => flying || ["busy", "saved"].includes(notch.dataset.phase);
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

/** Puts a ref in the notch, whole: its picture and what is known of it so far. */
function present(ref) {
  const t = thumb(ref), text = el("div", "", "<b></b><span></span>");
  fitIn(t.firstChild, 64);
  for (const i of t.querySelectorAll("img")) { i.loading = "eager"; i.decoding = "sync"; }
  $("result").replaceChildren(t, text);
  return t;
}
const tell = (title, sub) => { const [b, span] = $("result").lastChild.children; b.textContent = title; span.textContent = sub; };
/** Runs a ref through the notch: reading, saved, then back to rest. */
async function take(ref, landed) {
  clearTimeout(timer);
  if (!landed) present(ref);
  tell("Reading the screen", "Naming its patterns");
  phase("busy", "Analyzing");
  await wait(1250);
  bankIt(ref);
  tell(ref.title, [ref.id ? `by ${PEOPLE[REFS[ref.id].by].name}` : "", ...ref.tags.slice(0, 3)].filter(Boolean).join(", "));
  phase("saved", "Saved");
  await wait(2000);
  if (notch.dataset.phase === "saved") { notch.dataset.phase = "idle"; settle(); }
}

notch.querySelector(".tiles").addEventListener("click", (e) => {
  const what = e.target.closest("button")?.dataset.do;
  if (!what || working()) return;
  document.activeElement.blur();
  if (what === "capture") { scrollTo({ top: 0, behavior: still ? "auto" : "smooth" }); return void setTimeout(demo, scrollY > 80 ? 700 : 100); }
  take({ ...bank.find((r) => r.id === what && !r.mine), mine: true });
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
  const [sArea, s] = top(desk.querySelectorAll(".ref > .s"));
  const [hArea] = top(desk.querySelectorAll("h1, .hero p"));
  if (!sArea && !hArea) return { title: "Empty space", tags: ["negative space", "layout"], text: "empty space whitespace negative layout" };
  if (hArea > sArea) return { title: "Dabanks headline", tags: ["typography", "hero", "headline"], text: "dabanks headline typography hero type landing page" };
  const id = s.parentElement.dataset.ref, r = REFS[id], box = s.getBoundingClientRect();
  // what the rectangle holds among the pieces that were read, unless it holds nearly all of the screen
  const cover = (r.parts ?? []).map(([name, tags, l, t, w, h]) => {
    const p = { left: box.left + (l / 100) * box.width, top: box.top + (t / 100) * box.height, width: (w / 100) * box.width, height: (h / 100) * box.height };
    const a = area({ getBoundingClientRect: () => ({ ...p, right: p.left + p.width, bottom: p.top + p.height }) });
    return [a / (p.width * p.height) > 0.6 ? a : 0, name, tags];
  }).sort((a, b) => b[0] - a[0])[0];
  const part = cover?.[0] && sArea < box.width * box.height * 0.6 ? cover : null;
  return { id, title: part ? part[1] : r.title, tags: part ? part[2].split(", ") : r.tags.slice(0, 4), text: `${part ? part[1] : ""} ${words(id)}`.toLowerCase() };
}

async function capture(rect, byHand, id) {
  const info = describe(rect);
  const master = id ? null : cutout(rect);
  const ref = { ...info, draw: () => (id ? screen(id) : again(master)), mine: byHand };
  if (still) return take(ref);
  flying = true;
  try {
    await fly(ref, rect);
  } finally {
    flying = false;
  }
  await take(ref, true);
}

const ease = (u) => (u < 0.5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2);
/** The capture lifts off, bends toward the notch, and lands exactly where its thumbnail is. */
async function fly(ref, rect) {
  clearTimeout(timer);
  const d = desk.getBoundingClientRect(), shot = ref.draw(), slot = present(ref);
  tell("Reading the screen", "Naming its patterns");
  shot.classList.add("fly");
  shot.style.setProperty("--k", 1);
  Object.assign(shot.style, { left: `${d.left + rect.x}px`, top: `${d.top + rect.y}px`, width: `${rect.w}px` });
  for (const i of shot.querySelectorAll("img")) { i.loading = "eager"; i.decoding = "sync"; }
  await Promise.all([...shot.querySelectorAll("img"), ...slot.querySelectorAll("img")].map((i) => i.decode().catch(() => {})));
  slot.style.visibility = "hidden";
  document.body.append(shot);

  // where the thumbnail will be once the notch is open: the panel never moves, only its frame grows
  const panel = $("result").getBoundingClientRect(), wide = Math.min(600, innerWidth - 44), n = notch.getBoundingClientRect();
  const left = innerWidth / 2 - wide / 2 + (panel.left - n.left) + slot.offsetLeft, top = panel.top + slot.offsetTop;
  const w = Math.min(slot.offsetWidth, (64 * rect.w) / rect.h), k = w / rect.w, h = rect.h * k;
  const dx = left + slot.offsetWidth / 2 - (d.left + rect.x + rect.w / 2), dy = top + slot.offsetHeight / 2 - (d.top + rect.y + rect.h / 2);
  const tilt = Math.max(-7, Math.min(7, dx / 70)), LIFT = 0.17, N = 48;
  const frames = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N, l = Math.min(1, t / LIFT), u = Math.max(0, (t - LIFT) / (1 - LIFT));
    const x = ease(Math.min(1, u * 1.12)), y = ease(Math.max(0, u * 1.08 - 0.08)), s = ease(u);
    const size = (1 + 0.035 * Math.sin((l * Math.PI) / 2) * (1 - s)) * (1 + (k - 1) * s);
    return { transform: `translate(${dx * x}px, ${dy * y - 8 * Math.sin((l * Math.PI) / 2) * (1 - s)}px) rotate(${tilt * Math.sin(Math.PI * u) ** 2}deg) scale(${size})`, borderRadius: `${14 + (Math.min(8, h / 4) / k - 14) * s}px` };
  });
  setTimeout(() => phase("busy", "Analyzing"), 430); // the notch opens in time to catch it
  await shot.animate(frames, { duration: 1050, fill: "forwards" }).finished;
  slot.style.visibility = "";
  slot.firstChild.style.borderRadius = `${Math.min(8, h / 4)}px`;
  shot.remove();
  notch.animate([{ scale: 1 }, { scale: "1.018 1.05" }, { scale: 1 }], { duration: 380, easing: "cubic-bezier(.3,.7,.3,1)" });
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
  shoot({ x, y, w: Math.min(b.right - d.left, d.width) - x, h: Math.min(b.bottom - d.top, d.height) - y }, true, s.parentElement.dataset.ref);
};
for (const id of SHOWN.slice(0, 9)) {
  const f = el("div", "ref"), s = screen(id);
  f.dataset.ref = id;
  s.querySelector("img").loading = "eager";
  live(s, id);
  s.tabIndex = 0;
  s.setAttribute("role", "button");
  s.setAttribute("aria-label", `Capture ${REFS[id].title}, by ${PEOPLE[REFS[id].by].name}`);
  s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); takeScreen(s); } });
  s.addEventListener("click", () => small.matches && takeScreen(s));
  f.append(s);
  f.insertAdjacentHTML("beforeend", byline(id, PEOPLE[REFS[id].by].name === REFS[id].by ? `@${REFS[id].by}` : PEOPLE[REFS[id].by].name));
  desk.insertBefore(f, sel);
}

// ---------- the first capture plays by itself, so nobody has to read the hint ----------
let playing = 0, demos = 0;
const ghost = $("ghost");
const stopDemo = () => { playing += 1; ghost.style.opacity = 0; };
async function demo() {
  if (small.matches || still || working()) return;
  const run = ++playing, gone = () => run !== playing;
  const d = desk.getBoundingClientRect();
  const on = desk.querySelector(`[data-ref="${demos++ % 2 ? "2ef4ffd8" : "0ab5ac08"}"] .s`).getBoundingClientRect();
  const a = [on.left - d.left - 12, on.top - d.top - 12], b = [on.right - d.left + 12, on.bottom - d.top + 34];
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
  if (desk.getBoundingClientRect().bottom < innerHeight * 0.5) return void (sel.hidden = true);
  shoot({ x: a[0], y: a[1], w: b[0] - a[0], h: b[1] - a[1] }, false);
}

$("try").addEventListener("click", () => {
  if (!small.matches && !still) return void demo();
  takeScreen(desk.querySelector('[data-ref="5c3268de"] .s'));
});

// ---------- read ----------
{
  const ids = ["2ef4ffd8", "d8161c08", "0ab5ac08", "57795fa1", "fe6be0ce"], stage = $("stage"), scene = $("scene");
  // Two soft lights and a ground, taken from the capture itself.
  const LIGHT = { "2ef4ffd8": ["#bfe3c4", "#f6c7bd", "#7fae8a"], d8161c08: ["#fbbf6a", "#e2552b", "#f0903f"], "0ab5ac08": ["#4a4d52", "#2c2e31", "#17181a"], "57795fa1": ["#e9e4d8", "#8fd0b6", "#bdb9ae"], fe6be0ce: ["#b9dbf5", "#f7c79a", "#7fb0d8"] };
  const LABEL = { "2ef4ffd8": "Invoices", d8161c08: "Warehouse", "0ab5ac08": "Activity", "57795fa1": "Repositories", fe6be0ce: "Agents" };
  let cycle, at = -1, now = ids[0], held = false, lens;
  const focus = (n) => {
    const r = REFS[now], part = r.parts[n];
    lens.classList.toggle("on", !!part);
    if (part) ["left", "top", "width", "height"].forEach((k, i) => { lens.style[k] = `${part[i + 2]}%`; });
    [...$("patterns").children].forEach((li, i) => li.firstChild.classList.toggle("on", !part || i === n));
    $("components").textContent = part ? part[1] : r.tags.filter((t) => !["ui", "ux", "minimal", "saas"].includes(t)).slice(0, 5).join(", ");
  };
  const show = (id) => {
    now = id;
    at = -1;
    const r = REFS[id], s = screen(id);
    fitIn(s, 460);
    lens = el("i", "lens");
    s.append(lens);
    stage.replaceChildren(s);
    if (!still) s.animate([{ opacity: 0, transform: "scale(0.97)" }, {}], { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" });
    ["--a", "--b", "--c"].forEach((v, i) => scene.style.setProperty(v, LIGHT[id][i]));
    $("read-title").textContent = r.title;
    $("read-by").innerHTML = byline(id);
    $("read-use").textContent = r.use;
    $("swatches").replaceChildren(...r.palette.map((c) => Object.assign(el("i", ""), { style: `background:${c}`, title: c })));
    $("patterns").replaceChildren(...r.parts.map(([pattern], n) => {
      const li = el("li", ""), b = Object.assign(el("button", ""), { type: "button", textContent: pattern });
      for (const on of ["pointerenter", "focus", "click"]) b.addEventListener(on, () => { held = true; focus(n); });
      li.append(b);
      return li;
    }));
    for (const b of $("tabs").children) { b.classList.toggle("on", b.dataset.id === id); b.setAttribute("aria-pressed", b.dataset.id === id); }
    focus(-1);
  };
  $("tabs").append(...ids.map((id) => {
    const b = Object.assign(el("button", ""), { type: "button", textContent: LABEL[id] });
    b.dataset.id = id;
    b.addEventListener("click", () => { held = true; show(id); });
    return b;
  }));
  show(now);
  const tick = () => {
    if (held) return;
    at += 1;
    if (at < REFS[now].parts.length) focus(at); else show(ids[(ids.indexOf(now) + 1) % ids.length]);
  };
  new IntersectionObserver(([e]) => {
    clearInterval(cycle);
    if (e.isIntersecting && !still) cycle = setInterval(tick, 1800);
  }, { threshold: 0.5 }).observe(scene);
}

// ---------- designers: a deck that follows the pointer, and pages the way the list runs ----------
{
  const list = $("who-list"), deck = $("deck"), stage = $("who-stage");
  let cards = [], at = 1, vel = 0, goal = 1, frame = 0, front = -1, who = -1, near = false;
  const place = () => {
    let moving = false;
    vel = (vel + (goal - at) * 0.09) * 0.76;
    at += vel;
    if (still) at = goal;
    if (Math.abs(goal - at) + Math.abs(vel) > 0.001) moving = true;
    const now = performance.now();
    cards.forEach((c, i) => {
      if (now > c.from) {
        c.vy = (c.vy + (0 - c.y) * 0.1) * 0.75;
        c.y += c.vy;
      }
      if (still) c.y = 0;
      if (Math.abs(c.y) + Math.abs(c.vy) > 0.002) moving = true;
      const d = i - at, far = Math.min(2, Math.abs(d));
      c.node.style.transform = `translate(-50%, -50%) translate(${d * 44}%, ${c.y * 46}%) scale(${1 - far * 0.14})`;
      c.node.style.zIndex = 20 - Math.round(far * 8);
      c.node.style.opacity = Math.max(0, 1 - Math.abs(c.y) * 1.15);
      c.node.style.setProperty("--dim", Math.min(1, far));
    });
    const lead = Math.round(Math.max(0, Math.min(cards.length - 1, at)));
    if (lead !== front) { front = lead; lend(); }
    frame = moving ? requestAnimationFrame(place) : 0;
  };
  const go = () => { frame ||= requestAnimationFrame(place); };
  /** The card in front plays, and gives its title. */
  const lend = () => {
    cards.forEach((c, i) => {
      if (i === front && near && moves(c.id)) play(c.shot, c.id);
      else c.shot.querySelector("video")?.pause();
    });
    const t = stage.querySelector(".who-title");
    if (!t || t.textContent === REFS[cards[front].id].title) return;
    t.textContent = REFS[cards[front].id].title;
    if (!still) t.animate([{ opacity: 0 }, {}], { duration: 300 });
  };
  const show = (n) => {
    if (n === who) return;
    const d = FEATURED[n], dir = who < 0 ? 0 : n > who ? 1 : -1, name = PEOPLE[d.handle].name;
    [...list.children].forEach((b, i) => { b.classList.toggle("on", i === n); b.setAttribute("aria-pressed", i === n); });
    mark(n);
    if (dir && !still) {
      const old = el("div", "leaving");
      old.append(...cards.map((c) => c.node));
      old.querySelectorAll("video").forEach((v) => v.pause());
      deck.before(old);
      old.animate([{}, { transform: `translateY(${dir * -110}px) scale(0.94)`, opacity: 0 }], { duration: 300, easing: "cubic-bezier(.5,0,.8,.4)", fill: "forwards" }).finished.then(() => old.remove());
    }
    who = n;
    cards = [d.refs[1], d.refs[0], d.refs[2]].filter(Boolean).map((id, i) => {
      const a = Object.assign(el("a", ""), { href: REFS[id].url, target: "_blank", rel: "noopener", draggable: false }), shot = screen(id);
      shot.append(el("i", "dim"));
      a.append(shot);
      a.addEventListener("focus", () => { if (a.matches(":focus-visible")) { goal = i; go(); } });
      return { id, node: a, shot, y: dir, vy: 0, from: performance.now() + [130, 60, 190][i] };
    });
    at = goal = 1;
    vel = 0;
    front = -1;
    deck.replaceChildren(...cards.map((c) => c.node));
    $("who-id").innerHTML = `${face(d.handle)}<div><b>${esc(name)}</b><span>${d.count} refs, stands out for ${esc(d.traits.slice(0, 2).join(", "))} and ${esc(d.traits[2])}</span></div><a class="pill" href="https://x.com/${d.handle}" target="_blank" rel="noopener">@${d.handle}</a>`;
    if (dir && !still) [...$("who-id").children].forEach((c, i) => c.animate([{ opacity: 0, transform: `translateY(${dir * 16}px)` }, {}], { duration: 520, delay: 90 + i * 50, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }));
    place();
  };
  /** The highlight slides from one name to the other. */
  const mark = (n) => {
    const b = list.children[n];
    for (const [k, v] of [["x", b.offsetLeft], ["y", b.offsetTop], ["w", b.offsetWidth], ["h", b.offsetHeight]]) list.style.setProperty(`--${k}`, `${v}px`);
  };
  list.append(...FEATURED.map((d, n) => {
    const b = el("button", "", `${face(d.handle)}<div><b>${esc(PEOPLE[d.handle].name)}</b><span>${esc(d.traits.join(", "))}</span></div><i>${d.count}</i>`);
    b.type = "button";
    b.addEventListener("click", () => show(n));
    return b;
  }));
  stage.prepend(Object.assign(el("p", "who-title"), { ariaHidden: "true" }));
  show(0);
  new ResizeObserver(() => mark(who)).observe(list);
  new IntersectionObserver(([e]) => { near = e.isIntersecting; if (cards.length) lend(); }, { threshold: 0.3 }).observe(stage);

  // a third of the stage per card, and a little give inside it
  let hold = null, slid = false;
  const last = () => cards.length - 1;
  deck.addEventListener("pointermove", (e) => {
    if (hold) {
      const d = hold.x - e.clientX;
      if (Math.abs(d) > 6) slid = true;
      goal = Math.max(-0.3, Math.min(last() + 0.3, hold.at + d / 220));
      return go();
    }
    if (e.pointerType !== "mouse") return;
    const b = deck.getBoundingClientRect(), u = Math.max(0, Math.min(0.999, (e.clientX - b.left) / b.width)) * cards.length, i = Math.floor(u);
    goal = i + (u - i - 0.5) * 0.3;
    go();
  });
  deck.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && !hold) { goal = 1; go(); } });
  deck.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { hold = { x: e.clientX, at: goal }; slid = false; } });
  for (const end of ["pointerup", "pointercancel"]) addEventListener(end, () => {
    if (!hold) return;
    hold = null;
    goal = Math.max(0, Math.min(last(), Math.round(goal)));
    go();
  });
  deck.addEventListener("click", (e) => { if (slid) { e.preventDefault(); slid = false; } });
}

// ---------- mcp: one conversation, and the plug it depends on ----------
{
  const built = (cls) => { const b = el("div", "built"); b.append(document.querySelector(`#cmp ${cls}`).cloneNode(true)); return b; };
  // what each call answers in the bank, as it really did
  const ASKS = [
    { name: "Payouts screen", ask: "Design the Payouts screen", calls: [["search_refs", "table filter"], ["get_ref", "2ef4ffd8"], ["search_refs", "kpi chart"], ["get_ref", "d8161c08"], ["search_refs", "selection modal"], ["get_ref", "57795fa1"]],
      says: "Built on three screens you kept.", out: () => built(".with .po"), alone: "Here is a Payouts dashboard.", bare: () => built(".alone .ge") },
    { name: "Onboarding like disarto's", ask: "Make our onboarding feel like disarto's", calls: [["list_designers", ""], ["search_refs", "onboarding by @disarto_max"], ["get_ref", "b6d2e961"]], big: true,
      says: "The checklist folds away, counts progress in segments and grays out what is done. I'll start from that.", alone: "I don't know who that is." },
    { name: "Command palettes", ask: "Which command palettes did I keep?", calls: [["search_refs", "command palette"], ["get_ref", "2b96f482"], ["get_ref", "9b3c4c37"]], big: true,
      says: "Five. These two are the closest to ours.", alone: "I can't see what you keep." },
  ];
  const panel = $("mcp"), chat = $("chat"), wire = $("wire"), head = $("head");
  let on = false, now = 0, run = 0, held = false, seen = false;
  const say = (node) => { chat.append(node); return node; };
  async function ask(n, quick = still) {
    const id = ++run, gone = () => id !== run, t = ASKS[n], pause = (ms) => wait(quick ? 0 : ms);
    now = n;
    [...$("asks").children].forEach((b, i) => { b.classList.toggle("on", i === n); b.setAttribute("aria-pressed", i === n); });
    chat.replaceChildren();
    $("composer").classList.add("typing");
    for (let i = quick ? t.ask.length : 0; i <= t.ask.length; i++) {
      $("typed").textContent = t.ask.slice(0, i);
      await pause(24);
      if (gone()) return;
    }
    $("composer").classList.remove("typing");
    await pause(500);
    if (gone()) return;
    if (on) {
      const step = say(el("p", "step busy", "")), seenRefs = say(el("div", t.big ? "seen big" : "seen"));
      for (const [tool, arg] of t.calls) {
        const ref = tool === "get_ref" && REFS[arg];
        step.innerHTML = `${tool} <span>${esc(ref ? ref.title : arg)}</span>`;
        await pause(ref ? 650 : 800);
        if (gone()) return;
        if (!ref) continue;
        const got = el("div", "");
        got.append(thumb({ draw: () => screen(arg) }));
        got.insertAdjacentHTML("beforeend", byline(arg, PEOPLE[ref.by].name));
        seenRefs.append(got);
      }
      await pause(500);
      if (gone()) return;
      step.className = "step";
      step.textContent = t.says;
    } else {
      const step = say(el("p", "step busy", "Nothing to look at"));
      await pause(1100);
      if (gone()) return;
      step.className = "step";
      step.textContent = t.alone;
    }
    const out = on ? t.out : t.bare;
    if (out) say(out());
    if (quick || held) return;
    await wait(6500);
    if (!gone() && !held && seen) ask((n + 1) % ASKS.length);
  }

  // the plug: a spring pulls its head to the socket, or to where it hangs
  const P = { x: 0, y: 0, vx: 0, vy: 0, r: -90 };
  let frame = 0, grab = null, moved = false;
  const spot = (plugged) => {
    const p = panel.getBoundingClientRect(), c = $("composer").getBoundingClientRect(), x = c.left - p.left, y = c.top - p.top + c.height / 2;
    return plugged ? { x: x - 10, y, r: -90 } : { x: x - Math.min(96, x - 30), y: y + 58, r: -38 };
  };
  const paint = () => {
    head.style.transform = `translate(${P.x - 22}px, ${P.y - 31}px) rotate(${P.r}deg)`;
    const a = (P.r * Math.PI) / 180, dx = -Math.sin(a), dy = Math.cos(a), tx = P.x - dx * 29, ty = P.y - dy * 29, y = spot(true).y;
    $("cord").setAttribute("d", `M-8 ${y} C${tx * 0.5} ${y} ${tx - dx * Math.max(20, tx * 0.4)} ${ty - dy * Math.max(20, tx * 0.4)} ${tx} ${ty}`);
  };
  const spring = () => {
    cancelAnimationFrame(frame);
    if (still) { Object.assign(P, spot(on)); return paint(); }
    const step = () => {
      const to = spot(on);
      P.vx = (P.vx + (to.x - P.x) * 0.12) * 0.74;
      P.vy = (P.vy + (to.y - P.y) * 0.12) * 0.74;
      P.x += P.vx;
      P.y += P.vy;
      P.r += (to.r - P.r) * 0.16;
      paint();
      if (Math.abs(to.x - P.x) + Math.abs(to.y - P.y) + Math.abs(P.vx) + Math.abs(P.vy) + Math.abs(to.r - P.r) > 0.1) frame = requestAnimationFrame(step);
    };
    step();
  };
  const plug = (state) => {
    on = state;
    panel.classList.toggle("linked", on);
    head.setAttribute("aria-pressed", on);
    spring();
  };
  const byHand = (state) => { held = true; plug(state); ask(now); };
  const at = (e) => { const p = panel.getBoundingClientRect(); return [e.clientX - p.left, e.clientY - p.top]; };
  head.addEventListener("pointerdown", (e) => {
    if (e.button) return;
    const [x, y] = at(e);
    grab = [x - P.x, y - P.y];
    moved = false;
    head.setPointerCapture(e.pointerId);
    cancelAnimationFrame(frame);
  });
  head.addEventListener("pointermove", (e) => {
    if (!grab) return;
    const [px, py] = at(e), x = px - grab[0], y = py - grab[1], to = spot(true);
    if (Math.hypot(x - P.x, y - P.y) > 2) moved = true;
    if (!moved) return;
    P.x = Math.max(24, Math.min(to.x, x));
    P.y = Math.max(to.y - 120, Math.min(to.y + 90, y));
    P.r = -90 + Math.max(-50, Math.min(50, (P.y - to.y) * 0.8));
    P.vx = P.vy = 0;
    paint();
  });
  head.addEventListener("pointerup", () => {
    if (!grab) return;
    grab = null;
    if (!moved) return;
    const to = spot(true), near = Math.hypot(to.x - P.x, to.y - P.y) < Math.min(34, to.x / 2);
    if (near === on) spring(); else byHand(near);
  });
  head.addEventListener("pointercancel", () => { grab = null; spring(); });
  head.addEventListener("click", () => { if (moved) moved = false; else byHand(!on); });
  new ResizeObserver(() => { Object.assign(P, spot(on)); paint(); }).observe(panel);

  $("asks").append(...ASKS.map((t, n) => {
    const b = Object.assign(el("button", ""), { type: "button", textContent: t.name });
    b.addEventListener("click", () => { held = true; ask(n); });
    return b;
  }));
  plug(false);
  new IntersectionObserver(async ([e]) => {
    seen = e.isIntersecting;
    if (!seen || run) return;
    run = 1;
    if (!still) await wait(500);
    if (held) return;
    plug(true);
    if (!still) await wait(900);
    if (!held) ask(0);
  }, { threshold: 0.6 }).observe($("composer"));
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
