// Written by scripts/site-refs.mjs. Every ref belongs to its designer and links to their post.
export const SHOWN = ["5c3268de","cdf0ff39","d8161c08","0ab5ac08","4b57722e","2ef4ffd8","8594c7ae","fe6be0ce","849ea934","2f16eda8","7a526855","bb1d07b9","ed615818","57795fa1","b6d2e961","5659d044","839f3209","1bd3c997","66fda697","2b96f482","50965363","b2fdfb4f","f24bba3e","15a4be07","d5bf0dbf","135c1f1e","fd5a0db6","8633d9e9","63b3d242","c53ca7f1","513ec833","1473f3d9","8e5d5f6d","12bf053c"];
export const REFS = {
 "50965363": {
  "title": "Shared inbox · conversation view",
  "by": "marcelkargul",
  "url": "https://x.com/marcelkargul/status/2008583844350619878",
  "w": 2048,
  "h": 1525,
  "tags": [
   "web app",
   "ui",
   "inbox",
   "chat",
   "minimal",
   "saas",
   "chat bubble",
   "sidebar",
   "list",
   "tabs",
   "button",
   "dropdown"
  ],
  "patterns": [
   "details panel on the right with tabs",
   "conversation list with preview and delay",
   "chat bubbles with timestamp",
   "reply area fixed at the bottom of the conversation",
   "trial banner at top of the application",
   "sidebar navigation by views and filters with counters"
  ],
  "palette": [
   "#ffffff",
   "#f4f4f5",
   "#1f1f1f",
   "#2563eb",
   "#e0dcf7"
  ],
  "kind": "screen",
  "summary": "Screenshot of a three-column shared inbox: conversation list, message thread with a customer, and a ticket details panel (status, assignee, team, attributes). A banner at the top shows a premium trial with an upgrade button, and the left column groups the views, the AI agent and the teams.",
  "use": "Reference for designing a customer support or shared messaging interface, with a conversation list, a discussion thread and a side properties panel."
 },
 "5c3268de": {
  "title": "Knowspace · Surprise me view",
  "by": "Tanjim38",
  "url": "https://x.com/Tanjim38/status/2119477957899014304",
  "w": 1710,
  "h": 1080,
  "tags": [
   "dashboard",
   "search",
   "minimal",
   "editorial",
   "ui",
   "visual",
   "search bar",
   "card",
   "sidebar",
   "button",
   "toggle",
   "tooltip"
  ],
  "patterns": [
   "floating cards in free layout",
   "centered italic serif title",
   "floating navigation bar",
   "sidebar of color dots",
   "discreet progress counter"
  ],
  "palette": [
   "#f5f4f1",
   "#ffffff",
   "#1a1a1a",
   "#8a8a8a",
   "#e0576b",
   "#5b5bd6"
  ],
  "kind": "screen",
  "product": "Knowspace",
  "summary": "Random facts discovery interface: a search bar at the top, a Surprise me button and floating cards with facts illustrated by photos of objects. A 0 of 20 today counter and a sidebar of topics complete the screen.",
  "use": "Reference for a minimal, editorial exploration page, with floating cards and italic serif type for short content.",
  "clip": true
 },
 "cdf0ff39": {
  "title": "Workspace view picker popover",
  "by": "kylethacker",
  "url": "https://x.com/kylethacker/status/2106909046880244165",
  "w": 1310,
  "h": 1080,
  "tags": [
   "desktop app",
   "ui",
   "micro-interaction",
   "glassmorphism",
   "popover",
   "card",
   "button"
  ],
  "patterns": [
   "view selector as cards",
   "active state with checkmark",
   "popover anchored to an action button",
   "translucent frosted glass",
   "inactive options with dotted outline"
  ],
  "palette": [
   "#f8c9b5",
   "#fbc57a",
   "#fde9c4",
   "#b9b9d4",
   "#2a1a1a"
  ],
  "kind": "screen",
  "summary": "A translucent frosted glass popover offers four views for a space (List, Grid, Kanban, Canvas), with Canvas selected and marked with a checkmark. It is anchored to a \"plus\" and \"...\" action button on a desktop window.",
  "use": "Reference for a view or display mode selector presented as cards in a popover anchored to an action bar, with a clearly marked active state.",
  "clip": true
 },
 "d8161c08": {
  "title": "Warehouse · Section A view",
  "by": "kovalsky_stas",
  "url": "https://x.com/kovalsky_stas/status/2014669441414660578",
  "w": 1600,
  "h": 962,
  "tags": [
   "dashboard",
   "ui",
   "minimal",
   "saas",
   "kpi",
   "chart",
   "chip",
   "card",
   "toggle",
   "tab bar"
  ],
  "patterns": [
   "zone selector as hatched chips for disabled states",
   "KPI with gradient bar mini chart",
   "capacity card with line chart and day axis",
   "vertical column gauge to compare levels"
  ],
  "palette": [
   "#ffffff",
   "#f7f7f7",
   "#f97316",
   "#dc2626",
   "#fbbf24",
   "#9ca3af"
  ],
  "kind": "screen",
  "summary": "Warehouse tracking panel with selection of zones A1 to A5, KPI indicators in percent and kWh with small orange bar charts, and an available capacity card with a weekly line chart. The product is not named in the image.",
  "use": "Reference for a dense operational tracking dashboard, with KPIs accompanied by colored sparklines and a zone selector as chips.",
  "parts": [
   [
    "Zone selector, hatched when unavailable",
    "chip, toggle",
    31.6,
    39.8,
    37,
    7.8
   ],
   [
    "Figure with its own mini chart",
    "kpi, chart",
    31.6,
    50,
    37,
    20.6
   ],
   [
    "Vertical gauges to compare levels",
    "chart",
    2,
    20.5,
    20.6,
    27
   ],
   [
    "Capacity card with a day axis",
    "card, chart",
    76,
    49.5,
    24,
    41
   ]
  ]
 },
 "0ab5ac08": {
  "title": "Activity feed · dark notifications",
  "by": "eliakuratli",
  "url": "https://x.com/eliakuratli/status/2115152573644808683",
  "w": 1080,
  "h": 1080,
  "dark": true,
  "tags": [
   "notifications",
   "dashboard",
   "ui",
   "dark",
   "minimal",
   "tabs",
   "list",
   "button",
   "badge",
   "avatar"
  ],
  "patterns": [
   "activity feed grouped by date",
   "type filters with counters",
   "purple unread dot",
   "global action button at top right",
   "row highlighted on hover"
  ],
  "palette": [
   "#121212",
   "#1e1e1e",
   "#8b5cf6",
   "#f5f5f5",
   "#9a9a9a"
  ],
  "kind": "screen",
  "summary": "Dark activity feed with filters by type (All, Comments, Changes, Deploys, Files) and an unread counter, grouped by day. Each row combines avatar, type icon, bold action, context and time, with a purple dot for unread items.",
  "use": "Reference for a notification center or a dense activity log in dark mode, with segmented control filters and grouping by date.",
  "parts": [
   [
    "Type filters with counters",
    "tabs",
    13,
    13.8,
    60.5,
    5.8
   ],
   [
    "One action for the whole list",
    "button",
    70,
    7.4,
    18.2,
    5.2
   ],
   [
    "Feed grouped by date",
    "list, avatar",
    11.5,
    23,
    78,
    38
   ],
   [
    "Unread dot at the end of the row",
    "badge",
    84.5,
    27.5,
    3.4,
    43
   ],
   [
    "Row highlighted on hover",
    "list",
    11.5,
    35,
    77,
    8.6
   ]
  ],
  "clip": true
 },
 "4b57722e": {
  "title": "Followers Trend · chart card on hover",
  "by": "bytinkerdom",
  "url": "https://x.com/bytinkerdom/status/1896470349124100219",
  "w": 1080,
  "h": 1080,
  "tags": [
   "dashboard",
   "ui",
   "micro-interaction",
   "color",
   "minimal",
   "chart",
   "kpi",
   "tooltip",
   "card"
  ],
  "patterns": [
   "thin bar graph with hover",
   "vertical cursor and value bubble",
   "KPI at bottom of card",
   "corner arrow icon button"
  ],
  "palette": [
   "#f9d0fb",
   "#ffffff",
   "#15131a",
   "#8a6a88"
  ],
  "kind": "screen",
  "summary": "Stats card with a thin pink bar chart, a vertical cursor and a value bubble (392) on hover over a month. Two KPIs are shown at the bottom: total followers 587 and new followers 116.",
  "use": "Reference for an interactive thin-bar chart with a hover cursor and a value bubble in a KPI card.",
  "clip": true
 },
 "2ef4ffd8": {
  "title": "Invoices · table with filters",
  "by": "keviduk",
  "url": "https://x.com/keviduk/status/2014318405260640443",
  "w": 1800,
  "h": 2034,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "minimal",
   "table",
   "checkbox",
   "chip",
   "dropdown",
   "badge"
  ],
  "patterns": [
   "dense table with multi-select",
   "dropdown filters above the table",
   "colored status badges",
   "global selection in indeterminate state"
  ],
  "palette": [
   "#fcfcfc",
   "#6c63f0",
   "#e6f4e6",
   "#2e7d32",
   "#fdeceb",
   "#d93025"
  ],
  "kind": "screen",
  "summary": "Invoice table with two dropdown filters (Status, Total), per-row checkboxes and a select-all. Columns Total, Due, Status (PAID, OVERDUE, DRAFT badges) and a truncated Invoice column on the right.",
  "use": "Reference for a dense financial data table with filters, multiple selection and colored status badges.",
  "parts": [
   [
    "Dropdown filters above the table",
    "dropdown, chip",
    14,
    23,
    31,
    7
   ],
   [
    "Dense table with multi-select",
    "table, checkbox",
    17,
    32.5,
    6,
    39
   ],
   [
    "Colored status badges",
    "badge",
    70,
    40,
    16,
    31
   ],
   [
    "Global selection, half checked",
    "checkbox",
    17.4,
    32.8,
    5.4,
    4.6
   ]
  ]
 },
 "8594c7ae": {
  "title": "Mikk Martin · AI chat waiting",
  "by": "mikkmartin",
  "url": "https://x.com/mikkmartin/status/2082755272871641568",
  "w": 1820,
  "h": 1456,
  "tags": [
   "chat",
   "ai",
   "minimal",
   "micro-interaction",
   "ui",
   "input",
   "button",
   "chat bubble",
   "skeleton"
  ],
  "patterns": [
   "status pill bar with loading indicator",
   "rounded input area with floating send button",
   "neutral background and soft shadows"
  ],
  "palette": [
   "#f3f3f3",
   "#ffffff",
   "#8a8a8a",
   "#d4d4d4"
  ],
  "kind": "screen",
  "summary": "Minimalist AI chat-style input field interface on a light gray background, with a status bar \"Preparing questions...\" and an animated loading indicator. The \"Ask anything...\" field shows a circular send button at the bottom right.",
  "use": "Reference for a generation or preparation state in an AI chat interface, with a pill-shaped prompt and a rounded input area.",
  "clip": true
 },
 "fe6be0ce": {
  "title": "Agents · chronological task lanes",
  "by": "flohoeller",
  "url": "https://x.com/flohoeller/status/2111405211478900836",
  "w": 2048,
  "h": 1285,
  "tags": [
   "web app",
   "ui",
   "ux",
   "ai",
   "minimal",
   "card",
   "badge",
   "chart"
  ],
  "patterns": [
   "time lanes per agent",
   "task bars with sources",
   "needs you status in orange",
   "dotted link between successive tasks",
   "header with running and needs you counter"
  ],
  "palette": [
   "#f8f8f8",
   "#ffffff",
   "#1f6fd1",
   "#d9641e",
   "#e0352b",
   "#ececec"
  ],
  "kind": "screen",
  "summary": "Chronological view of four AI agents (Researcher, Writer, Reviewer, Ops) over the last 30 minutes, with one lane per agent and task bars linked to the tools used. The running, idle and needs you statuses are flagged, and a dotted link connects two tasks that follow each other.",
  "use": "Reference for designing an agent tracking board in time lanes, with statuses, ongoing tasks and a human approval alert.",
  "parts": [
   [
    "One lane per agent",
    "chart",
    3.5,
    37.5,
    92.5,
    39
   ],
   [
    "Task bars that show their sources",
    "badge, chart",
    30.4,
    38.2,
    27,
    6.6
   ],
   [
    "Dotted link between two tasks",
    "chart",
    56.3,
    40.4,
    3.2,
    12.4
   ],
   [
    "The task that waits for you, in orange",
    "badge",
    66,
    68,
    30,
    7.4
   ],
   [
    "Running and waiting, counted up top",
    "badge",
    4.5,
    22.8,
    31.5,
    6.4
   ]
  ],
  "clip": true
 },
 "849ea934": {
  "title": "ACME Inc · stock price chart",
  "by": "uixmat",
  "url": "https://x.com/uixmat/status/2024599124822413328",
  "w": 1632,
  "h": 1080,
  "dark": true,
  "tags": [
   "dashboard",
   "ui",
   "fintech",
   "dark",
   "minimal",
   "ui kit",
   "chart",
   "segmented control",
   "kpi"
  ],
  "patterns": [
   "value header with green change",
   "period selector as a segmented control",
   "smoothed line without visible Y axis",
   "discreet dotted grid"
  ],
  "palette": [
   "#0a0a0a",
   "#15803d",
   "#22c55e",
   "#f5f5f5",
   "#a1a1aa",
   "#27272a"
  ],
  "kind": "screen",
  "product": "Bklit UI",
  "summary": "Screenshot of a dark line chart showing the ACME Inc stock price ($127.04), with change and a period selector 1D, 1W, 1M, 6M, 1Y. The post announces range selections for line and area charts, in development.",
  "use": "Reference for a minimal stock price chart in a dark theme, with a value header, a colored change and a period segmented control.",
  "clip": true
 },
 "2f16eda8": {
  "title": "Realm · Issues view",
  "by": "mikun_ux",
  "url": "https://x.com/mikun_ux/status/1954082721426219362",
  "w": 2048,
  "h": 1444,
  "tags": [
   "dashboard",
   "desktop app",
   "ui",
   "saas",
   "minimal",
   "table",
   "sidebar",
   "badge",
   "avatar",
   "search bar",
   "button"
  ],
  "patterns": [
   "dense table with sortable columns",
   "colored status badges",
   "priority indicator in bars",
   "navigation sidebar by team",
   "app presentation in a window on an illustrated background"
  ],
  "palette": [
   "#ffffff",
   "#1e88e5",
   "#43a047",
   "#e53935",
   "#fbc02d",
   "#f06292"
  ],
  "kind": "screen",
  "product": "Realm",
  "summary": "Issues list view of a Realm project in an app window on an illustrated background: navigation sidebar, table with title, status, priority, assignee and dates. The source post simply announces an Issues view.",
  "use": "Reference for a dense ticket table with status badges, priority indicators and assignee avatars in a project management tool."
 },
 "7a526855": {
  "title": "Health dashboard · health tracking cards",
  "by": "siddharthvij_",
  "url": "https://x.com/siddharthvij_/status/1899748826875052453",
  "w": 2048,
  "h": 1795,
  "tags": [
   "dashboard",
   "mobile app",
   "ui",
   "health",
   "minimal",
   "card",
   "chart",
   "kpi",
   "tabs",
   "button"
  ],
  "patterns": [
   "metric card grid",
   "weekly average at the top of the card",
   "selected day in a black pill",
   "7-day chart with reference line",
   "color coding by metric"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f5",
   "#e0001b",
   "#5b4fd6",
   "#f7a524",
   "#ff00a8"
  ],
  "kind": "screen",
  "summary": "Grid of four health tracking cards (heart rate, sleep, weight, steps) with the weekly average, small per-day charts and day 5 selected in a black pill. The post asks which stat to add to this dashboard.",
  "use": "Reference for a grid of KPI cards with 7-day charts, a highlighted selected day and a distinct color for each metric."
 },
 "bb1d07b9": {
  "title": "To-Dos · Liquid Glass Schedule view",
  "by": "adamkp",
  "url": "https://x.com/adamkp/status/1952639437793354154",
  "w": 2048,
  "h": 1535,
  "tags": [
   "mobile app",
   "ui",
   "productivity",
   "glassmorphism",
   "segmented control",
   "calendar",
   "chip",
   "list",
   "button"
  ],
  "patterns": [
   "liquid glass",
   "horizontal day selector",
   "task list with date tags",
   "round action button at top right"
  ],
  "palette": [
   "#f5f5f7",
   "#ffffff",
   "#e5e5ea",
   "#ff3b30",
   "#34c759",
   "#ff9500"
  ],
  "kind": "screen",
  "summary": "Screenshot of an iOS to-do app with an All/Schedule segmented control, a day selection strip and a task list with time, category and date or importance tags. The accompanying post praises the Liquid Glass effect.",
  "use": "Reference for a mobile screen of scheduled tasks, with a segmented control and a translucent Liquid Glass-style panel."
 },
 "ed615818": {
  "title": "Investing app · portfolio home view",
  "by": "mnowakdesign",
  "url": "https://x.com/mnowakdesign/status/2059605048125231421",
  "w": 1440,
  "h": 1080,
  "tags": [
   "mobile app",
   "ui",
   "fintech",
   "minimal",
   "dashboard",
   "card",
   "progress bar",
   "chip",
   "segmented control",
   "list",
   "navbar"
  ],
  "patterns": [
   "large balance with cents in gray",
   "quick actions as three square buttons",
   "card with progress bar and scrolling chips",
   "period selector as a segmented control",
   "breakdown as a list with color dots"
  ],
  "palette": [
   "#ffffff",
   "#ebebeb",
   "#22c55e",
   "#1d4ed8",
   "#facc15",
   "#e11d48"
  ],
  "kind": "screen",
  "summary": "Two mobile screens of an investing app with a total balance, buttons Deposit, Withdraw and Earn, a Round-ups card with a progress bar and transaction chips, then an Allocation section with a period selector and a list breakdown. The bottom navigation bar offers Home, Portfolio, Activity and Profile.",
  "use": "Reference for a home page of a mobile investing fintech app, with a prominent balance, quick actions and a minimal portfolio breakdown."
 },
 "57795fa1": {
  "title": "Manage repositories · selection modal",
  "by": "PostiauxCharles",
  "url": "https://x.com/PostiauxCharles/status/2085300782115545573",
  "w": 2048,
  "h": 1536,
  "tags": [
   "web app",
   "ui",
   "saas",
   "minimal",
   "modal",
   "search bar",
   "tabs",
   "checkbox",
   "badge",
   "button"
  ],
  "patterns": [
   "multi-select with counter in the action button",
   "status filters with counters",
   "scrollable list with state badges",
   "secondary and primary actions in modal footer"
  ],
  "palette": [
   "#edecea",
   "#ffffff",
   "#2b2b2b",
   "#f5f5f4",
   "#10b981",
   "#6b6b6b"
  ],
  "kind": "screen",
  "summary": "Repository management modal with search, status filters (All, Enabled, Disabled), a list of repositories with checkboxes and state badges, and actions Clear selection and Disable 3 repositories. The product is not named in the screenshot.",
  "use": "Reference for a multi-select modal with status filters, search and a grouped action on a list of items.",
  "parts": [
   [
    "Status filters with counters",
    "tabs",
    27.3,
    30,
    45.3,
    5.6
   ],
   [
    "Scrollable list with state badges",
    "list, badge",
    27.3,
    36.5,
    45.3,
    40
   ],
   [
    "Counter in the action button",
    "button",
    49.8,
    77.4,
    23,
    6
   ],
   [
    "Quiet and loud action side by side",
    "button",
    27.3,
    77.4,
    45.3,
    6
   ]
  ]
 },
 "b6d2e961": {
  "title": "disarto · onboarding checklist",
  "by": "disarto_max",
  "url": "https://x.com/disarto_max/status/2070545553973244242",
  "w": 2048,
  "h": 1536,
  "tags": [
   "onboarding",
   "ui",
   "saas",
   "minimal",
   "card",
   "progress bar",
   "list",
   "button",
   "badge"
  ],
  "patterns": [
   "collapsible checklist",
   "segmented progress 2/5",
   "checked and numbered steps",
   "diagonal pattern background"
  ],
  "palette": [
   "#f4f4f6",
   "#ffffff",
   "#00b300",
   "#1a1a1a",
   "#8a8a8f"
  ],
  "kind": "screen",
  "product": "disarto",
  "summary": "Collapsible \"Getting started\" onboarding checklist with a segmented progress bar (2/5) and a list of numbered steps, two of them checked in green. The post mentions a light and dark mode version.",
  "use": "Reference for designing a collapsible onboarding checklist with segmented progress and numbered steps to check off."
 },
 "5659d044": {
  "title": "Deploy status · timeline and bar view",
  "by": "PostiauxCharles",
  "url": "https://x.com/PostiauxCharles/status/2109606436527366235",
  "w": 2048,
  "h": 1536,
  "dark": true,
  "tags": [
   "dashboard",
   "motion",
   "ui",
   "dev tools",
   "dark",
   "minimal",
   "list",
   "progress bar",
   "badge",
   "timeline"
  ],
  "patterns": [
   "vertical timeline with timestamps",
   "duration bar segmented by phase",
   "skipped step with dotted line",
   "actual vs estimated duration (was 31s)",
   "green status link in the footer"
  ],
  "palette": [
   "#111111",
   "#2a2a2a",
   "#f0f0f0",
   "#8a8a8a",
   "#10b981"
  ],
  "kind": "screen",
  "summary": "Two views of the same \"Update pricing page\" deployment: on the left a vertical timeline with timestamps and completed, skipped or pending steps, on the right a duration bar segmented by phase (build, deploy) followed by a list of checked steps. The total shown is 42s with a green live link.",
  "use": "Reference for designing a deployment pipeline tracker or step progress with durations, skipped states and a time-based timeline."
 },
 "839f3209": {
  "title": "Upload CSV · subscriber import flow",
  "by": "adriankuleszo",
  "url": "https://x.com/adriankuleszo/status/1947925933807309126",
  "w": 2048,
  "h": 1317,
  "tags": [
   "web app",
   "ui",
   "minimal",
   "file upload",
   "stepper",
   "button",
   "breadcrumb",
   "card"
  ],
  "patterns": [
   "dotted drop zone with drag & drop",
   "numbered 3-step stepper",
   "downloadable CSV template in a card",
   "formats and max size under the zone",
   "Cancel and Next actions at top of page"
  ],
  "palette": [
   "#f3f4f8",
   "#ffffff",
   "#111111",
   "#6b7280",
   "#d1d5db",
   "#10b981"
  ],
  "kind": "screen",
  "summary": "Step 1 of an email subscriber CSV import flow, with a 3-step stepper (CSV Template, Mapping, Confirm Upload) and a dashed drop zone. A card lets you download a CSV template, and the size limit (25MB) and accepted formats are displayed.",
  "use": "Reference for a multi-step file import flow with a drop zone, template download and displayed format constraints."
 },
 "1bd3c997": {
  "title": "Completion status · progress view",
  "by": "n___vc",
  "url": "https://x.com/n___vc/status/1909984154605039967",
  "w": 1600,
  "h": 1200,
  "tags": [
   "mobile app",
   "ui",
   "ux",
   "minimal",
   "bottom sheet",
   "list",
   "progress bar",
   "badge"
  ],
  "patterns": [
   "circular progress status",
   "checklist with description",
   "discreet help link in accent color"
  ],
  "palette": [
   "#f7f7f7",
   "#ffffff",
   "#f47a20",
   "#5cc85c",
   "#111111",
   "#6b6b6b"
  ],
  "kind": "screen",
  "summary": "A mobile panel shows a 50% progress status with an orange circular indicator, then a list of two steps: one checked in green with a description, one unchecked with a description. An orange \"What's this?\" link completes the block.",
  "use": "Reference for a progress screen of a multi-step journey, with a percentage summary and a detailed checklist in a bottom sheet or mobile panel."
 },
 "66fda697": {
  "title": "recruitpilot · campaigns and messages dashboard",
  "by": "flohoeller",
  "url": "https://x.com/flohoeller/status/2083250827259437071",
  "w": 2048,
  "h": 1469,
  "dark": true,
  "tags": [
   "dashboard",
   "inbox",
   "dark",
   "saas",
   "ui",
   "dev tools",
   "sidebar",
   "chart",
   "table",
   "list",
   "search bar",
   "tabs",
   "avatar"
  ],
  "patterns": [
   "line chart with view toggle",
   "dense table with colored variations",
   "two-column inbox with list and thread",
   "channel segmented control",
   "navigation sidebar with search"
  ],
  "palette": [],
  "kind": "screen",
  "product": "recruitpilot",
  "summary": "Dark dashboard of a recruiting tool with a line chart of job postings per day, a table of postings with lead variations, and an email and LinkedIn message inbox with an open conversation thread. The left sidebar lists the pages Dashboard, Campaigns and Messages.",
  "use": "Reference for a dark SaaS dashboard combining a trend chart, a dense table and a two-column inbox in Figma."
 },
 "2b96f482": {
  "title": "SocAI · command palette",
  "by": "masumparvej_",
  "url": "https://x.com/masumparvej_/status/1976523752671424810",
  "w": 2048,
  "h": 2048,
  "dark": true,
  "tags": [
   "dashboard",
   "search",
   "dark",
   "saas",
   "ui",
   "command palette",
   "sidebar",
   "search bar",
   "list",
   "navbar"
  ],
  "patterns": [
   "command palette with grouped sections",
   "sidebar with titled sections in uppercase",
   "keyboard shortcuts shown in the palette footer",
   "active item highlighted"
  ],
  "palette": [
   "#111113",
   "#1c1c1f",
   "#2a2a2e",
   "#3a3a40",
   "#e8e8ea",
   "#e4673a"
  ],
  "kind": "screen",
  "product": "SocAI",
  "summary": "Dark dashboard of a social media management tool with a grouped navigation sidebar. An open command palette shows actions, recent searches and quick actions with keyboard shortcuts.",
  "use": "Reference for a dark command palette with grouped sections, search at the top and keyboard shortcut hints at the bottom."
 },
 "b2fdfb4f": {
  "title": "Sajon · Morning Josh ESG dashboard",
  "by": "sajon_co",
  "url": "https://x.com/sajon_co/status/2068710541607235760",
  "w": 1200,
  "h": 900,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "generative ai",
   "minimal",
   "chart",
   "kpi",
   "sidebar",
   "tabs",
   "chat bubble",
   "card"
  ],
  "patterns": [
   "AI side panel with summary and suggested questions",
   "sidebar with expandable sections",
   "KPI cards with colored change",
   "compliance alert at bottom of sidebar",
   "combined bar and line chart",
   "dense table with breakdown bar"
  ],
  "palette": [
   "#ffffff",
   "#3ccf9e",
   "#f5b942",
   "#4a90e2",
   "#5b4fd6",
   "#f3f4f6"
  ],
  "kind": "screen",
  "product": "Sajon",
  "summary": "Dashboard of an ESG / GHG reporting tool with a navigation sidebar, a combined bar and line chart of emissions, KPI cards and an AI summary panel with chat. The source post presents it as a dashboard page from a recent project.",
  "use": "Reference for a dense reporting dashboard with a trend chart, KPIs per scope and a side AI assistant panel."
 },
 "f24bba3e": {
  "title": "Onboarding · 3 days a week planning",
  "by": "designme",
  "url": "https://x.com/designme/status/1996261912703549769",
  "w": 900,
  "h": 900,
  "tags": [
   "onboarding",
   "mobile app",
   "ui",
   "micro-interaction",
   "minimal",
   "health",
   "button",
   "chip"
  ],
  "patterns": [
   "day selector in circles",
   "text progress under the selector",
   "step title in spaced uppercase",
   "centered card on neutral background"
  ],
  "palette": [
   "#f7f7f7",
   "#ffffff",
   "#e8537a",
   "#2b2b33",
   "#8a8a90"
  ],
  "kind": "screen",
  "summary": "Workout planning onboarding screen with a weekday selector (Mo to Sa) in circles, two days selected in pink with a halo, and a \"2 of 3 days\" counter. A yoga mat illustration and a photo at the top introduce the goal \"3 days a week\".",
  "use": "Reference for a frequency or weekly schedule choice screen in a mobile onboarding, with day selection in circles and text progress."
 },
 "15a4be07": {
  "title": "Account menu light and dark",
  "by": "omarktiri_",
  "url": "https://x.com/omarktiri_/status/2005670142655770891",
  "w": 2048,
  "h": 1538,
  "tags": [
   "web app",
   "ui",
   "dashboard",
   "settings",
   "minimal",
   "dark",
   "dropdown",
   "toggle",
   "menu",
   "button",
   "list"
  ],
  "patterns": [
   "space list with selection check",
   "dark mode toggle in a menu",
   "destructive action in red at bottom of menu",
   "divider between spaces and settings",
   "light and dark variant side by side"
  ],
  "palette": [
   "#fafafa",
   "#1f1f1f",
   "#ef2b3a",
   "#0a84ff",
   "#ffffff",
   "#666666"
  ],
  "kind": "screen",
  "summary": "Two variants of an account menu showing a list of spaces (Northwind, Opus Studio, Atlas Labs) with a New space button, then settings (Account settings, Dark mode, Connected apps, Notifications) and a red Log out action. The dark version shows a Dark mode toggle turned on in blue.",
  "use": "Reference for an account dropdown menu or a space selector with a light/dark toggle, especially for icon-label alignment and the checkmark active state."
 },
 "d5bf0dbf": {
  "title": "File upload list in progress",
  "by": "aabis_nasir",
  "url": "https://x.com/aabis_nasir/status/2072792286334013468",
  "w": 1636,
  "h": 1136,
  "tags": [
   "ui",
   "ux",
   "minimal",
   "file upload",
   "list",
   "progress bar"
  ],
  "patterns": [
   "dotted drop zone above the list",
   "file row with format icon, name, size and status",
   "progress bar segmented by file",
   "completed status with green pill",
   "in-progress status with blue spinner"
  ],
  "palette": [
   "#f4f4f2",
   "#ffffff",
   "#3b5bdb",
   "#e5484d",
   "#4cba5c",
   "#1a1a1a"
  ],
  "kind": "screen",
  "summary": "A dashed drop zone sits above a list of two files, bill-of-lading.pdf completed (98 KB of 98 KB, status Complete) and proof-of-delivery.xls being uploaded (38 KB of 67 KB, Uploading). Each row combines a file type icon, the name, the size, a status and a segmented progress bar.",
  "use": "Reference for designing a multi-file upload component with completed and in-progress states, per-file progress and format icons."
 },
 "135c1f1e": {
  "title": "Payments · dither dashboard view",
  "by": "samakov0",
  "url": "https://x.com/samakov0/status/2077777068717482250",
  "w": 2048,
  "h": 1103,
  "tags": [
   "dashboard",
   "ui",
   "visual",
   "minimal",
   "fintech",
   "chart",
   "kpi",
   "segmented control",
   "card"
  ],
  "patterns": [
   "KPI with percentage change",
   "stacked bars in dither",
   "color legend per series",
   "segmented period filter"
  ],
  "palette": [
   "#f0f0f2",
   "#ffffff",
   "#1d4ed8",
   "#3b63e0",
   "#9bb3f0",
   "#111111"
  ],
  "kind": "screen",
  "summary": "Payments card showing an annual total with percentage change, above a stacked histogram by city and payment method (Cash, QR, Bank). The bars are rendered with a dither dot texture, and a Week, Month, Quarter, Year selector serves as the time filter.",
  "use": "Reference for a stacked bar chart styled with dither or a dot texture, paired with a KPI and a segmented period filter.",
  "clip": true
 },
 "fd5a0db6": {
  "title": "Interfere · setup states menu",
  "by": "jakubkrehel",
  "url": "https://x.com/jakubkrehel/status/2109306232859398295",
  "w": 2048,
  "h": 1280,
  "tags": [
   "web app",
   "ui",
   "settings",
   "minimal",
   "dev tools",
   "menu",
   "toggle",
   "progress bar",
   "button",
   "list",
   "badge"
  ],
  "patterns": [
   "state menu grouped by category",
   "setup progress bar",
   "key-value property list",
   "status as a colored pill"
  ],
  "palette": [
   "#232323",
   "#ffffff",
   "#f4f4f4",
   "#2f6bff",
   "#d9610f",
   "#8a8a8a"
  ],
  "kind": "screen",
  "product": "Interfere",
  "summary": "A dark menu groups the states of an integration by category (Connection, Data, Access), with the \"Setup incomplete\" state selected. On the right, the integration card shows a \"2 of 3\" progress bar, a \"Pending\" status and properties in rows.",
  "use": "Reference for designing a menu of grouped states and a configuration card with progress, status and key-value properties in a web app.",
  "clip": true
 },
 "8633d9e9": {
  "title": "Analytics · revenue chart panel",
  "by": "itsjamik",
  "url": "https://x.com/itsjamik/status/2117691185330266260",
  "w": 1812,
  "h": 2048,
  "tags": [
   "web app",
   "chat",
   "dashboard",
   "ui",
   "saas",
   "minimal",
   "chart",
   "tabs",
   "table",
   "tooltip",
   "sidebar",
   "chat bubble"
  ],
  "patterns": [
   "data side panel",
   "Chart SQL Data tabs",
   "stacked chart with detailed tooltip",
   "summary table under a chart",
   "large-number KPI with colored change",
   "collapsible code block"
  ],
  "palette": [
   "#5b5bf6",
   "#4cc35a",
   "#f5b921",
   "#ffffff",
   "#1f1f1f",
   "#8a8a8a"
  ],
  "kind": "screen",
  "summary": "View of a chat-based data analysis tool: a response on the left with a SQL query and metric, and on the right a panel with a stacked bar chart of net revenue by plan (Business, Team, Starter) from April to September, a detailed tooltip on September and a table by plan with changes vs Q2.",
  "use": "Reference for a data visualization side panel attached to a chat response, with Chart/SQL/Data tabs, a stacked chart and a summary table."
 },
 "63b3d242": {
  "title": "Atlas · Edge Network view",
  "by": "cmnijhof",
  "url": "https://x.com/cmnijhof/status/2085743539586027660",
  "w": 2048,
  "h": 1318,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "dev tools",
   "chat",
   "minimal",
   "ai",
   "table",
   "map",
   "sidebar",
   "chat bubble",
   "tabs",
   "chip"
  ],
  "patterns": [
   "dense table with filters as tabs",
   "chat side panel with suggestions and keyboard shortcuts",
   "dotted world map with selectable regions",
   "invitation banner with primary and secondary action"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f5",
   "#111111",
   "#16a34a",
   "#dc2626",
   "#2563eb"
  ],
  "kind": "screen",
  "product": "Atlas",
  "summary": "Management dashboard for a content delivery network (CDN) with a world map of regions, a navigation sidebar, a filterable request table and an agent chat panel on the right. The post announces one spot left for the following month at visinex.studio.",
  "use": "Reference for a dense infrastructure dashboard with a map, a filterable log table and a side AI assistant panel."
 },
 "c53ca7f1": {
  "title": "Kanbaaan · task kanban view",
  "by": "rubenhume",
  "url": "https://x.com/rubenhume/status/2106435230752194743",
  "w": 2048,
  "h": 1641,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "minimal",
   "kanban",
   "card",
   "chip",
   "sidebar",
   "segmented control",
   "search bar"
  ],
  "patterns": [
   "kanban columns with counter and actions",
   "card being dragged and dropped",
   "metadata in colored chips",
   "priority and due date chips",
   "dotted ghost placeholder during drag",
   "hidden column collapsed on the right"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f5",
   "#2f6fe0",
   "#22a845",
   "#f0700a",
   "#e5282a"
  ],
  "kind": "screen",
  "product": "Kanbaaan",
  "summary": "Kanban board for task tracking with To do, In progress and Done columns. Each card shows priority, assignee, due date or status, and one card is shown mid drag and drop.",
  "use": "Reference for a minimal SaaS kanban view, dense in metadata, with cards using colored chips for priority and due dates."
 },
 "513ec833": {
  "title": "Ace Studio · Analytics view",
  "by": "_heyrico",
  "url": "https://x.com/_heyrico/status/2089004025266217193",
  "w": 1806,
  "h": 2048,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "minimal",
   "e-commerce",
   "chart",
   "kpi",
   "sidebar",
   "card",
   "dropdown",
   "progress bar"
  ],
  "patterns": [
   "sidebar with Tools, Pinned and Chat sections",
   "dropdown pill filters at the top of the page",
   "KPI cards with colored change and mini chart",
   "line chart comparing two periods",
   "product list with progress bar",
   "Getting started block with progress",
   "floating AI assistant button"
  ],
  "palette": [
   "#ffffff",
   "#f4f4f4",
   "#1a73e8",
   "#22a84a",
   "#e5484d",
   "#c6f432"
  ],
  "kind": "screen",
  "product": "Ace Studio",
  "summary": "Analytics dashboard with a navigation sidebar, KPI cards (Gross Sales, Returning customer rate, Order fulfillment), a sales-over-time chart and a Top products table. Period, currency and channel filters at the top of the page, floating Ask Viictor button.",
  "use": "Reference for a dense e-commerce dashboard with KPIs, a comparative time chart and a list of products with progress bars."
 },
 "1473f3d9": {
  "title": "Workflow builder · add node",
  "by": "kvnkld",
  "url": "https://x.com/kvnkld/status/2080301910540865991",
  "w": 1600,
  "h": 1808,
  "tags": [
   "desktop app",
   "ui",
   "ux",
   "editor",
   "minimal",
   "productivity",
   "search bar",
   "segmented control",
   "list",
   "popover",
   "card",
   "chip"
  ],
  "patterns": [
   "two-step node add panel",
   "favorites pinned at the top of the list",
   "colored node type label (Trigger, Action)",
   "filterable search in an app list",
   "node canvas as cards with content preview"
  ],
  "palette": [
   "#ffffff",
   "#f4f4f5",
   "#c9c9cc",
   "#1c1c1e",
   "#e8a94a",
   "#6b8fd6"
  ],
  "kind": "screen",
  "summary": "Workflow editor showing the Add Node panel with app search, favorites, and the list of actions offered for an app (Create, Update, Find Task). The canvas shows Trigger and Action nodes linked together.",
  "use": "Reference for designing a no-code automation editor: add node panel, action selection per app and Trigger/Action hierarchy on the canvas."
 },
 "8e5d5f6d": {
  "title": "Foggy · LLM costs table view",
  "by": "heyimgustavo",
  "url": "https://x.com/heyimgustavo/status/2080283036063498576",
  "w": 1266,
  "h": 1730,
  "tags": [
   "dashboard",
   "desktop app",
   "ui",
   "saas",
   "minimal",
   "table",
   "segmented control",
   "date picker",
   "button",
   "tabs"
  ],
  "patterns": [
   "dense table",
   "sortable columns",
   "color coding by threshold",
   "period selector",
   "right-aligned numeric values"
  ],
  "palette": [
   "#ffffff",
   "#f7f8fa",
   "#dc2626",
   "#ea580c",
   "#d97706",
   "#16a34a"
  ],
  "kind": "screen",
  "product": "Foggy",
  "summary": "Dense table of LLM metrics (LLM, tokens, p95 latency, cost) sortable by column, with costs colored by threshold (red, orange, green) and a \"Last 30 days\" period selector. A desktop window with a Chat button and a Foggy panel as a tab.",
  "use": "Reference for a dense monitoring table with sortable columns, right-aligned numeric values and threshold color coding on costs.",
  "clip": true
 },
 "12bf053c": {
  "title": "Spending and credit score widgets",
  "by": "ersadwork",
  "url": "https://x.com/ersadwork/status/1960299913641656444",
  "w": 1676,
  "h": 2048,
  "tags": [
   "dashboard",
   "ui",
   "fintech",
   "minimal",
   "chart",
   "card",
   "dropdown",
   "tooltip",
   "progress bar",
   "button"
  ],
  "patterns": [
   "card widget with icon and title header",
   "horizontal bar chart with tooltip on hover",
   "segmented bar gauge",
   "period filter in a dropdown"
  ],
  "palette": [
   "#ffffff",
   "#ebebeb",
   "#1a1a1a",
   "#2f5bff",
   "#4fc3f7",
   "#7c4dff"
  ],
  "kind": "screen",
  "product": "AlignUI",
  "summary": "Two widget cards on a gray background: a horizontal bar chart of major expenses with a Weekly filter and a hover tooltip, and a credit score card with a green segmented gauge and an emoji badge. The cards frame a partial empty state at the top and bottom.",
  "use": "Reference for designing a personal finance widget or a dashboard with a bar chart, tooltip and segmented gauge."
 },
 "8ed52223": {
  "title": "Sales Pipeline · CRM dashboard view",
  "by": "mnowakdesign",
  "url": "https://x.com/mnowakdesign/status/2070522742571737420",
  "w": 2048,
  "h": 1210,
  "tags": [
   "dashboard",
   "saas",
   "ui",
   "layout",
   "ai",
   "kpi",
   "kanban",
   "chart",
   "card",
   "list",
   "sidebar"
  ],
  "patterns": [
   "KPI cards with colored change",
   "kanban columns by stage with counter",
   "leaderboard with score in a pill",
   "AI summaries in cards under the data",
   "filters at the top right of the content"
  ],
  "palette": [
   "#ffffff",
   "#f4f4f5",
   "#2563eb",
   "#16a34a",
   "#dc2626",
   "#60a5fa"
  ],
  "kind": "screen",
  "summary": "Sales pipeline dashboard with KPIs at the top (pipeline value, active deals, average size), deal stage columns (Prospecting, Qualified, Demo, Proposal), a revenue forecast chart and a lead scoring leaderboard. AI call summaries appear at the bottom.",
  "use": "Reference for a dense CRM dashboard with KPI cards, a kanban pipeline view and scoring panels, to adapt in Figma."
 },
 "12d5c280": {
  "title": "Lead scoring leaderboard in 3D view",
  "by": "mnowakdesign",
  "url": "https://x.com/mnowakdesign/status/2068711305335406722",
  "w": 1920,
  "h": 1080,
  "dark": true,
  "tags": [
   "dashboard",
   "ui",
   "visual",
   "dark",
   "3d",
   "saas",
   "list",
   "card",
   "avatar",
   "kpi"
  ],
  "patterns": [
   "ranking by score",
   "3D perspective",
   "depth of field blur",
   "score highlighted in green"
  ],
  "palette": [
   "#121212",
   "#1c1c1e",
   "#2a2a2d",
   "#22c55e",
   "#8a8a8e"
  ],
  "kind": "screen",
  "summary": "A lead ranking in a dark card, with a slightly tilted perspective and depth blur. Each row shows an avatar, a name, an email and a score, the top two scores being highlighted in green.",
  "use": "Reference for a leaderboard table or a score list in a dark dashboard, with a perspective depth effect."
 },
 "e8075f86": {
  "title": "Kargul Studio · payroll dashboard",
  "by": "marcelkargul",
  "url": "https://x.com/marcelkargul/status/2009517316241834114",
  "w": 2048,
  "h": 1525,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "fintech",
   "minimal",
   "kpi",
   "table",
   "sidebar",
   "card",
   "badge",
   "tabs",
   "dropdown"
  ],
  "patterns": [
   "KPI cards with colored change vs last week",
   "dense table with status badges",
   "grouped tasks panel with counter",
   "dropdown filters above the data"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f5",
   "#111111",
   "#16a34a",
   "#e11d48",
   "#7c3aed"
  ],
  "kind": "screen",
  "product": "Kargul Studio",
  "summary": "Dashboard of a payroll web app with KPIs, pending payouts, a payments table and a list of tasks to process. The sidebar navigation groups Dashboard, People, Payroll, Finance, Analytics and Services.",
  "use": "Reference for a dense fintech SaaS dashboard: KPI cards with change, a transactions table with statuses, and a task panel grouped by category."
 },
 "47b6db23": {
  "title": "ZeroPath · security issue detail",
  "by": "marcelkargul",
  "url": "https://x.com/marcelkargul/status/1996262665564381638",
  "w": 2048,
  "h": 1280,
  "tags": [
   "dashboard",
   "pricing",
   "ui",
   "saas",
   "dark",
   "sidebar",
   "modal",
   "tabs",
   "button",
   "badge",
   "list"
  ],
  "patterns": [
   "detail slide-over",
   "Issues Patch Status Log tabs",
   "source list with Explorer link",
   "primary and secondary action at top of panel",
   "colored score badges"
  ],
  "palette": [
   "#ffffff",
   "#1f6feb",
   "#e5484d",
   "#f2f2f2",
   "#111111",
   "#6b7280"
  ],
  "kind": "screen",
  "product": "ZeroPath",
  "summary": "Side panel showing the detail of a vulnerability (authorization bypass in PUT /messages) with a severity score, description, list of analysis sources (repo, application, source, source-to-sink analysis), potential assignee and the actions Generate Patch and View code. The left navigation lists Dashboard, Scans, Issues, Repositories and the Config section.",
  "use": "Reference for an issue detail screen in a security tool: side panel with tabs, severity badges and a list of clickable links to an explorer."
 },
 "9b3c4c37": {
  "title": "Ace Studio · orchestrator Chat view",
  "by": "_heyrico",
  "url": "https://x.com/_heyrico/status/2082813751460524310",
  "w": 2048,
  "h": 1310,
  "tags": [
   "dashboard",
   "chat",
   "ui",
   "generative ai",
   "minimal",
   "saas",
   "sidebar",
   "chat bubble",
   "menu",
   "button",
   "list",
   "command palette"
  ],
  "patterns": [
   "numbered choices in a decision panel",
   "keyboard navigation with arrows",
   "agentic chat with collapsed steps",
   "sidebar with Tools and Pinned sections"
  ],
  "palette": [
   "#ffffff",
   "#f4f4f4",
   "#1a1a1a",
   "#8a8a8a",
   "#e9f26b"
  ],
  "kind": "screen",
  "product": "Ace Studio",
  "summary": "Chat interface with an Orchestrator agent that asks a scoping question before generating ad creatives, with a navigation sidebar (Home, Analytics, Plan, Apps, Tools, pinned chats). A choice panel offers numbered answers, Dismiss and Submit.",
  "use": "Reference for an agentic chat screen where the AI asks the user for a decision through a panel of numbered choices with keyboard navigation."
 },
 "2809d155": {
  "title": "Heyrico · settings Apps view",
  "by": "_heyrico",
  "url": "https://x.com/_heyrico/status/2076319700947231149",
  "w": 2048,
  "h": 1280,
  "tags": [
   "saas",
   "settings",
   "dashboard",
   "ui",
   "minimal",
   "productivity",
   "card",
   "search bar",
   "sidebar",
   "button",
   "dropdown",
   "navbar"
  ],
  "patterns": [
   "two-column integration card grid",
   "sidebar navigation grouped by sections",
   "search bar with dropdown filters",
   "primary action button at top right"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f5",
   "#1a1a1a",
   "#6b6b6b",
   "#e5e5e5"
  ],
  "kind": "screen",
  "product": "Heyrico",
  "summary": "Apps page of a workspace's settings, with a search bar, filters Sort, Type and Categories, and a grid of cards for connected apps (X, GitHub, Slack, Asana, Zoom, Trello, Figma, Notion, Canva, Dropbox, Microsoft Teams, Jira, Google Drive, Loom). Each card shows a logo, a name, a short description and a plus button.",
  "use": "Reference for an integrations or connected apps management page in settings, with a two-column card list and inline filters."
 },
 "295c1617": {
  "title": "Context menu · dropdown width",
  "by": "keviduk",
  "url": "https://x.com/keviduk/status/2117975138541146303",
  "w": 2048,
  "h": 1536,
  "tags": [
   "web app",
   "ui",
   "dashboard",
   "minimal",
   "dropdown",
   "button",
   "segmented control",
   "menu"
  ],
  "patterns": [
   "action menu grouped by separators",
   "destructive action in red at bottom of menu",
   "icons to the left of labels",
   "width variant selector"
  ],
  "palette": [
   "#f7f7f7",
   "#f0f0f0",
   "#ffffff",
   "#d9d9d9",
   "#e8a0a0"
  ],
  "kind": "screen",
  "summary": "A floating dropdown menu below a three-dot button, with actions grouped by separators (open, rename, duplicate, copy link, move, delete in red). A selector at the bottom compares three widths: Cramped, Balanced, Stretched.",
  "use": "Reference for sizing a dropdown or action menu according to the width of its longest label, with padding and separators.",
  "clip": true
 },
 "f2db8766": {
  "title": "Visits table · tabular figures",
  "by": "keviduk",
  "url": "https://x.com/keviduk/status/2108606875251917158",
  "w": 2048,
  "h": 1536,
  "dark": true,
  "tags": [
   "dashboard",
   "ui",
   "typography",
   "dark",
   "minimal",
   "saas",
   "card",
   "table",
   "kpi"
  ],
  "patterns": [
   "aligned number columns",
   "before and after comparison",
   "variant label above the card"
  ],
  "palette": [
   "#111111",
   "#1c1c1c",
   "#2a2a2a",
   "#8a8a8a",
   "#f5f5f5"
  ],
  "kind": "screen",
  "summary": "Two dark cards listing human visits by platform (ChatGPT, Perplexity, Gemini, Claude, Copilot) with percentage and total. The right version enables tabular figures to align the numeric columns, the left one stays in the default rendering.",
  "use": "Reference for aligning columns of numbers in a table or data card, and for showing the effect of tabular figures on readability."
 },
 "ba35938e": {
  "title": "Paper · Slack integration",
  "by": "PostiauxCharles",
  "url": "https://x.com/PostiauxCharles/status/2092939969975218629",
  "w": 2048,
  "h": 1536,
  "tags": [
   "web app",
   "settings",
   "ui",
   "saas",
   "minimal",
   "toggle",
   "card",
   "breadcrumb",
   "button",
   "chat bubble"
  ],
  "patterns": [
   "permission list with toggles and descriptions",
   "notification preview in a card in header",
   "connected status with green dot",
   "details section in label-value pairs"
  ],
  "palette": [
   "#ecebe9",
   "#ffffff",
   "#1a1a1a",
   "#6b6b6b",
   "#0e6b57",
   "#c9dde6"
  ],
  "kind": "screen",
  "product": "Paper",
  "summary": "Slack integration detail page with breadcrumb, Connected status, workspace details and a list of permissions with toggles. A preview card shows a Paper notification sent in Slack about a comment.",
  "use": "Reference for an integration detail page with status, metadata and permissions that can be switched on or off with toggles."
 },
 "0a509cbb": {
  "title": "CloseCRM · task detail view",
  "by": "Tanjim38",
  "url": "https://x.com/Tanjim38/status/2013696083268878659",
  "w": 2048,
  "h": 1571,
  "tags": [
   "web app",
   "detail page",
   "ux",
   "saas",
   "minimal",
   "tabs",
   "sidebar",
   "button",
   "card",
   "avatar",
   "chip"
  ],
  "patterns": [
   "two columns info and activity",
   "tabs with counters",
   "grouped actions in header",
   "chronological activity feed",
   "status and priority as colored chips"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f7",
   "#111111",
   "#5b4fe0",
   "#e8e8ee",
   "#6b7280"
  ],
  "kind": "screen",
  "product": "CloseCRM",
  "summary": "Two-column task detail page: on the left the task information (status, priority, due date, contact, description, tags), on the right tabs Activity, Comments, Notes, Subtasks and Attachments with counters. The actions Create Sub task, Add Comments, Add Notes and Edit are grouped in the header.",
  "use": "Reference for a task or ticket detail page that must give context at a glance, with a fixed info column and a scrollable activity column in tabs."
 },
 "c4c75a74": {
  "title": "CloseCRM · contact details view",
  "by": "Tanjim38",
  "url": "https://x.com/Tanjim38/status/2009650261216878773",
  "w": 2048,
  "h": 1571,
  "tags": [
   "dashboard",
   "ui",
   "saas",
   "minimal",
   "fintech",
   "tab bar",
   "table",
   "badge",
   "sidebar",
   "card",
   "button"
  ],
  "patterns": [
   "contact card in three columns",
   "activity timeline with tabs",
   "tasks with status and priority as pills",
   "quick action icons in header",
   "company panel with colored tags"
  ],
  "palette": [
   "#ffffff",
   "#f5f5f7",
   "#000000",
   "#6366f1",
   "#1f2937",
   "#9ca3af"
  ],
  "kind": "screen",
  "product": "CloseCRM",
  "summary": "CRM contact record with a header (photo, name, quick actions), contact information columns, activity tabs, task list and company information panel. Sidebar navigation with favorites and recent chats.",
  "use": "Reference for a dense CRM contact record: three columns, timeline tabs, tasks with status and priority, and a company panel with tags."
 },
 "cdbc7ddf": {
  "title": "AlignUI · Daily Work Hours widgets",
  "by": "ersadwork",
  "url": "https://x.com/ersadwork/status/1955962917448266239",
  "w": 1676,
  "h": 2048,
  "tags": [
   "dashboard",
   "ui",
   "minimal",
   "card",
   "progress bar",
   "chart",
   "avatar",
   "button",
   "kpi"
  ],
  "patterns": [
   "widget card with icon header, title and Details button",
   "segmented breakdown bar with legend in color dots",
   "numeric KPI with gray subtext",
   "mini bar chart in alternating shades",
   "stacked avatars with counter"
  ],
  "palette": [
   "#ebebeb",
   "#ffffff",
   "#7c4ff0",
   "#4ac0fa",
   "#f6b21b"
  ],
  "kind": "screen",
  "product": "AlignUI",
  "summary": "Two white widget cards on a gray background: \"Daily Work Hours\" shows a total in hours and minutes, a three-color segmented bar with a legend, and \"Training Analysis\" shows a course counter, a group of avatars and a purple mini bar chart.",
  "use": "Reference for a time tracking or training widget in a dashboard, with a card header, a Details button, a segmented bar and a mini chart."
 },
 "9d966a61": {
  "title": "AlignUI · chat with account menu",
  "by": "ersadwork",
  "url": "https://x.com/ersadwork/status/2010702833645953378",
  "w": 1811,
  "h": 2048,
  "tags": [
   "web app",
   "chat",
   "ui",
   "layout",
   "saas",
   "ai",
   "sidebar",
   "popover",
   "avatar",
   "list",
   "toggle",
   "chat bubble"
  ],
  "patterns": [
   "account menu in a popover above the profile",
   "sidebar grouped by pinned and recent sections",
   "PRO badge next to the name",
   "dark mode toggle in a menu"
  ],
  "palette": [
   "#ffffff",
   "#f4f4f4",
   "#e6e6e6",
   "#4caf6a",
   "#d4f5dd",
   "#333333"
  ],
  "kind": "screen",
  "product": "AlignUI",
  "summary": "AI chat interface with a sidebar listing new chats, projects, pinned and recent, and a conversation window. A user dropdown menu shows the PRO profile, dark mode, settings, language, help and logout.",
  "use": "Reference for a chat layout with a history sidebar and an account menu as a popover anchored to the profile."
 },
 "eb1244fe": {
  "title": "disarto · AI agent overview view",
  "by": "disarto_max",
  "url": "https://x.com/disarto_max/status/2087580654464557091",
  "w": 2048,
  "h": 1536,
  "tags": [
   "dashboard",
   "ui",
   "minimal",
   "ai",
   "card",
   "progress bar",
   "chip",
   "button",
   "avatar",
   "badge"
  ],
  "patterns": [
   "agent card with green status",
   "striped progress bar for task in progress",
   "connectors shown as chips with +2 counter",
   "action footer with View details secondary button",
   "light and dark mode"
  ],
  "palette": [
   "#f4f5f7",
   "#ffffff",
   "#111111",
   "#8a8f98",
   "#e8702a",
   "#22c55e"
  ],
  "kind": "screen",
  "summary": "Overview card of an AI agent named Jake, executive assistant role, with active status, owner, integrations Gmail, Google Calendar and Notion, and an ongoing task with a progress bar. The source announces light and dark variants.",
  "use": "Reference for showing the state of an AI agent, its ongoing task and its connectors in a minimal dashboard."
 },
 "91127afd": {
  "title": "Settings · Notifications view",
  "by": "disarto_max",
  "url": "https://x.com/disarto_max/status/2083996547881087488",
  "w": 2048,
  "h": 1536,
  "tags": [
   "web app",
   "settings",
   "notifications",
   "ui",
   "saas",
   "minimal",
   "segmented control",
   "toggle",
   "sidebar",
   "search bar"
  ],
  "patterns": [
   "per-channel preferences in a segmented control",
   "global preference toggle at the top of the page",
   "settings sidebar grouped by section",
   "sections with title and thin divider"
  ],
  "palette": [
   "#f4f5f7",
   "#ffffff",
   "#1f2328",
   "#6b7280",
   "#f26b2a"
  ],
  "kind": "screen",
  "summary": "Notification settings page in a web interface, with a sidebar grouped into Personal and Workspace. Each notification is set per channel (Off, Email, In-app, Both) and a Smart notifications toggle is shown at the top.",
  "use": "Reference for a notification preferences page per event and per channel, with grouped sections and a segmented control."
 }
};
export const PEOPLE = {"Tanjim38":{"name":"Tanjim","face":true},"kylethacker":{"name":"Kyle Thacker","face":true},"kovalsky_stas":{"name":"Stas Kovalsky","face":true},"eliakuratli":{"name":"Elia","face":true},"bytinkerdom":{"name":"Tinkerdom","face":true},"keviduk":{"name":"Kevin","face":true},"mikkmartin":{"name":"Mikk Martin 🇪🇪🇺🇦","face":true},"flohoeller":{"name":"Flo","face":true},"uixmat":{"name":"Matt","face":true},"mikun_ux":{"name":"mikun","face":true},"siddharthvij_":{"name":"Siddharth Vij","face":true},"adamkp":{"name":"Adam KP","face":true},"mnowakdesign":{"name":"Michael Nowak","face":true},"PostiauxCharles":{"name":"Charles Postiaux","face":true},"disarto_max":{"name":"Maxim Kuznetsov","face":true},"adriankuleszo":{"name":"Adrian","face":true},"n___vc":{"name":"nick","face":true},"masumparvej_":{"name":"Masum","face":true},"marcelkargul":{"name":"Marcel","face":true},"sajon_co":{"name":"Sajon","face":true},"designme":{"name":"DesignMe","face":true},"omarktiri_":{"name":"Omar","face":true},"aabis_nasir":{"name":"Aabis","face":true},"samakov0":{"name":"bakai","face":true},"jakubkrehel":{"name":"Jakub Krehel","face":true},"itsjamik":{"name":"Jamik","face":true},"cmnijhof":{"name":"Chris Nijhof","face":true},"rubenhume":{"name":"Ruben Hume","face":true},"_heyrico":{"name":"rico","face":true},"kvnkld":{"name":"Kevin","face":true},"heyimgustavo":{"name":"Gustavo","face":true},"ersadwork":{"name":"Erşad","face":true}};
export const FEATURED = [
 {
  "handle": "mnowakdesign",
  "count": 11,
  "traits": [
   "card",
   "avatar",
   "e-commerce"
  ],
  "refs": [
   "ed615818",
   "8ed52223",
   "12d5c280"
  ]
 },
 {
  "handle": "marcelkargul",
  "count": 10,
  "traits": [
   "menu",
   "dropdown",
   "fintech"
  ],
  "refs": [
   "50965363",
   "e8075f86",
   "47b6db23"
  ]
 },
 {
  "handle": "_heyrico",
  "count": 11,
  "traits": [
   "sidebar",
   "chat",
   "navbar"
  ],
  "refs": [
   "513ec833",
   "9b3c4c37",
   "2809d155"
  ]
 },
 {
  "handle": "keviduk",
  "count": 9,
  "traits": [
   "table",
   "desktop app",
   "chat"
  ],
  "refs": [
   "2ef4ffd8",
   "295c1617",
   "f2db8766"
  ]
 },
 {
  "handle": "PostiauxCharles",
  "count": 4,
  "traits": [
   "modal",
   "badge",
   "list"
  ],
  "refs": [
   "5659d044",
   "57795fa1",
   "ba35938e"
  ]
 },
 {
  "handle": "Tanjim38",
  "count": 7,
  "traits": [
   "sidebar",
   "card",
   "productivity"
  ],
  "refs": [
   "5c3268de",
   "0a509cbb",
   "c4c75a74"
  ]
 },
 {
  "handle": "ersadwork",
  "count": 7,
  "traits": [
   "checkbox",
   "modal",
   "avatar"
  ],
  "refs": [
   "12bf053c",
   "cdbc7ddf",
   "9d966a61"
  ]
 },
 {
  "handle": "disarto_max",
  "count": 13,
  "traits": [
   "progress bar",
   "accordion",
   "avatar"
  ],
  "refs": [
   "b6d2e961",
   "eb1244fe",
   "91127afd"
  ]
 }
];
