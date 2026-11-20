/* =====================================================================
   YOUR PORTFOLIO CONTENT. This is the ONLY file you need to edit.
   ---------------------------------------------------------------------
   Rules:
   • Change the text between the quotes "like this".
   • Keep the commas at the end of lines, just like the examples.
   • To add a project: copy one { ... } block in "projects", paste it,
     and change the text.
   • Images and PDFs go in  assets/projects/  and you write their path,
     e.g. image: "assets/projects/my-chart.png". Leave image: "" to use
     the built-in graphic.
   • gallery: extra images shown inside the project popup (optional).
   • category must be one of: "Solar", "Wind", "Storage", "Grid",
     "Hydrogen", "Hydro", "Other"
   • Leave a link "" (empty) to hide it, e.g. linkedin: "".
   ===================================================================== */

window.PORTFOLIO = {

  /* ---------- About you ---------- */
  name: "Turki Alanazi",
  role: "Renewable Energy Engineering Student",
  tagline: "I build simulations that turn clean-energy ideas into numbers, from solar-timed mining plants to AI-assisted hydrogen safety.",
  location: "Hail, Saudi Arabia",
  photo: "",                       // e.g. "assets/me.jpg". Leave "" to show initials.
  cv: "assets/cv.pdf",
  email: "tr.alfarig@gmail.com",
  linkedin: "https://www.linkedin.com/in/turki-alanazi-9730a733a/",
  github: "",                      // paste your GitHub link here (optional)

  about: [
    "I'm a senior Renewable Energy Engineering student at the University of Ha'il (GPA 3.70 / 4.0), graduating in 2027. My work sits where engineering fundamentals meet simulation: solar–battery dispatch, hydrogen sensing and machine learning, and multiphysics heat recovery.",
    "In summer 2026 I interned at ACWA Power's 4 GW Qurayyah combined-cycle plant, working across the mechanical, electrical, instrumentation, RO and electrolyser departments. I lead teams in national energy and minerals competitions and care about results that are honest about their assumptions and limits."
  ],

  /* Big numbers shown at the top. Keep 3–4. */
  stats: [
    { value: "Top 35",  label: "of 1,200 teams, Energy Hackathon" },
    { value: "4 GW",    label: "power plant internship" },
    { value: "3.70",    label: "GPA / 4.0" }
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      title: "SunGrind: Solar-Timed HPGR Comminution for Off-Grid Gold Plants",
      category: "Solar",
      year: "2026",
      role: "Team leader · Future Minerals Pioneers 2027 (Ministry of Industry and Mineral Resources)",
      tools: ["Hourly simulation", "Dispatch optimisation", "Solar PV + BESS", "Emissions accounting"],
      summary: "An hour-by-hour simulation of a 4 Mt/y Arabian Shield gold plant that stores crushed rock instead of electricity to move the heaviest load into the solar window.",
      metrics: [
        { value: "−33%", label: "Energy per ounce" },
        { value: "−59%", label: "CO₂e per ounce" },
        { value: "45→68%", label: "Solar share" }
      ],
      problem: "Grinding rock is the largest electricity user in a hard-rock gold plant and runs flat 24 hours a day, while the Kingdom's cheapest power (solar at about 1 US cent/kWh) exists for only about ten of those hours. Remote Arabian Shield plants burn fuel to fill the gap.",
      approach: "SunGrind makes three changes. It sorts barren rock out before the mill with a bulk ore sensor. It splits the circuit by replacing the SAG mill with a dry HPGR stage that can start and stop in minutes. It shifts that stage into daylight, banking crushed ore in a ~6,000 t stockpile (about 16 h of ball-mill feed) that feeds the ball mill through the night. An explainable hourly dispatch rule sets the HPGR feed rate from the solar forecast, stockpile level and battery charge. The full 8,760-hour year was simulated against a conventional SAG plant on the same 20 MWp solar and 15 MWh battery, including a dust-storm week and sensitivity tests on every key assumption.",
      results: "Comminution energy per ounce fell 33% (320 → 214 kWh/oz), solar share rose from 45% to 68%, fuel or grid electricity dropped 62%, steel media fell 40%, and CO₂e per ounce fell 59% (149.5 → 61.0 kg/oz), about 22,400 t CO₂e avoided per year. The ball mill was never starved of feed, even through the dust storm. Even with no ore sorting, or with half the solar field, the reduction stays above 40%.",
      image: "assets/projects/sungrind-dust-storm-week.png",
      gallery: ["assets/projects/sungrind-architecture.png"],
      links: [
        { label: "Technical report (PDF)", url: "assets/projects/sungrind-technical-report.pdf" }
      ]
    },
    {
      title: "AI-Assisted Hydrogen Leak Detection and Localization",
      category: "Hydrogen",
      year: "2026",
      role: "Team leader · First Energy Hackathon 2026 (Ministry of Energy), top 35 of 1,200 teams",
      tools: ["Python", "scikit-learn (Random Forest)", "NumPy / Pandas", "Matplotlib", "Fiber Bragg grating physics"],
      summary: "Palladium-coated fiber-optic sensors combined with a Random Forest classifier that tells a real hydrogen leak apart from heat and pressure false alarms on a storage tank.",
      metrics: [
        { value: "97.6%", label: "Accuracy on 5,000 unseen signals" },
        { value: "20,000", label: "Simulated signals" },
        { value: "99.6%", label: "Correct when ≥95% confident" }
      ],
      problem: "Hydrogen ignites at 4–75% in air and is colourless and odourless. Palladium-coated fiber Bragg gratings can detect it, but the same sensor also reacts to temperature (~12 pm/°C) and tank-wall strain (~1.2 pm/µε), effects as large as a real leak (~33 pm per % H₂). A raw reading cannot tell them apart, which causes false alarms.",
      approach: "Instead of doubling the hardware with a reference sensor at every point, a machine-learning model reads the shape of one sensor's signal over two minutes. Heat is a slow ramp, pressure is a pulse that fades, and a real leak rises into a lasting plateau. Training data was generated from physics, with every constant taken from peer-reviewed measurements. The hydrogen response curve was digitised from published results, and the only two assumptions (strain range and 3 pm noise) were documented. The dataset grew from 2,000 to 20,000 labelled signals across leak, pressure, temperature and normal operation. Each 2-minute signal (31 readings, one every 4 s) is reduced to 8 shape features: overall, early and late slope, peak timing, fall-back ratio, and peak, final and average value. A Random Forest of 300 decision trees then votes on the cause. The model was trained on 15,000 signals and tested on 5,000 it had never seen. In the full system, several sensing points around the tank, biased toward the top and toward valves and welds, point to the probable leak zone.",
      results: "The final model is 97.6% correct on 5,000 unseen signals, and pressure events are recognised 100% of the time. The remaining confusion is between weak leaks and slow temperature rises, which look alike over a short window. Its confidence is honest: when it is ≥95% sure (4,093 signals) it is right 99.6% of the time, and when it is under 60% sure it is right only 57%, so a low-confidence answer works as a 'go and check' flag. It relies mostly on slopes and timing (the signal's shape) rather than size. It also classified 6/6 hand-written signals correctly and recognised a double pressure pulse it had never seen. Stress testing showed its honest limits: very faint leaks near the noise floor, and curved heat signals, which guide the next design iteration. These are simulated results; experimental validation with real hardware is the next step.",
      image: "assets/projects/h2-signal-shapes.png",
      gallery: ["assets/projects/h2-confusion-matrix.png", "assets/projects/h2-feature-importance.png"],
      links: [
        { label: "Technical report (PDF)", url: "assets/projects/hydrogen-leak-detection-report.pdf" },
        { label: "Python code + dataset (ZIP)", url: "assets/projects/hydrogen-leak-ai-code.zip" }
      ]
    },
    {
      title: "Hybrid PV–TEG System for Thermal Management and Energy Harvesting",
      category: "Solar",
      year: "2026",
      role: "Individual project · February – March 2026",
      tools: ["Ansys Workbench (Steady-State Thermal)", "MATLAB", "Finite element analysis", "Life-cycle economics"],
      summary: "A PV panel with a thermoelectric generator (TEG) layer underneath that turns waste heat into extra electricity while cooling the panel. Modelled in Ansys, with the economics in MATLAB.",
      metrics: [
        { value: "41.4 °C", label: "ΔT across the TEG" },
        { value: "1.047 V", label: "TEG output per module" },
        { value: "26 yr", label: "Payback (falls to ~9 yr with better cooling)" }
      ],
      problem: "PV panels release about 80% of incoming solar energy as heat. In hot, high-irradiance regions like Hail, Saudi Arabia, panel temperatures can pass 90 °C, which cuts electrical output and speeds up ageing.",
      approach: "I designed a 'sandwich' architecture with a TEG module of 127 bismuth telluride (Bi₂Te₃) couples between the PV layer and a heat sink, so the Seebeck effect harvests the temperature difference as heat flows out of the panel. I built a multi-layer finite element model in Ansys Workbench under a peak-stress scenario (1,000 W/m² solar flux, forced-air cooling h = 50 W/m²K). I then fed the thermal results into a custom MATLAB script for a 25-year economic model that counts both the TEG power and the 'cooling bonus' (efficiency the PV cell recovers by running cooler), with a sensitivity sweep on the cooling coefficient.",
      results: "The PV layer stabilised at 82.9 °C while the TEG cold side held 41.5 °C, a 41.4 °C driving difference that produces 1.047 V per module. Heat-flux analysis showed the 'thermal funnelling' effect, with heat from the wide panel concentrated through the narrow TEG legs. At h = 50 W/m²K the simple payback is 26 years, within the 25–30-year life of a solar plant. The sensitivity curve shows payback falling to about 9 years with stronger cooling (h = 250 W/m²K). Conclusion: viable today for residential and off-grid systems, where it protects the panel, but it needs lower material cost for utility scale, where investors expect 7–10-year returns.",
      image: "assets/projects/pv-teg-temperature.jpg",
      gallery: ["assets/projects/pv-teg-heat-flux.jpg", "assets/projects/pv-teg-payback.jpg"],
      links: [
        { label: "Technical report (PDF)", url: "assets/projects/pv-teg-report.pdf" }
      ]
    }
  ],

  /* ---------- Skills (group name → list) ---------- */
  skills: {
    "Simulation": ["MATLAB", "Simulink", "Ansys Multiphysics", "SAM (System Advisor Model)"],
    "Code & Data": ["Python", "NumPy", "Pandas", "scikit-learn", "Excel"],
    "Engineering": ["Solar PV", "Battery energy storage", "Hydrogen systems", "Combined-cycle power plants", "Power systems", "LCOE analysis", "Energy auditing", "Mineral processing"],
    "Professional": ["Team leadership", "Technical report writing", "Analytical problem solving", "Arabic (native) · English (professional)"]
  },

  /* ---------- Experience, education & awards (newest first) ---------- */
  timeline: [
    { when: "Jun — Aug 2026", title: "Summer Intern", place: "ACWA Power · Qurayyah Independent Power Plant (4 GW combined cycle)",
      text: "Worked across the mechanical, electrical, instrumentation, RO plant and electrolyser plant departments, observing gas turbines, HRSGs and steam turbines. Wrote technical reports on plant performance and maintenance, and managed spare-parts inventory and procurement for critical equipment.",
      link: { label: "Letter of recommendation (PDF)", url: "assets/recommendation-acwa-power.pdf" } },
    { when: "2026", title: "First Energy Hackathon: top 35 of 1,200 teams", place: "Ministry of Energy, Saudi Arabia",
      text: "Team leader. Project: AI-assisted hydrogen leak detection." },
    { when: "2026", title: "Future Minerals Pioneers", place: "Ministry of Industry and Mineral Resources",
      text: "Team leader. Project: SunGrind solar-timed comminution." },
    { when: "2022 — 2027", title: "BSc Renewable Energy Engineering (GPA 3.70 / 4.0)", place: "University of Ha'il, Saudi Arabia",
      text: "Power electronics, power systems, photovoltaic systems, thermodynamics, fluid mechanics, heat transfer, energy economics, energy efficiency. Also took part in the Hail Space Hackathon." }
  ]
};
