export interface OgRoute {
  path: string;
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  gradient: [string, string, string];
  subGradient: [string, string, string];
  ogTitle: string;
  ogDescription: string;
}

export const routes: OgRoute[] = [
  {
    path: "/",
    slug: "index",
    kicker: "Simulate. Learn. Create.",
    title: "MolCrafts",
    subtitle: "AI Infrastructure for Molecular Science",
    gradient: ["#03a3d7", "#8ce4ff", "#03a3d7"],
    subGradient: ["#10b981", "#1fc0f1", "#10b981"],
    ogTitle: "MolCrafts – AI Infrastructure for Molecular Science",
    ogDescription:
      "Open molecular software ecosystem spanning workflows, records, visualization, and scientific infrastructure.",
  },
  {
    path: "/molpy",
    slug: "molpy",
    kicker: "Built from Blocks.",
    title: "MolPy",
    subtitle: "A programmable Python toolkit for molecular modelling",
    gradient: ["#38bdf8", "#67e8f9", "#38bdf8"],
    subGradient: ["#60a5fa", "#93c5fd", "#60a5fa"],
    ogTitle: "MolPy – A programmable Python toolkit for molecular modelling",
    ogDescription: "Built from Blocks. Part of the MolCrafts open molecular software ecosystem.",
  },
  {
    path: "/molvis",
    slug: "molvis",
    kicker: "Shape What You See.",
    title: "MolVis",
    subtitle: "Interactive molecular visualization toolkit",
    gradient: ["#e879f9", "#f9a8d4", "#e879f9"],
    subGradient: ["#c084fc", "#e9d5ff", "#c084fc"],
    ogTitle: "MolVis – Interactive molecular visualization toolkit",
    ogDescription:
      "Shape What You See. Interactive 3D molecules — web, desktop, Jupyter. Part of MolCrafts.",
  },
  {
    path: "/molrec",
    slug: "molrec",
    kicker: "One shape for atomistic data.",
    title: "MolRec",
    subtitle: "A Backend-Neutral Record Specification for Atomistic Data",
    gradient: ["#fb923c", "#fde047", "#fb923c"],
    subGradient: ["#fbbf24", "#fcd34d", "#fbbf24"],
    ogTitle: "MolRec – A Backend-Neutral Record Specification for Atomistic Data",
    ogDescription:
      "One shape for atomistic data. A backend-neutral record spec. Part of MolCrafts.",
  },
  {
    path: "/molcfg",
    slug: "molcfg",
    kicker: "Configs without ceremony.",
    title: "MolCfg",
    subtitle: "Zero-Dependency Configuration Library for Python",
    gradient: ["#2dd4bf", "#67e8f9", "#2dd4bf"],
    subGradient: ["#34d399", "#6ee7b7", "#34d399"],
    ogTitle: "MolCfg – Zero-Dependency Configuration Library for Python",
    ogDescription:
      "Configs without ceremony. Layered config with source tracking. Part of MolCrafts.",
  },
  {
    path: "/mollog",
    slug: "mollog",
    kicker: "Logs that read like notebooks.",
    title: "MolLog",
    subtitle: "Zero-Dependency Structured Logging for Python",
    gradient: ["#22d3ee", "#5eead4", "#22d3ee"],
    subGradient: ["#38bdf8", "#7dd3fc", "#38bdf8"],
    ogTitle: "MolLog – Zero-Dependency Structured Logging for Python",
    ogDescription:
      "Logs that read like notebooks. Structured Python logging with zero dependencies. Part of MolCrafts.",
  },
  {
    path: "/molq",
    slug: "molq",
    kicker: "One queue, every cluster.",
    title: "MolQ",
    subtitle: "Unified Job Queue for Python Workloads",
    gradient: ["#fb7185", "#f0abfc", "#fb7185"],
    subGradient: ["#f472b6", "#f9a8d4", "#f472b6"],
    ogTitle: "MolQ – Unified Job Queue for Python Workloads",
    ogDescription:
      "One queue, every cluster. Local, SLURM, PBS, LSF behind one Python API. Part of MolCrafts.",
  },
  {
    path: "/molrs",
    slug: "molrs",
    kicker: "Rust speed. Python ease.",
    title: "MolRs",
    subtitle: "A molecular modeling toolkit with Rust and Python interfaces",
    gradient: ["#fb923c", "#fcd34d", "#fb923c"],
    subGradient: ["#f87171", "#fca5a5", "#f87171"],
    ogTitle: "MolRs – A molecular modeling toolkit with Rust and Python interfaces",
    ogDescription:
      "Rust speed. Python ease. Molecular kernel with Python, WASM, and C bindings. Part of MolCrafts.",
  },
  {
    path: "/molexp",
    slug: "molexp",
    kicker: "Workflow. Agents. Assets.",
    title: "MolExp",
    subtitle: "A workflow and agent platform for research experiments",
    gradient: ["#a78bfa", "#d8b4fe", "#a78bfa"],
    subGradient: ["#818cf8", "#a5b4fc", "#818cf8"],
    ogTitle: "MolExp – A workflow and agent platform for research experiments",
    ogDescription:
      "Workflow. Agents. Assets. Typed workflows and asset dedup for research. Part of MolCrafts.",
  },
  {
    path: "/molnex",
    slug: "molnex",
    kicker: "Composable ML for chemistry.",
    title: "MolNex",
    subtitle: "A molecular ML framework organized as four cooperating packages",
    gradient: ["#2dd4bf", "#6ee7b7", "#2dd4bf"],
    subGradient: ["#22d3ee", "#67e8f9", "#22d3ee"],
    ogTitle: "MolNex – A molecular ML framework organized as four cooperating packages",
    ogDescription:
      "Composable ML for chemistry. Training, representation, potentials, model zoo. Part of MolCrafts.",
  },
  {
    path: "/molpack",
    slug: "molpack",
    kicker: "Pack first. Simulate clean.",
    title: "MolPack",
    subtitle: "Extensible Initial-configuration Packing Package",
    gradient: ["#fbbf24", "#fdba74", "#fbbf24"],
    subGradient: ["#fb923c", "#fdba74", "#fb923c"],
    ogTitle: "MolPack – Extensible Initial-configuration Packing Package",
    ogDescription:
      "Pack first. Simulate clean. Packmol-grade engine — CLI, Rust crate, Python package. Part of MolCrafts.",
  },
];
