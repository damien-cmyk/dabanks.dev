// The page is its own demo: what the visitor captures is cut out of the page, described, and banked.
// Everything happens in the tab, nothing is sent anywhere.
import { SHOWN, REFS, PEOPLE, FEATURED, TAGS } from "./bank.js?v=f59d6fdd";

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
    const c = node.cloneNode(true);
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
let whole = false;
function paintGrid(fresh) {
  const typed = $("q").value.toLowerCase().split(/\s+/).filter(Boolean);
  const found = bank.filter((r) => typed.every((w) => r.text.includes(w)));
  const draw = () => {
    const some = typed.length || whole ? found : found.slice(0, 12);
    $("grid").replaceChildren(...(found.length ? some.map((r) => {
      const f = el("figure", r === fresh ? "card new" : "card");
      const frame = el("div", "card-in"), shot = r.draw();
      fitIn(shot, 204);
      frame.append(shot);
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
  show(ref.title, [ref.id ? `by ${PEOPLE[REFS[ref.id].by].name}` : "", ...ref.tags.slice(0, 3)].filter(Boolean).join(", "));
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
  const draw = () => (id ? screen(id) : again(master));
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
  shoot({ x, y, w: Math.min(b.right - d.left, d.width) - x, h: Math.min(b.bottom - d.top, d.height) - y }, true, s.parentElement.dataset.ref);
};
for (const id of SHOWN.slice(0, 9)) {
  const f = el("div", "ref"), s = screen(id);
  f.dataset.ref = id;
  s.querySelector("img").loading = "eager";
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
  const on = desk.querySelector(`[data-ref="${demos++ % 2 ? "0ab5ac08" : "2ef4ffd8"}"] .s`).getBoundingClientRect();
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
  shoot({ x: a[0], y: a[1], w: b[0] - a[0], h: b[1] - a[1] }, false);
}

$("try").addEventListener("click", () => {
  if (!small.matches && !still) return void demo();
  takeScreen(desk.querySelector('[data-ref="2f16eda8"] .s'));
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

// ---------- designers ----------
{
  const list = $("who-list");
  const show = (n) => {
    const d = FEATURED[n], name = PEOPLE[d.handle].name;
    [...list.children].forEach((b, i) => { b.classList.toggle("on", i === n); b.setAttribute("aria-pressed", i === n); });
    const fan = el("div", "fan");
    fan.append(...d.refs.map((id) => {
      const a = Object.assign(el("a", ""), { href: REFS[id].url, target: "_blank", rel: "noopener", title: REFS[id].title });
      a.append(screen(id));
      return a;
    }));
    const id = el("div", "who-id", `${face(d.handle)}<div><b>${esc(name)}</b><span>${d.count} refs, stands out for ${esc(d.traits.slice(0, 2).join(", "))} and ${esc(d.traits[2])}</span></div><a class="pill" href="https://x.com/${d.handle}" target="_blank" rel="noopener">@${d.handle}</a>`);
    $("who-stage").replaceChildren(fan, id);
  };
  list.append(...FEATURED.map((d, n) => {
    const b = el("button", "", `${face(d.handle)}<div><b>${esc(PEOPLE[d.handle].name)}</b><span>${esc(d.traits.join(", "))}</span></div><i>${d.count}</i>`);
    b.type = "button";
    b.addEventListener("click", () => show(n));
    return b;
  }));
  show(0);
}

// ---------- mcp ----------
{
  const hit = (id, n) => { const d = el("div", "hit"); d.append(screen(id), el("div", "", `<b>${esc(REFS[id].title)}</b><span>${esc(REFS[id].patterns.slice(0, 2).join(", "))}</span>${byline(id)}`)); d.style.setProperty("--n", n); return d; };
  const line = (n, html) => { const d = el("div", "row", html); d.style.setProperty("--n", n); return d; };
  const TOOLS = [
    ["search_refs", "Finds refs by screen, pattern or use", 'query: <em>"table"</em>, limit: <em>3</em>', () => ["2ef4ffd8", "2f16eda8", "8e5d5f6d"].map(hit)],
    ["get_ref", "Opens one: the image and what was read in it", 'id: <em>"57795fa1"</em>', () => {
      const r = REFS["57795fa1"], d = el("div", "got"), t = el("div", "", `<b>${esc(r.title)}</b><ul>${r.patterns.map((p) => `<li>${esc(p[0].toUpperCase() + p.slice(1))}</li>`).join("")}</ul><div class="swatches">${r.palette.map((c) => `<i style="background:${c}"></i>`).join("")}</div>${byline("57795fa1")}`);
      d.append(screen("57795fa1"), t);
      return [d];
    }],
    ["list_designers", "Says who made what, and what sets them apart", "", () => FEATURED.slice(0, 6).map((d, n) => line(n, `${face(d.handle)}<div><b>${esc(PEOPLE[d.handle].name)}</b><span>${esc(d.traits.join(", "))}</span></div><i>${d.count} refs</i>`))],
    ["list_tags", "The vocabulary of the bank, counted", "", () => [el("div", "tagrow", TAGS.map(([t, n]) => `<span>${t}<i>${n}</i></span>`).join(""))]],
    ["add_ref", "Banks a link, when you ask for it", 'url: <em>"x.com/jakubkrehel/status/2109…"</em>', () => [hit("fd5a0db6", 0)]],
  ];
  let cycle, now = 0, held = false;
  const show = (n) => {
    now = n;
    const [name, , args, reply] = TOOLS[n];
    [...$("mcp-tools").children].forEach((b, i) => { b.classList.toggle("on", i === n); b.setAttribute("aria-pressed", i === n); });
    $("mcp-call").innerHTML = `<b>${name}</b> ${args ? `{ ${args} }` : ""}`;
    $("mcp-reply").replaceChildren(...reply());
  };
  $("mcp-tools").append(...TOOLS.map(([name, what], n) => {
    const b = el("button", "", `<b>${name}</b><span>${what}</span>`);
    b.type = "button";
    b.addEventListener("click", () => { held = true; show(n); });
    return b;
  }));
  show(0);
  new IntersectionObserver(([e]) => {
    clearInterval(cycle);
    if (e.isIntersecting && !still) cycle = setInterval(() => held || show((now + 1) % TOOLS.length), 3600);
  }, { threshold: 0.5 }).observe($("mcp"));
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
  $("log").append(...[["2ef4ffd8", "Dropdown filters and a selection you can see"], ["d8161c08", "A figure with its own mini chart"], ["57795fa1", "The count inside the action button"]].map(([id, what]) => {
    const li = el("li", "");
    li.append(thumb({ draw: () => screen(id) }), el("div", "", `<b>${what}</b>${byline(id)}`));
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
