/* ============================================================
   JunagadhBus Tracker — script.js
   Handles: bus data, search, filters, favourites, modal,
            clock, stats animation, notifications, theme
   ============================================================ */

"use strict";

/* ── 1. BUS DATA ──────────────────────────────────────────────
   Realistic GSRTC-style buses for Junagadh Division
   ─────────────────────────────────────────────────────────── */
const buses = [
  {
    id: 1,
    number: "GJ-18-Z-1021",
    busName: "Junagadh Veraval Express",
    type: "Express",
    from: "Junagadh",
    to: "Veraval",
    departure: "07:30 AM",
    arrival: "09:10 AM",
    duration: "1h 40m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Junagadh", "Bilkha", "Vanthli", "Keshod", "Maliya Hatina", "Veraval"]
  },
  {
    id: 2,
    number: "GJ-18-Z-1045",
    busName: "Junagadh Somnath Gurjarnagari",
    type: "Gurjarnagari",
    from: "Junagadh",
    to: "Somnath",
    departure: "06:00 AM",
    arrival: "08:30 AM",
    duration: "2h 30m",
    status: "Delayed",
    occupancy: "Full",
    route: ["Junagadh", "Vanthli", "Keshod", "Maliya Hatina", "Veraval", "Chorwad", "Somnath"]
  },
  {
    id: 3,
    number: "GJ-18-Z-1033",
    busName: "Mendarda Junagadh Local",
    type: "Local",
    from: "Mendarda",
    to: "Junagadh",
    departure: "07:00 AM",
    arrival: "08:15 AM",
    duration: "1h 15m",
    status: "On Time",
    occupancy: "Low",
    route: ["Mendarda", "Bhensan", "Jambudi Nes", "Junagadh"]
  },
  {
    id: 4,
    number: "GJ-18-Z-1087",
    busName: "Jetpur Junagadh Fast",
    type: "Express",
    from: "Jetpur",
    to: "Junagadh",
    departure: "08:15 AM",
    arrival: "10:00 AM",
    duration: "1h 45m",
    status: "Delayed",
    occupancy: "Medium",
    route: ["Jetpur", "Manavadar", "Bilkha", "Junagadh"]
  },
  {
    id: 5,
    number: "GJ-18-Z-1062",
    busName: "Junagadh Girnar Taleti Mini",
    type: "Mini Bus",
    from: "Junagadh",
    to: "Girnar Taleti",
    departure: "05:30 AM",
    arrival: "06:15 AM",
    duration: "45m",
    status: "Arriving Soon",
    occupancy: "Full",
    route: ["Junagadh ST Stand", "Bhavnath", "Girnar Taleti"]
  },
  {
    id: 6,
    number: "GJ-18-Z-1098",
    busName: "Visavadar Junagadh Passenger",
    type: "Local",
    from: "Visavadar",
    to: "Junagadh",
    departure: "06:45 AM",
    arrival: "08:30 AM",
    duration: "1h 45m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Visavadar", "Bantva", "Manavadar", "Bilkha", "Junagadh"]
  },
  {
    id: 7,
    number: "GJ-18-Z-1011",
    busName: "Junagadh Talala Express",
    type: "Express",
    from: "Junagadh",
    to: "Talala",
    departure: "09:00 AM",
    arrival: "10:50 AM",
    duration: "1h 50m",
    status: "On Time",
    occupancy: "Low",
    route: ["Junagadh", "Vanthli", "Keshod", "Veraval", "Una", "Talala"]
  },
  {
    id: 8,
    number: "GJ-18-Z-1076",
    busName: "Junagadh Bantva Vagad Local",
    type: "Local",
    from: "Junagadh",
    to: "Bantva",
    departure: "10:30 AM",
    arrival: "12:30 PM",
    duration: "2h 00m",
    status: "On Time",
    occupancy: "Low",
    route: ["Junagadh", "Bilkha", "Manavadar", "Bantva"]
  },
  {
    id: 9,
    number: "GJ-18-Z-1055",
    busName: "Junagadh Mangrol Express",
    type: "Express",
    from: "Junagadh",
    to: "Mangrol",
    departure: "11:00 AM",
    arrival: "01:00 PM",
    duration: "2h 00m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Junagadh", "Keshod", "Maliya Hatina", "Chorwad", "Mangrol"]
  },
  {
    id: 10,
    number: "GJ-18-Z-1130",
    busName: "Junagadh Somnath Sleeper",
    type: "Sleeper",
    from: "Junagadh",
    to: "Somnath",
    departure: "10:00 PM",
    arrival: "12:30 AM",
    duration: "2h 30m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Junagadh", "Vanthli", "Keshod", "Veraval", "Somnath"]
  },
  {
    id: 11,
    number: "GJ-18-Z-1049",
    busName: "Vanthli Junagadh Village Bus",
    type: "Local",
    from: "Vanthli",
    to: "Junagadh",
    departure: "08:00 AM",
    arrival: "08:55 AM",
    duration: "55m",
    status: "Arriving Soon",
    occupancy: "Full",
    route: ["Vanthli", "Bhesan Chokdi", "Navagadh", "Junagadh"]
  },
  {
    id: 12,
    number: "GJ-18-Z-1067",
    busName: "Junagadh Keshod Passenger",
    type: "Local",
    from: "Junagadh",
    to: "Keshod",
    departure: "01:00 PM",
    arrival: "02:10 PM",
    duration: "1h 10m",
    status: "On Time",
    occupancy: "Low",
    route: ["Junagadh", "Bilkha", "Vanthli", "Keshod"]
  },
  {
    id: 13,
    number: "GJ-18-Z-1102",
    busName: "Junagadh Bhavnath Mini Bus",
    type: "Mini Bus",
    from: "Junagadh",
    to: "Bhavnath",
    departure: "04:00 PM",
    arrival: "04:30 PM",
    duration: "30m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Junagadh ST Stand", "Bhavnath Chowk", "Bhavnath"]
  },
  {
    id: 14,
    number: "GJ-18-Z-1088",
    busName: "Maliya Junagadh Express",
    type: "Express",
    from: "Maliya Hatina",
    to: "Junagadh",
    departure: "05:45 AM",
    arrival: "07:15 AM",
    duration: "1h 30m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Maliya Hatina", "Keshod", "Vanthli", "Bilkha", "Junagadh"]
  },
  {
    id: 15,
    number: "GJ-18-Z-1119",
    busName: "Junagadh Chorwad Beach Bus",
    type: "Local",
    from: "Junagadh",
    to: "Chorwad",
    departure: "07:00 AM",
    arrival: "09:00 AM",
    duration: "2h 00m",
    status: "On Time",
    occupancy: "Low",
    route: ["Junagadh", "Vanthli", "Keshod", "Mangrol", "Chorwad"]
  },
  {
    id: 16,
    number: "GJ-18-Z-1073",
    busName: "Junagadh Visavadar Gurjarnagari",
    type: "Gurjarnagari",
    from: "Junagadh",
    to: "Visavadar",
    departure: "02:00 PM",
    arrival: "03:45 PM",
    duration: "1h 45m",
    status: "Delayed",
    occupancy: "Medium",
    route: ["Junagadh", "Bilkha", "Manavadar", "Bantva", "Visavadar"]
  },
  {
    id: 17,
    number: "GJ-18-Z-1041",
    busName: "Bhensan Junagadh Local",
    type: "Local",
    from: "Bhensan",
    to: "Junagadh",
    departure: "09:30 AM",
    arrival: "10:45 AM",
    duration: "1h 15m",
    status: "On Time",
    occupancy: "Low",
    route: ["Bhensan", "Mendarda", "Jambudi Nes", "Junagadh"]
  },
  {
    id: 18,
    number: "GJ-18-Z-1125",
    busName: "Junagadh Manavadar Semi-Fast",
    type: "Express",
    from: "Junagadh",
    to: "Manavadar",
    departure: "03:30 PM",
    arrival: "04:45 PM",
    duration: "1h 15m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Junagadh", "Bilkha", "Jetpur Bypass", "Manavadar"]
  },
  {
    id: 19,
    number: "GJ-18-Z-1059",
    busName: "Girnar Yatra Special",
    type: "Mini Bus",
    from: "Junagadh",
    to: "Girnar Taleti",
    departure: "04:30 AM",
    arrival: "05:15 AM",
    duration: "45m",
    status: "On Time",
    occupancy: "Full",
    route: ["Junagadh Kalwa Chowk", "Bhavnath", "Girnar Taleti"]
  },
  {
    id: 20,
    number: "GJ-18-Z-1092",
    busName: "Junagadh Jetpur Day Express",
    type: "Express",
    from: "Junagadh",
    to: "Jetpur",
    departure: "12:00 PM",
    arrival: "01:45 PM",
    duration: "1h 45m",
    status: "On Time",
    occupancy: "Medium",
    route: ["Junagadh", "Bilkha", "Manavadar", "Jetpur"]
  },
  {
    id: 21,
    number: "GJ-18-Z-1036",
    busName: "Veraval Junagadh Express",
    type: "Express",
    from: "Veraval",
    to: "Junagadh",
    departure: "04:00 PM",
    arrival: "05:45 PM",
    duration: "1h 45m",
    status: "Arriving Soon",
    occupancy: "Medium",
    route: ["Veraval", "Maliya Hatina", "Keshod", "Vanthli", "Bilkha", "Junagadh"]
  },
  {
    id: 22,
    number: "GJ-18-Z-1114",
    busName: "Somnath Junagadh Overnight",
    type: "Sleeper",
    from: "Somnath",
    to: "Junagadh",
    departure: "11:00 PM",
    arrival: "01:30 AM",
    duration: "2h 30m",
    status: "On Time",
    occupancy: "Low",
    route: ["Somnath", "Veraval", "Keshod", "Vanthli", "Bilkha", "Junagadh"]
  },
  {
    id: 23,
    number: "GJ-18-Z-1108",
    busName: "Junagadh Talala Girnar Tourist",
    type: "Gurjarnagari",
    from: "Junagadh",
    to: "Talala",
    departure: "06:30 AM",
    arrival: "08:30 AM",
    duration: "2h 00m",
    status: "On Time",
    occupancy: "Full",
    route: ["Junagadh", "Bhavnath", "Girnar Taleti", "Sasan Gir", "Talala"]
  }
];


/* ── 2. STATE ────────────────────────────────────────────────── */
let currentFilter  = "all";
let currentSearch  = "";
let currentSort    = "departure";
let favorites      = JSON.parse(localStorage.getItem("jb_favorites") || "[]");
let notifShown     = false;   // delay notification guard


/* ── 3. DOM REFS ─────────────────────────────────────────────── */
const busGrid        = document.getElementById("busGrid");
const searchInput    = document.getElementById("searchInput");
const searchClear    = document.getElementById("searchClear");
const filterTabs     = document.getElementById("filterTabs");
const loadingOverlay = document.getElementById("loadingOverlay");
const emptyState     = document.getElementById("emptyState");
const resultsCount   = document.getElementById("resultsCount");
const sortSelect     = document.getElementById("sortSelect");
const lastUpdated    = document.getElementById("lastUpdated");
const routeModal     = document.getElementById("routeModal");
const modalClose     = document.getElementById("modalClose");
const modalHeader    = document.getElementById("modalHeader");
const routeTimeline  = document.getElementById("routeTimeline");
const modalMeta      = document.getElementById("modalMeta");
const notifPopup     = document.getElementById("notifPopup");
const notifTitle     = document.getElementById("notifTitle");
const notifMsg       = document.getElementById("notifMsg");
const notifClose     = document.getElementById("notifClose");
const navClock       = document.getElementById("navClock");
const themeToggle    = document.getElementById("themeToggle");
const themeIcon      = document.getElementById("themeIcon");
const hamburger      = document.getElementById("hamburger");
const mobileDrawer   = document.getElementById("mobileDrawer");
const navFavBadge    = document.getElementById("navFavBadge");
const resetBtn       = document.getElementById("resetBtn");


/* ── 4. CLOCK ─────────────────────────────────────────────────── */
function updateClock() {
  const now = new Date();
  const h   = String(now.getHours()).padStart(2, "0");
  const m   = String(now.getMinutes()).padStart(2, "0");
  const s   = String(now.getSeconds()).padStart(2, "0");
  const ampm= now.getHours() >= 12 ? "PM" : "AM";
  const h12 = String(now.getHours() % 12 || 12).padStart(2, "0");
  navClock.textContent = `${h12}:${m}:${s} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);


/* ── 5. LAST UPDATED ─────────────────────────────────────────── */
function updateLastUpdated() {
  const now = new Date();
  lastUpdated.textContent = `Updated ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2,"0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
}
updateLastUpdated();
setInterval(updateLastUpdated, 60000); // refresh every minute


/* ── 6. STATS COUNTER ANIMATION ─────────────────────────────── */
function animateStats() {
  document.querySelectorAll(".stat-item").forEach(item => {
    const target = parseInt(item.dataset.target, 10);
    const numEl  = item.querySelector(".stat-num");
    let current  = 0;
    const step   = Math.ceil(target / 30);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      numEl.textContent = current;
    }, 40);
  });
}
// Trigger on hero visible (IntersectionObserver)
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateStats();
    statsObserver.disconnect();
  }
}, { threshold: 0.3 });
const heroStats = document.getElementById("heroStats");
if (heroStats) statsObserver.observe(heroStats);


/* ── 7. FILTER + SEARCH + SORT ───────────────────────────────── */

/** Convert time string like "07:30 AM" → minutes since midnight for sorting */
function timeToMins(t) {
  const [time, ampm] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

const occupancyOrder = { Low: 0, Medium: 1, Full: 2 };
const statusOrder    = { "Delayed": 0, "Arriving Soon": 1, "On Time": 2 };

function getFilteredBuses() {
  let result = [...buses];

  // Filter by tab
  switch (currentFilter) {
    case "running":
      result = result.filter(b => b.status === "On Time" || b.status === "Arriving Soon");
      break;
    case "delayed":
      result = result.filter(b => b.status === "Delayed");
      break;
    case "village":
      // Routes touching smaller villages (not just Junagadh↔Veraval main corridor)
      const villageKeywords = ["Mendarda","Bhensan","Jambudi Nes","Bantva","Visavadar","Bhavnath","Girnar","Chorwad","Manavadar","Bilkha","Vanthli","Sasan"];
      result = result.filter(b => b.route.some(s => villageKeywords.some(v => s.includes(v))));
      break;
    case "express":
      result = result.filter(b => b.type === "Express" || b.type === "Gurjarnagari");
      break;
    default:
      break;
  }

  // Search
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    result = result.filter(b =>
      b.number.toLowerCase().includes(q) ||
      b.busName.toLowerCase().includes(q) ||
      b.from.toLowerCase().includes(q) ||
      b.to.toLowerCase().includes(q) ||
      b.type.toLowerCase().includes(q) ||
      b.route.some(s => s.toLowerCase().includes(q))
    );
  }

  // Sort
  switch (currentSort) {
    case "departure":
      result.sort((a,b) => timeToMins(a.departure) - timeToMins(b.departure));
      break;
    case "status":
      result.sort((a,b) => (statusOrder[a.status]??3) - (statusOrder[b.status]??3));
      break;
    case "occupancy":
      result.sort((a,b) => (occupancyOrder[a.occupancy]??3) - (occupancyOrder[b.occupancy]??3));
      break;
  }

  return result;
}


/* ── 8. RENDER BUS CARDS ─────────────────────────────────────── */
function renderBusCards(list) {
  busGrid.innerHTML = "";

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    resultsCount.textContent = "No buses found";
    return;
  }

  emptyState.classList.add("hidden");
  resultsCount.textContent = `Showing ${list.length} bus${list.length !== 1 ? "es" : ""}`;

  list.forEach((bus, idx) => {
    const isFav     = favorites.includes(bus.id);
    const isDelayed = bus.status === "Delayed";

    // Show first 3 route stops + ellipsis
    const routeChips = bus.route.slice(0, 3).map(s =>
      `<span class="route-chip">${s}</span>`
    ).join("");
    const moreStops = bus.route.length > 3 ? `<span class="route-more">+${bus.route.length - 3} more</span>` : "";

    // Normalize status class (remove spaces)
    const statusClass = bus.status.replace(/\s+/g, "");

    const card = document.createElement("div");
    card.className = `bus-card${isDelayed ? " is-delayed" : ""}${isFav ? " is-fav" : ""}`;
    card.dataset.id   = bus.id;
    card.dataset.type = bus.type;
    card.style.animationDelay = `${idx * 0.05}s`;

    card.innerHTML = `
      <!-- Card Header -->
      <div class="card-header">
        <div>
          <div class="card-bus-num">${bus.number}</div>
          <div class="card-bus-name">${bus.busName}</div>
        </div>
        <span class="card-type-badge type-${bus.type.replace(" ","\\ ")}">${bus.type}</span>
      </div>

      <!-- Time Row -->
      <div class="card-time-row">
        <div class="time-block">
          <div class="time-val">${bus.departure}</div>
          <div class="time-label">${bus.from}</div>
        </div>
        <div class="time-arrow">
          <div class="arrow-line"></div>
          <div class="arrow-dur">⏱ ${bus.duration}</div>
        </div>
        <div class="time-block">
          <div class="time-val">${bus.arrival}</div>
          <div class="time-label">${bus.to}</div>
        </div>
      </div>

      <!-- Route -->
      <div class="card-route">
        <span class="route-icon">🗺️</span>
        ${routeChips}
        ${moreStops}
      </div>

      <!-- Footer -->
      <div class="card-footer">
        <span class="status-badge status-${statusClass}">${bus.status}</span>

        <div class="occupancy-wrap occ-${bus.occupancy}">
          <span class="occ-label">Occupancy</span>
          <div class="occ-bar"><div class="occ-fill"></div></div>
          <span class="occ-text">${bus.occupancy}</span>
        </div>

        <button class="view-route-btn" data-id="${bus.id}">View Route</button>
        <button class="fav-btn${isFav ? " active" : ""}" data-id="${bus.id}" title="${isFav ? "Remove favourite" : "Add to favourites"}">
          ${isFav ? "⭐" : "☆"}
        </button>
      </div>
    `;

    busGrid.appendChild(card);
  });
}


/* ── 9. LOADING SHIMMER ──────────────────────────────────────── */
function showLoading(cb) {
  loadingOverlay.classList.remove("hidden");
  busGrid.innerHTML = "";
  emptyState.classList.add("hidden");
  setTimeout(() => {
    loadingOverlay.classList.add("hidden");
    cb();
  }, 450); // short delay to feel responsive
}


/* ── 10. REFRESH ─────────────────────────────────────────────── */
function refreshBuses() {
  showLoading(() => {
    const filtered = getFilteredBuses();
    renderBusCards(filtered);
    updateNavFavBadge();
    checkDelayNotification();
    updateLastUpdated();
  });
}


/* ── 11. SEARCH ──────────────────────────────────────────────── */
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value;
  searchClear.classList.toggle("visible", currentSearch.length > 0);
  refreshBuses();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  currentSearch = "";
  searchClear.classList.remove("visible");
  searchInput.focus();
  refreshBuses();
});

// Quick tags
document.querySelectorAll(".qtag").forEach(btn => {
  btn.addEventListener("click", () => {
    searchInput.value = btn.dataset.q;
    currentSearch = btn.dataset.q;
    searchClear.classList.add("visible");
    // Scroll to dashboard
    document.getElementById("mainDashboard").scrollIntoView({ behavior: "smooth" });
    refreshBuses();
  });
});


/* ── 12. FILTER TABS ─────────────────────────────────────────── */
filterTabs.addEventListener("click", e => {
  const btn = e.target.closest(".ftab");
  if (!btn) return;
  document.querySelectorAll(".ftab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  refreshBuses();
});


/* ── 13. SORT ────────────────────────────────────────────────── */
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  refreshBuses();
});


/* ── 14. RESET BUTTON ────────────────────────────────────────── */
resetBtn.addEventListener("click", () => {
  currentSearch = "";
  currentFilter = "all";
  searchInput.value = "";
  searchClear.classList.remove("visible");
  document.querySelectorAll(".ftab").forEach(b => b.classList.remove("active"));
  document.querySelector('.ftab[data-filter="all"]').classList.add("active");
  refreshBuses();
});


/* ── 15. FAVOURITES ──────────────────────────────────────────── */

/** Toggle a bus in favourites */
function toggleFav(busId) {
  const id = parseInt(busId, 10);
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("jb_favorites", JSON.stringify(favorites));
  updateNavFavBadge();

  // Update the card UI without full re-render
  const card   = busGrid.querySelector(`.bus-card[data-id="${id}"]`);
  const favBtn = busGrid.querySelector(`.fav-btn[data-id="${id}"]`);
  if (card && favBtn) {
    const isFav = favorites.includes(id);
    card.classList.toggle("is-fav", isFav);
    favBtn.classList.toggle("active", isFav);
    favBtn.textContent = isFav ? "⭐" : "☆";
    favBtn.title = isFav ? "Remove favourite" : "Add to favourites";
  }
}

function updateNavFavBadge() {
  navFavBadge.textContent = favorites.length;
}


/* ── 16. VIEW ROUTE MODAL ────────────────────────────────────── */
function openRouteModal(busId) {
  const bus = buses.find(b => b.id === parseInt(busId, 10));
  if (!bus) return;

  // Header
  modalHeader.innerHTML = `
    <div class="bus-num-modal">${bus.number} · ${bus.type}</div>
    <h3>${bus.busName}</h3>
  `;

  // Timeline
  routeTimeline.innerHTML = bus.route.map((stop, i) => {
    let note = "";
    if (i === 0) note = `Departure: ${bus.departure}`;
    else if (i === bus.route.length - 1) note = `Arrival: ${bus.arrival}`;
    return `
      <div class="timeline-stop">
        <div class="timeline-dot"></div>
        <div class="stop-name">${stop}</div>
        ${note ? `<div class="stop-note">${note}</div>` : ""}
      </div>
    `;
  }).join("");

  // Meta chips
  const statusClass = bus.status.replace(/\s+/g, "");
  modalMeta.innerHTML = `
    <div class="meta-chip"><span>Duration</span><strong>⏱ ${bus.duration}</strong></div>
    <div class="meta-chip"><span>Status</span><strong class="status-${statusClass}">${bus.status}</strong></div>
    <div class="meta-chip"><span>Occupancy</span><strong>${bus.occupancy}</strong></div>
    <div class="meta-chip"><span>Stops</span><strong>${bus.route.length}</strong></div>
  `;

  routeModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeRouteModal() {
  routeModal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeRouteModal);
routeModal.addEventListener("click", e => {
  if (e.target === routeModal) closeRouteModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeRouteModal();
});


/* ── 17. CARD CLICK DELEGATION ───────────────────────────────── */
busGrid.addEventListener("click", e => {
  // Fav button
  const favBtn = e.target.closest(".fav-btn");
  if (favBtn) {
    e.stopPropagation();
    toggleFav(favBtn.dataset.id);
    return;
  }

  // View route button
  const routeBtn = e.target.closest(".view-route-btn");
  if (routeBtn) {
    e.stopPropagation();
    openRouteModal(routeBtn.dataset.id);
    return;
  }

  // Click anywhere on card → open modal
  const card = e.target.closest(".bus-card");
  if (card) {
    openRouteModal(card.dataset.id);
  }
});


/* ── 18. DELAY NOTIFICATION ──────────────────────────────────── */
function checkDelayNotification() {
  if (notifShown) return;
  const delayedFavs = buses.filter(b => b.status === "Delayed" && favorites.includes(b.id));
  if (delayedFavs.length > 0) {
    showNotification(
      "⚠️ Delay Alert",
      `${delayedFavs[0].busName} is currently delayed. Please check updated timings.`
    );
    notifShown = true;
    return;
  }
  // Also alert for first delayed bus if none favorited
  const anyDelayed = buses.find(b => b.status === "Delayed");
  if (anyDelayed && !notifShown) {
    setTimeout(() => {
      showNotification(
        "Delay Notice",
        `${anyDelayed.busName} (${anyDelayed.number}) is running late.`
      );
      notifShown = true;
    }, 3500);
  }
}

function showNotification(title, msg) {
  notifTitle.textContent = title;
  notifMsg.textContent   = msg;
  notifPopup.classList.remove("hidden");
  // Auto-dismiss after 7 s
  setTimeout(() => notifPopup.classList.add("hidden"), 7000);
}

notifClose.addEventListener("click", () => notifPopup.classList.add("hidden"));


/* ── 19. DARK / LIGHT THEME TOGGLE ──────────────────────────── */
function applyTheme(mode) {
  if (mode === "light") {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    themeIcon.textContent = "🌙";
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️";
  }
  localStorage.setItem("jb_theme", mode);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  applyTheme(isDark ? "light" : "dark");
});

// Restore saved theme
const savedTheme = localStorage.getItem("jb_theme") || "dark";
applyTheme(savedTheme);


/* ── 20. HAMBURGER MENU ──────────────────────────────────────── */
hamburger.addEventListener("click", () => {
  mobileDrawer.classList.toggle("open");
});
// Close on outside click
document.addEventListener("click", e => {
  if (!e.target.closest(".navbar")) {
    mobileDrawer.classList.remove("open");
  }
});


/* ── 21. WEATHER SIMULATION ──────────────────────────────────── */
// Static realistic Junagadh weather data (simulated, no API key needed)
const weatherConditions = [
  { icon: "☀️",  temp: "34°C", desc: "Sunny",         hum: "62%", wind: "12 km/h" },
  { icon: "⛅",  temp: "32°C", desc: "Partly Cloudy", hum: "68%", wind: "14 km/h" },
  { icon: "🌤️", temp: "31°C", desc: "Mostly Clear",  hum: "55%", wind: "10 km/h" },
  { icon: "🌧️", temp: "28°C", desc: "Light Rain",    hum: "82%", wind: "18 km/h" },
  { icon: "🌩️", temp: "26°C", desc: "Thunderstorm",  hum: "90%", wind: "24 km/h" },
];
const today = new Date();
const wData = weatherConditions[today.getDate() % weatherConditions.length];
document.getElementById("weatherIcon").textContent = wData.icon;
document.getElementById("weatherTemp").textContent = wData.temp;
document.getElementById("weatherDesc").textContent = wData.desc;
document.querySelector(".weather-extra").innerHTML =
  `<span>💧 ${wData.hum}</span><span>💨 ${wData.wind}</span>`;


/* ── 22. TICKER DUPLICATION (seamless loop) ──────────────────── */
// Duplicate ticker content so animation loops seamlessly
const tickerTrack = document.getElementById("tickerTrack");
tickerTrack.innerHTML += tickerTrack.innerHTML;


/* ── 23. NAVBAR SCROLL EFFECT ────────────────────────────────── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 40
    ? "0 4px 32px rgba(0,0,0,0.5)"
    : "none";
});


/* ── 24. SMOOTH NAV LINKS ────────────────────────────────────── */
document.querySelectorAll(".nav-link, .mob-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const section = link.dataset.section;
    if (section === "favorites") {
      // Filter to favourites
      currentFilter = "all";
      currentSearch = "";
      searchInput.value = "";
      // Show only favs
      const favBuses = buses.filter(b => favorites.includes(b.id));
      loadingOverlay.classList.remove("hidden");
      busGrid.innerHTML = "";
      setTimeout(() => {
        loadingOverlay.classList.add("hidden");
        renderBusCards(favBuses);
      }, 350);
      document.getElementById("mainDashboard").scrollIntoView({ behavior: "smooth" });
    } else if (section === "routes") {
      document.getElementById("mainDashboard").scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    mobileDrawer.classList.remove("open");
  });
});


/* ── 25. INITIAL RENDER ──────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  refreshBuses();
  updateNavFavBadge();
  // Trigger delay check after short delay so UI settles first
  setTimeout(checkDelayNotification, 2000);
});
