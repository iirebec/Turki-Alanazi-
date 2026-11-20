/* Builds the page from content.js. You normally don't need to edit this file. */
(function () {
  var P = window.PORTFOLIO;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var initials = P.name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();

  /* ---- Header / hero ---- */
  document.title = P.name + " — " + P.role;
  $("brand").textContent = P.name;
  $("name").textContent = P.name;
  $("role").textContent = P.role;
  $("tagline").textContent = P.tagline;
  if (P.cv) $("cvBtn").href = P.cv; else $("cvBtn").remove();
  $("stats").innerHTML = (P.stats || []).map(function (s) {
    return '<div class="stat"><b>' + esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>";
  }).join("");

  /* ---- About ---- */
  $("avatar").innerHTML = P.photo ? '<img src="' + esc(P.photo) + '" alt="' + esc(P.name) + '">' : esc(initials);
  $("aboutText").innerHTML = (P.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

  /* ---- Generated artwork per category (used when no image) ---- */
  var palettes = {
    Solar:   ["#f5a524", "#f97316"],
    Wind:    ["#38bdf8", "#6366f1"],
    Storage: ["#10b981", "#0ea5e9"],
    Hydrogen: ["#06b6d4", "#0f9d6b"],
    Grid:    ["#8b5cf6", "#ec4899"],
    Hydro:   ["#0ea5e9", "#14b8a6"],
    Other:   ["#64748b", "#0f9d6b"]
  };
  var icons = {
    Solar: '<circle cx="160" cy="70" r="26" fill="#fff" opacity=".9"/><g fill="#fff" opacity=".85"><path d="M60 150 L120 110 L260 110 L200 150 Z"/></g><g stroke="rgba(0,0,0,.18)" stroke-width="2"><line x1="95" y1="130" x2="235" y2="130"/><line x1="105" y1="110" x2="80" y2="150"/><line x1="150" y1="110" x2="125" y2="150"/><line x1="195" y1="110" x2="170" y2="150"/></g>',
    Wind: '<g stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><line x1="120" y1="80" x2="120" y2="170"/><line x1="210" y1="95" x2="210" y2="170"/></g><g fill="#fff" opacity=".9"><path d="M120 80 l-3 -40 l3 -4 l3 4z"/><path d="M120 80 l-3 -40 l3 -4 l3 4z" transform="rotate(120 120 80)"/><path d="M120 80 l-3 -40 l3 -4 l3 4z" transform="rotate(240 120 80)"/><path d="M210 95 l-2 -30 l2 -3 l2 3z"/><path d="M210 95 l-2 -30 l2 -3 l2 3z" transform="rotate(120 210 95)"/><path d="M210 95 l-2 -30 l2 -3 l2 3z" transform="rotate(240 210 95)"/></g>',
    Storage: '<rect x="115" y="55" width="90" height="110" rx="12" fill="none" stroke="#fff" stroke-width="5" opacity=".9"/><rect x="145" y="42" width="30" height="13" rx="3" fill="#fff" opacity=".9"/><path d="M168 75 L145 115 H162 L152 148 L180 104 H163 Z" fill="#fff"/>',
    Grid: '<g stroke="#fff" stroke-width="3" fill="none" opacity=".9"><path d="M100 170 L130 50 L160 170 M112 120 H148 M118 95 H142"/><path d="M180 170 L210 50 L240 170 M192 120 H228 M198 95 H222"/><path d="M130 60 Q170 80 210 60" /></g>',
    Hydro: '<g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M60 110 q25 -18 50 0 t50 0 t50 0 t50 0"/><path d="M60 140 q25 -18 50 0 t50 0 t50 0 t50 0"/></g><path d="M160 40 C140 70 135 82 160 95 C185 82 180 70 160 40Z" fill="#fff"/>',
    Other: '<g fill="none" stroke="#fff" stroke-width="4" opacity=".9"><polyline points="60,150 110,110 150,130 200,70 260,90"/></g>'
  };
  function art(cat, i) {
    var c = palettes[cat] || palettes.Other, id = "g" + i + Math.random().toString(36).slice(2, 6);
    return '<svg class="art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#' + id + ')"/>' +
      '<g opacity=".12" stroke="#fff">' + Array.from({ length: 8 }, function (_, k) { return '<line x1="' + k * 45 + '" y1="0" x2="' + k * 45 + '" y2="180"/>'; }).join("") + "</g>" +
      (icons[cat] || icons.Other) + "</svg>";
  }
  function media(p, i) { return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' : art(p.category, i); }
  function metrics(p) {
    return (p.metrics && p.metrics.length) ? '<div class="metrics">' + p.metrics.map(function (m) {
      return '<div class="metric"><b>' + esc(m.value) + "</b><span>" + esc(m.label) + "</span></div>";
    }).join("") + "</div>" : "";
  }

  /* ---- Projects + filters ---- */
  var projects = P.projects || [];
  var cats = ["All"].concat(projects.map(function (p) { return p.category; }).filter(function (c, i, a) { return c && a.indexOf(c) === i; }));
  var current = "All";

  function renderFilters() {
    $("filters").innerHTML = cats.length > 2 ? cats.map(function (c) {
      return '<button class="chip' + (c === current ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("") : "";
  }
  function renderProjects() {
    $("projectGrid").innerHTML = projects.map(function (p, i) {
      if (current !== "All" && p.category !== current) return "";
      return '<button class="card" data-i="' + i + '">' +
        '<div class="card-media' + (p.image ? " has-img" : "") + '">' + media(p, i) + "</div>" +
        '<div class="card-body"><span class="card-cat">' + esc(p.category) + (p.year ? " · " + esc(p.year) : "") + "</span><h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" + metrics(p) +
        '<div class="tools">' + (p.tools || []).map(function (t) { return '<span class="tool">' + esc(t) + "</span>"; }).join("") + "</div>" +
        '<span class="more">Read case study →</span></div></button>';
    }).join("");
  }
  $("filters").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    current = b.dataset.cat; renderFilters(); renderProjects();
  });
  renderFilters(); renderProjects();

  /* ---- Project popup ---- */
  var modal = $("modal");
  $("projectGrid").addEventListener("click", function (e) {
    var card = e.target.closest(".card"); if (!card) return;
    var i = +card.dataset.i, p = projects[i];
    var sec = function (h, t) { return t ? "<h4>" + h + "</h4><p>" + esc(t) + "</p>" : ""; };
    $("modalBody").innerHTML =
      '<div class="modal-media' + (p.image ? " has-img" : "") + '">' + media(p, "m" + i) + "</div>" +
      '<div class="modal-content"><p class="eyebrow" style="margin-bottom:.5rem">' + esc(p.category) + (p.year ? " · " + esc(p.year) : "") + "</p>" +
      "<h2>" + esc(p.title) + "</h2>" + (p.role ? '<p class="proj-role">' + esc(p.role) + "</p>" : "") + metrics(p) +
      sec("The challenge", p.problem) + sec("Approach", p.approach) + sec("Results", p.results) +
      ((p.gallery && p.gallery.length) ? '<div class="gallery">' + p.gallery.map(function (g) { return '<a href="' + esc(g) + '" target="_blank" rel="noopener"><img src="' + esc(g) + '" alt="" loading="lazy"></a>'; }).join("") + "</div>" : "") +
      '<div class="tools" style="margin-top:16px">' + (p.tools || []).map(function (t) { return '<span class="tool">' + esc(t) + "</span>"; }).join("") + "</div>" +
      ((p.links && p.links.length) ? '<div class="cta" style="margin-bottom:0">' + p.links.map(function (l) {
        return '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>";
      }).join("") + "</div>" : "") + "</div>";
    modal.showModal();
  });
  $("closeModal").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  /* ---- Skills ---- */
  $("skillsBox").innerHTML = Object.keys(P.skills || {}).map(function (g) {
    return '<div class="skill-group"><h3>' + esc(g) + "</h3><ul>" + P.skills[g].map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  /* ---- Timeline ---- */
  $("timeline").innerHTML = (P.timeline || []).map(function (t) {
    return '<li><div class="when">' + esc(t.when) + "</div><h3>" + esc(t.title) + '</h3><div class="place">' + esc(t.place) + "</div><p>" + esc(t.text) + "</p>" + (t.link ? '<a class="tl-link" href="' + esc(t.link.url) + '" target="_blank" rel="noopener">' + esc(t.link.label) + " ↗</a>" : "") + "</li>";
  }).join("");

  /* ---- Contact & footer ---- */
  var links = [];
  if (P.email) links.push('<a class="btn primary" href="mailto:' + esc(P.email) + '">Email me</a>');
  if (P.linkedin) links.push('<a class="btn" href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>');
  if (P.github) links.push('<a class="btn" href="' + esc(P.github) + '" target="_blank" rel="noopener">GitHub</a>');
  if (P.cv) links.push('<a class="btn" href="' + esc(P.cv) + '" target="_blank" rel="noopener">CV</a>');
  $("contactLinks").innerHTML = links.join("");
  $("footer").textContent = "© " + new Date().getFullYear() + " " + P.name + (P.location ? " · " + P.location : "");

  /* ---- Dark mode toggle ---- */
  $("themeBtn").addEventListener("click", function () {
    var root = document.documentElement;
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });
})();

/* Respect "reduce motion": freeze the hero animation */
try {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) document.getElementById("heroArt").pauseAnimations();
} catch (e) {}
