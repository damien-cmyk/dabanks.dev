// The sample bank: screens of products that don't exist, drawn at a fixed size and scaled to fit.
// data-part names a piece of the screen, so a capture can be described by what it covers.

const row = (c, client, no, due, amount, state, on) => `
  <div class="iv-row${on ? " on" : ""}"><i class="ck"></i><span class="iv-c"><i style="background:${c}"></i>${client}</span><span class="dim">${no}</span><span class="dim">${due}</span><span class="num">${amount}</span><em class="${state.toLowerCase()}">${state}</em></div>`;

const invoices = `
  <div class="iv">
    <header><b>Invoices</b><span class="iv-new">New invoice</span></header>
    <div class="iv-f" data-part="filters"><span class="set">Status: Unpaid<i>×</i></span><span class="set">Over $500<i>×</i></span><span>Client</span><span>Due date</span><u>Clear</u></div>
    <div class="iv-t" data-part="table">
      <div class="iv-row head"><i class="ck"></i><span>Client</span><span>Number</span><span>Due</span><span class="num">Amount</span><span>Status</span></div>
      ${row("#e4572e", "Oakline Studio", "#2041", "Nov 28", "$4,200.00", "Overdue", 1)}
      ${row("#2a9d8f", "Harbor & Finch", "#2040", "Dec 2", "$860.00", "Sent", 1)}
      ${row("#e9a820", "Sunday Bakery", "#2038", "Dec 4", "$1,315.50", "Sent", 1)}
      ${row("#3a6ea5", "Pell Architects", "#2037", "Dec 9", "$12,480.00", "Draft")}
      ${row("#7a8b3c", "Mossgate Farm", "#2035", "Dec 11", "$640.00", "Sent")}
      ${row("#b5483a", "Tenfold Press", "#2034", "Dec 15", "$2,075.00", "Draft")}
    </div>
    <div class="iv-b" data-part="bulk actions"><b>3 selected</b><span>Send reminder</span><span>Export</span><span>Archive</span></div>
  </div>`;

const player = `
  <div class="pl">
    <svg data-part="artwork" viewBox="0 0 252 252"><rect width="252" height="252" rx="18" fill="#f2a65a"/><circle cx="150" cy="104" r="52" fill="#fff1d6"/><path d="M0 150c50-34 88-20 126 4s84 24 126-8v88a18 18 0 0 1-18 18H18a18 18 0 0 1-18-18z" fill="#d9622b"/><path d="M0 190c56-30 96-2 140 4s78-12 112-26v66a18 18 0 0 1-18 18H18a18 18 0 0 1-18-18z" fill="#8c2f1b"/><path d="M0 222c70-18 130 8 252-8v20a18 18 0 0 1-18 18H18a18 18 0 0 1-18-18z" fill="#4a160d"/></svg>
    <div class="pl-t"><b>Low Tide Radio</b><span>Marlo Quist</span></div>
    <div class="pl-p" data-part="scrubber"><i></i><span>1:48</span><span>4:02</span></div>
    <div class="pl-c" data-part="controls"><svg viewBox="0 0 24 24"><path d="M18 6v12L9 12zM6 6h2v12H6z"/></svg><b><svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg></b><svg viewBox="0 0 24 24"><path d="M6 6v12l9-6zM16 6h2v12h-2z"/></svg></div>
    <div class="pl-q" data-part="queue"><p><i style="background:#2a9d8f"></i>Paper Lanterns<span>3:21</span></p><p><i style="background:#e9c46a"></i>Salt and Static<span>5:10</span></p></div>
  </div>`;

const stay = `
  <div class="st">
    <svg data-part="photo" viewBox="0 0 320 250" preserveAspectRatio="xMidYMid slice"><rect width="320" height="250" fill="#f6cfa8"/><circle cx="232" cy="78" r="30" fill="#fff3df"/><path d="M0 138 62 74l44 46 52-70 66 82 44-40 52 46v112H0z" fill="#5d8a99"/><path d="M0 160 70 118l60 36 70-46 120 56v86H0z" fill="#2f5d6b"/><path d="M0 182h320v68H0z" fill="#1d4350"/><path d="M0 200h120M180 212h140M60 226h150" stroke="#4f8a98" stroke-width="3"/><path d="M196 182v-30l26-18 26 18v30z" fill="#2b1c16"/><path d="M212 182v-18h12v18z" fill="#ffcf70"/></svg>
    <div class="st-b"><b>Cabin on Lake Orsa</b><span>2 bedrooms, wood stove, private dock</span>
      <div class="st-r" data-part="rating"><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3.1 1.2-6.2L3 9.6l6.3-.8z"/></svg>4.92<span>118 stays</span></div>
      <div class="st-a" data-part="price and action"><p><b>$184</b> night</p><strong>Reserve</strong></div>
    </div>
  </div>`;

const energy = `
  <div class="en">
    <header data-part="figure"><span>Energy used</span><p><b>312</b> kWh <em>8% less than October</em></p></header>
    <div class="en-s" data-part="range picker"><span>Day</span><span class="on">Week</span><span>Month</span></div>
    <svg data-part="area chart" viewBox="0 0 380 130"><path d="M0 92c30 4 40-36 72-30s40 40 74 30 36-64 76-58 40 46 70 40 44-44 88-50v106H0z" fill="#b9e2c6"/><path d="M0 92c30 4 40-36 72-30s40 40 74 30 36-64 76-58 40 46 70 40 44-44 88-50" fill="none" stroke="#1c7c4a" stroke-width="3"/><path d="M222 34v96" stroke="#1c7c4a" stroke-dasharray="3 4"/><circle cx="222" cy="34" r="6" fill="#fff" stroke="#1c7c4a" stroke-width="3"/></svg>
    <footer><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></footer>
  </div>`;

const palette = `
  <div class="pa"><div class="pa-w">
    <div class="pa-i" data-part="search field"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>mov<i></i></div>
    <div class="pa-l" data-part="results">
      <span>Actions</span>
      <p class="on"><b>Mov</b>e to project<kbd>M</kbd></p><p><b>Mov</b>e up<kbd>⌥ ↑</kbd></p>
      <span>Documents</span>
      <p><b>Mov</b>ing checklist</p><p>Q4 <b>mov</b>e, floor plan</p>
    </div>
  </div></div>`;

const ev = (d, t, h, c, n) => `<i style="left:${d * 20}%;top:${t}px;height:${h}px;background:${c}">${n}</i>`;
const calendar = `
  <div class="ca">
    <header><b>November</b><span class="ca-t" data-part="view switch"><i>Day</i><i class="on">Week</i><i>Month</i></span></header>
    <div class="ca-d" data-part="day headers"><span>Mon <b>23</b></span><span>Tue <b>24</b></span><span class="on">Wed <b>25</b></span><span>Thu <b>26</b></span><span>Fri <b>27</b></span></div>
    <div class="ca-g" data-part="week grid">${ev(0, 18, 62, "#f3c969", "Standup")}${ev(0, 110, 90, "#f2a48f", "Roadmap")}${ev(1, 48, 76, "#8fcfc0", "Interview")}${ev(2, 10, 44, "#f3c969", "Standup")}${ev(2, 84, 116, "#8fcfc0", "Workshop")}${ev(3, 60, 54, "#f2a48f", "Design review")}${ev(3, 148, 60, "#c9d6a3", "1:1")}${ev(4, 26, 92, "#c9d6a3", "Focus")}</div>
  </div>`;

const delivery = `
  <div class="de">
    <svg data-part="map" viewBox="0 0 320 340" preserveAspectRatio="xMidYMid slice"><rect width="320" height="340" fill="#dcefe3"/><path d="M-10 250c60-30 110 10 170-20s110-70 180-60v180H-10z" fill="#b8dcec"/><path d="M40-10v360M130-10 150 350M240-10 222 350M-10 70h340M-10 160 330 130M-10 290l340-60" stroke="#fff" stroke-width="12" fill="none"/><path d="M60 24h44v30H60zM170 90h46v28h-46zM256 24h40v34h-40z" fill="#c5e3cf"/><path d="M40 292V158l94-10 4-78h92" stroke="#111" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/><circle cx="40" cy="292" r="10" fill="#fff" stroke="#111" stroke-width="5"/><circle cx="230" cy="70" r="16" fill="#ff6b35"/><circle cx="230" cy="70" r="6" fill="#fff"/></svg>
    <div class="de-s" data-part="status sheet"><p><b>Arrives in 12 min</b><span>Two stops before yours</span></p>
      <div class="de-p" data-part="progress steps"><i class="on"></i><i class="on"></i><i class="half"></i><i></i></div>
      <div class="de-c" data-part="contact row"><i>JT</i><p><b>Juno T.</b><span>Cargo bike</span></p><strong>Call</strong></div>
    </div>
  </div>`;

const inbox = `
  <div class="in">
    <header><i>RK</i><p><b>Rosa Kline</b><span>Typing</span></p></header>
    <div data-part="conversation"><p class="them">The new fitting room flow is so much calmer</p><p class="me">We dropped two steps. Want the file?</p><p class="them">Yes, and the old one to compare</p></div>
    <footer data-part="composer"><span>Reply to Rosa</span><i><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg></i></footer>
  </div>`;

/** What the analysis would say about each one. */
export const SCREENS = {
  invoices: { w: 640, h: 452, html: invoices, title: "Invoices", product: "Ledgerly", kind: "table", tags: ["table", "filter", "badge", "bulk actions"], words: "dense light green finance list money", palette: ["#14532d", "#ffffff", "#f5f5f2", "#c2410c"],
    use: "A dense money table that stays calm: active filters on one line, one color per status, and actions that only show up once rows are selected.",
    parts: { filters: ["Active filters as removable chips", "chip, filter bar"], table: ["Status badges, right aligned amounts", "table, badge, checkbox"], "bulk actions": ["Floating bar on multi-selection", "toolbar, button"] } },
  player: { w: 300, h: 576, html: player, palette: ["#f2a65a", "#d9622b", "#4a160d", "#1d0d08"], use: "A player that borrows everything from its artwork: one warm accent, a filled play button, and the queue waiting under the fold.",
    title: "Now playing", product: "Low Tide", kind: "player", tags: ["music", "dark", "player", "queue"], words: "warm orange audio media mobile", parts: { artwork: ["Artwork sets the palette", "cover, color"], scrubber: ["Thin scrubber with times under", "slider"], controls: ["One filled control, two bare", "button, icon"], queue: ["Next up under the fold", "list"] } },
  stay: { w: 320, h: 470, html: stay, palette: ["#f6cfa8", "#5d8a99", "#1d4350", "#e4572e"], use: "A detail card that sells the place first, then puts the price and the only action on the same line.",
    title: "Stay detail", product: "Halden", kind: "detail", tags: ["travel", "photo", "price", "booking"], words: "warm card mobile hotel", parts: { photo: ["Full width photo header", "media, hero"], rating: ["Rating next to proof", "rating"], "price and action": ["Price sits beside the action", "button, price"] } },
  energy: { w: 420, h: 300, html: energy, title: "Weekly energy", product: "Wattle", kind: "chart", tags: ["chart", "figure", "segmented control"], words: "green dashboard data kpi line", parts: { figure: ["Figure first, comparison second", "kpi"], "range picker": ["Range as a segmented control", "segmented control"], "area chart": ["Area chart with a pinned day", "chart"] } },
  palette: { w: 460, h: 320, html: palette, title: "Command palette", product: "Folio", kind: "search", tags: ["command palette", "search", "shortcut"], words: "blue keyboard modal menu", parts: { "search field": ["Borderless search field", "input"], results: ["Grouped results, matched letters in bold", "list, kbd"] } },
  calendar: { w: 480, h: 360, html: calendar, palette: ["#f3c969", "#f2a48f", "#8fcfc0", "#fbf5e6"], use: "A week without grid lines: color says the kind of event, and today is the one filled day.",
    title: "Week view", product: "Almanac", kind: "calendar", tags: ["calendar", "week", "color coding"], words: "warm cream schedule events", parts: { "view switch": ["Day, week, month on one control", "segmented control"], "day headers": ["Today is the only filled day", "header"], "week grid": ["Events colored by kind, no grid lines", "calendar, card"] } },
  delivery: { w: 320, h: 530, html: delivery, palette: ["#dcefe3", "#b8dcec", "#ff6b35", "#17181a"], use: "Tracking that answers one question: how long. The map stays quiet so the route can be loud.",
    title: "Order tracking", product: "Pedal", kind: "map", tags: ["map", "tracking", "bottom sheet"], words: "mobile route progress food green", parts: { map: ["Quiet map, loud route", "map"], "status sheet": ["Time left as the title", "bottom sheet"], "progress steps": ["Steps as a split bar", "progress bar"], "contact row": ["Contact with a single action", "avatar, button"] } },
  inbox: { w: 400, h: 330, html: inbox, title: "Conversation", product: "Relay", kind: "chat", tags: ["chat", "message", "composer"], words: "blue support inbox bubble", parts: { conversation: ["Two bubble tones, no avatars", "chat bubble"], composer: ["Composer with one round action", "input, button"] } },
};

const fit = new ResizeObserver((list) => {
  for (const { target, contentRect } of list) target.style.setProperty("--k", contentRect.width / target.dataset.w);
});

/** A screen that fills the width it is given. */
export function screen(id) {
  const { w, h, html, title, product } = SCREENS[id];
  const s = document.createElement("div");
  s.className = "s";
  s.dataset.w = w;
  s.dataset.screen = id;
  s.style.aspectRatio = `${w} / ${h}`;
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", `${title}, ${product}`);
  s.innerHTML = `<div class="i" style="width:${w}px;height:${h}px">${html}</div>`;
  fit.observe(s);
  return s;
}

/** A piece of the page, cut out where the visitor drew: a copy of what was under it, shifted and clipped. */
export function cutout(desk, rect) {
  const s = document.createElement("div");
  s.className = "s cut";
  s.dataset.w = rect.w;
  s.style.aspectRatio = `${rect.w} / ${rect.h}`;
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", "Your capture");
  const i = document.createElement("div");
  i.className = "i";
  i.style.cssText = `width:${rect.w}px;height:${rect.h}px`;
  const copy = desk.cloneNode(false);
  copy.removeAttribute("id");
  copy.style.cssText = `position:absolute;margin:0;width:${desk.offsetWidth}px;height:${desk.offsetHeight}px;left:${-rect.x}px;top:${-rect.y}px;pointer-events:none`;
  const d = desk.getBoundingClientRect();
  for (const el of desk.children) {
    if (el.dataset.ui !== undefined) continue;
    const b = el.getBoundingClientRect();
    if (b.right < d.left + rect.x || b.left > d.left + rect.x + rect.w || b.bottom < d.top + rect.y || b.top > d.top + rect.y + rect.h) continue;
    const c = el.cloneNode(true);
    for (const n of [c, ...c.querySelectorAll("[id],[tabindex]")]) { n.removeAttribute("id"); n.removeAttribute("tabindex"); }
    copy.append(c);
  }
  i.append(copy);
  s.append(i);
  fit.observe(s);
  return s;
}

/** The same capture again, for another place on the page. */
cutout.copy = (master) => {
  const c = master.cloneNode(true);
  fit.observe(c);
  return c;
};
