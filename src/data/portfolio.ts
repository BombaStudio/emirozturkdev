export enum ProjectType {
  WEB = "web",
  MOBILE = "mobile",
  GAME = "game",
  AI = "ai",
  SYSTEM = "system",
  WEB3 = "web3",
  OTHER = "other",
}

export enum ProjectTag {
  PROJECT = "project",
  JOB = "job",
  DEMO = "demo",
  HACKATHON = "hackathon",
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  type: ProjectType;
  tag: ProjectTag;
  date?: string;
}

interface Personal {
  name: string;
  role: string;
  intro: string;
  about: string;
  location: string;
  contact: {
    email: string;
    phone?: string;
    github: string;
    linkedin: string;
    twitter: string;
    youtube?: string;
    reddit?: string;
    itchio?: string;
    taikai?: string;
    playstore?: string;
    orcid?: string;
    hackquest?: string;
    tryhackme?: string;
    gdev?: string;
    gdgames?: string;
  };
}

interface Navigation {
  name: string;
  href: string;
}

export interface Job {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Publication {
  title: string;
  journal: string;
  date: string;
  doi?: string;
  doiUrl?: string;
  url?: string;
  advisor?: string;
  type: string;
  description: string;
}

export interface Portfolio {
  personal: Personal;
  navigation: Navigation[];
  projects: Project[];
  jobs: Job[];
  education: Education[];
  skills: SkillCategory[];
  publications: Publication[];
}

const jobs: Job[] = [
  {
    title: "Full Stack Developer",
    company: "EDUJİ R&D SOFTWARE",
    location: "İzmir, Turkey",
    startDate: "Oct 2025",
    endDate: "Jun 2026",
    description:
      "• Developed Erasmus+ modular educational platforms and luxury transfer reservation system with driver navigation and admin dispatch.\n• Architected backend microservices and optimized complex MySQL database queries, improving query response times by 35%.\n• Designed RESTful APIs to facilitate seamless integration between front-end interfaces and data storage layers.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "EDUJİ R&D SOFTWARE",
    location: "İzmir, Turkey",
    startDate: "Aug 2025",
    endDate: "Aug 2025",
    description:
      "• Built Revenue Administration (GİB)-integrated e-invoice portal from scratch (generate, view, print, edit) and integrated BigBlueButton with calendar scheduling.\n• Developed modular UI components using the TALL stack (Tailwind, Alpine.js, Laravel, Livewire) for enterprise software products.\n• Refactored database schemas and optimized SQL queries, reducing page load latency by 20%.",
  },
  {
    title: "Game Developer",
    company: "Fizy Game",
    location: "İzmir, Turkey",
    startDate: "Oct 2024",
    endDate: "Present",
    description:
      "• Engineered real-time multiplayer systems and high-performance gameplay mechanics for production-scale gaming environments.\n• Optimized physics simulations and graphics pipeline performance, yielding a stable 60 FPS target across mobile and WebGL platforms.\n• Implemented state-synchronization protocols to minimize latency and ensure consistent multiplayer client state.",
  },
  {
    title: "Game Developer Intern",
    company: "Icarus Interactive",
    location: "İzmir, Turkey",
    startDate: "May 2024",
    endDate: "Jun 2024",
    description:
      "• Developed Unreal Engine 5 virtual reconstruction demo of Ephesus and Agora ancient sites for the Ministry of Culture and Tourism.\n• Investigated game engine internals and design patterns inside Unity and Unreal Engine to optimize memory allocation and resource loading.\n• Formulated technical documentation for custom shader implementations and scripting engine configurations.",
  },
  {
    title: "AR Software Developer",
    company: "TR Animals AR Map",
    location: "İzmir, Turkey",
    startDate: "Aug 2023",
    endDate: "Apr 2024",
    description:
      "• Developed augmented reality (AR) interactive maps for a national competition (Teknofest 2023 Ankara Finalist) using Unity, Godot, and specialized AR SDKs.\n• Designed high-performance spatial mapping algorithms to coordinate 3D asset rendering with geographic coordinate systems.\n• Achieved finalist standing in the competition category through robust software architecture and interactive UI designs.",
  },
];

export const projects: Project[] = [
  // 2026
  {
    title: "BrainHeal",
    description:
      "Native Android productivity and mental wellness app built with Jetpack Compose, Room, and Coroutines. Includes daily planning, habit tracking, and local encrypted notes.",
    techStack: ["Kotlin", "Jetpack Compose", "Android", "Room", "Coroutines"],
    link: "https://github.com/BombaStudio/BrainHeal",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
    date: "2026",
  },
  {
    title: "CoupleTest",
    description:
      "Mobile relationship quiz application built with React Native and Supabase. Features customizable couple quizzes generated via custom LLM prompts and real-time score syncing.",
    techStack: ["TypeScript", "React Native", "Supabase", "LLM"],
    link: "https://github.com/BombaStudio/CoupleTest",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
    date: "2026",
  },
  {
    title: "Meowstick",
    description:
      "AI based tarot app built with Flutter and Supabase backend. Features tarot card readings with AI-powered interpretations and personalized guidance for users seeking spiritual insights.",
    techStack: ["TypeScript", "Dart", "Flutter", "PostgreSQL", "Supabase"],
    link: "https://play.google.com/store/apps/details?id=com.emirozturk.meowstick&hl=en_US",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
    date: "2026",
  },
  {
    title: "Entropy",
    description:
      "Offline-first task and finance manager built with React Native and local SQLite for distraction-free productivity.",
    techStack: ["TypeScript", "React Native", "SQLite"],
    link: "https://github.com/BombaStudio/Entropy",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
    date: "2026",
  },

  // 2024
  {
    title: "Whale Whisper",
    description:
      "Web3 AI DeFi platform built for OKX Hackathon. Features real-time whale transaction tracking, portfolio rebalancing agents, and on-chain analytics using Alchemy.",
    techStack: ["TypeScript", "Next.js", "Alchemy", "Web3", "Tailwind CSS"],
    link: "https://whalewhisper.vercel.app/",
    type: ProjectType.WEB3,
    tag: ProjectTag.HACKATHON,
    date: "2024",
  },
  {
    title: "Dedective Coni",
    description:
      "AI suspect interrogation game developed for Google Gemini API Developer Competition 2024. Features a Go backend, dynamic LLM prompt orchestration, and interactive web UI.",
    techStack: ["Go", "Gemini API", "JavaScript", "HTML/CSS"],
    link: "https://github.com/BombaStudio/Dedective-Coni",
    type: ProjectType.AI,
    tag: ProjectTag.PROJECT,
    date: "2024",
  },
  {
    title: "Last Mission for Santa",
    description:
      "Holiday-themed roguelike action game developed with Godot Engine. Won 1st Place at ArgeJam 2024 game jam.",
    techStack: ["GDScript", "Godot"],
    link: "https://github.com/BombaStudio/last-mission-for-santa",
    type: ProjectType.GAME,
    tag: ProjectTag.HACKATHON,
    date: "2024",
  },
  {
    title: "Monadistan",
    description: "Web3 decentralized platform built on blockchain technology for Monad Blitz hackathon.",
    techStack: ["TypeScript", "Next.js", "Solidity", "Web3"],
    link: "https://github.com/BombaStudio/monadistan",
    type: ProjectType.WEB3,
    tag: ProjectTag.HACKATHON,
    date: "2024",
  },
  {
    title: "Ethuzzle",
    description: "Ethereum-based smart contract puzzle game for ETH Istanbul 10th anniversary hackathon.",
    techStack: ["Solidity", "React", "Firebase", "Web3"],
    link: "https://github.com/BombaStudio/ethuzzle",
    type: ProjectType.WEB3,
    tag: ProjectTag.HACKATHON,
    date: "2024",
  },
  {
    title: "ABUGAT NFT",
    description: "Smart contract for NFT minting on the Sui Move blockchain.",
    techStack: ["Move", "Web3"],
    link: "https://github.com/BombaStudio/ABUGAT_NFT",
    type: ProjectType.WEB3,
    tag: ProjectTag.PROJECT,
    date: "2024",
  },
  {
    title: "Acil Eczane Bul",
    description:
      "Emergency pharmacy finder with navigation integration for late-night medical needs in Turkey.",
    techStack: ["PHP", "Laravel", "Blade"],
    link: "https://github.com/BombaStudio/acileczanebul",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
    date: "2024",
  },
  {
    title: "Cozy UI",
    description:
      "A friendly and accessible component library with a hand-drawn feel for the modern web.",
    techStack: ["TypeScript", "React"],
    link: "https://github.com/BombaStudio/cozy-ui",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
    date: "2024",
  },

  // 2023
  {
    title: "Talu Engine",
    description:
      "A 2D game engine built with Rust, scripted using WolfLang. Features custom physics engine, input system, and modular architecture.",
    techStack: ["Rust", "WolfLang"],
    link: "https://github.com/BombaStudio/Talu",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
    date: "2023",
  },
  {
    title: "The Pain In 3 Days",
    description:
      "Post-earthquake survival and resource management simulation game built with Godot Engine. Awarded 4th Place at DAF Jam 2023.",
    techStack: ["GDScript", "Godot"],
    link: "https://github.com/BombaStudio/The-Pain-In-3-Days",
    type: ProjectType.GAME,
    tag: ProjectTag.HACKATHON,
    date: "2023",
  },
  {
    title: "Lorenz Attractor",
    description:
      "Lorenz Attractor chaos simulation and numerical visualization built in both Unity and Godot.",
    techStack: ["C#", "GDScript", "Unity", "Godot"],
    link: "https://github.com/BombaStudio/Lorenz-Attractor",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
    date: "2023",
  },

  // 2022
  {
    title: "RealityIsDream",
    description: "WebGL-based endless survival shooter game built with Unity for DevFest İzmir 2022.",
    techStack: ["C#", "Unity", "WebGL"],
    link: "https://github.com/BombaStudio/RealityIsDream",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
    date: "2022",
  },

  // 2021
  {
    title: "Only Car",
    description: "Casual demolition derby arena survival game built with Unity and Blender 3D models.",
    techStack: ["C#", "Unity", "Blender"],
    link: "https://github.com/BombaStudio/Only-Car",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "Pike",
    description: "Action game project built with Unity for Jamination 6 game jam.",
    techStack: ["C#", "Unity"],
    link: "https://github.com/BombaStudio/Pike",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "Geveze Engine",
    description: "Custom UI and dialogue engine component for Android applications.",
    techStack: ["Java", "Android"],
    link: "https://github.com/BombaStudio/Geveze-Engine",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "Koruma",
    description: "Mobile security and permission auditing application built with Dart and Flutter.",
    techStack: ["Dart", "Flutter"],
    link: "https://github.com/BombaStudio/koruma",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "Multicamp",
    description: "Mobile application prototype built with Kotlin for Android.",
    techStack: ["Kotlin", "Android"],
    link: "https://github.com/BombaStudio/Multicamp",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "Dose Search",
    description: "Automated search dork scanner tool for security research.",
    techStack: ["Python"],
    link: "https://github.com/BombaStudio/dose-search--dork-scanner-",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "RabbitPress",
    description: "WordPress security vulnerability scanner tool.",
    techStack: ["Python"],
    link: "https://github.com/BombaStudio/rabbitpress",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "Hürrem Bot",
    description: "Automated community moderation bot built with Python.",
    techStack: ["Python"],
    link: "https://github.com/BombaStudio/hyrrem-bot",
    type: ProjectType.OTHER,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
  {
    title: "FChan",
    description: "Multiplayer third-person game prototype built with Unreal Engine 4 and C++.",
    techStack: ["C++", "Unreal Engine"],
    link: "https://github.com/BombaStudio/FChan",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
    date: "2021",
  },
];

const education: Education[] = [
  {
    degree: "B.Sc. in Physics",
    institution: "Ege University",
    location: "İzmir, Turkey",
    startDate: "2022",
    endDate: "Present",
  },
];

const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Rust",
      "C#",
      "C++",
      "Go",
      "Java",
      "Kotlin",
      "Dart",
      "PHP",
      "Solidity",
      "GDScript",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Laravel", "Express.js", "MySQL", "SQLite", "MongoDB"],
  },
  {
    category: "Game Dev",
    items: ["Unity", "Unreal Engine", "Godot", "Custom Engines (Talu)"],
  },
  {
    category: "Tools & Other",
    items: [
      "Git",
      "Docker",
      "Firebase",
      "Vercel",
      "Linux",
      "AR/VR",
      "Web3",
      "Flutter",
      "Jetpack Compose",
      "Supabase",
      "Alchemy",
    ],
  },
];

export const publications: Publication[] = [
  {
    title: "Computational Simulation of Gold-Doped Water-Based Nanofluids",
    journal: "Applied Nano (MDPI)",
    date: "Nov 2026",
    doi: "10.3390/applnano7040037",
    doiUrl: "https://doi.org/10.3390/applnano7040037",
    advisor: "Assoc. Prof. Dr. Emine Mine Çapar",
    type: "Peer-Reviewed Journal Article",
    description:
      "• Conducted computational simulations and thermal conductivity modeling of gold-doped water nanofluids under TÜBİTAK 2209-A University Students Research Project.\n• Presented research findings via poster presentation at the 2024 Turkish Physical Society (TFD) International Physics Congress.\n• Published open-access research evaluating nanoparticle volume fraction effects on nanofluid thermophysical properties.",
  },
  {
    title: "Numerical Analysis of Non-Linear Dynamical Systems: Lorenz Attractor Chaos Simulation",
    journal: "Computational Physics Research",
    date: "2024",
    url: "https://github.com/BombaStudio/Lorenz-Attractor",
    type: "Physics Simulation & Numerical Analysis",
    description:
      "• Computational study investigating sensitivity to initial conditions and strange attractor geometry in 3D autonomous ordinary differential equation systems using Runge-Kutta numerical integration.\n• Implemented real-time interactive parameter manipulation and chaotic trajectory visualizations in Unity and Godot.",
  },
  {
    title: "Deterministic Physics and Modular Memory Architectures in 2D Game Engines Using Rust",
    journal: "Technical Symposium Presentation",
    date: "2024",
    url: "https://github.com/BombaStudio/Talu",
    type: "Computer Science & Engine Architecture",
    description:
      "• Technical symposium presentation examining zero-cost abstractions, data-oriented memory layouts, and bytecode interpreter execution in custom engine development (Talu Engine).\n• Designed fixed-timestep deterministic 2D physics integration pipeline and custom scripting language (WolfLang).",
  },
];

const navs: Navigation[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export const portfolio: Portfolio = {
  personal: {
    name: "Emir Öztürk",
    role: "Software Developer & Physics Student",
    intro:
      "I build software that solves real problems — from game engines to full-stack web platforms.",
    about:
      "Physics student at Ege University and software developer with experience across game development, full-stack web applications, and blockchain. I've built custom game engines in Rust, enterprise web solutions with Laravel and React, and AR applications for national competitions. I focus on clean architecture and high-performance systems.",
    location: "İzmir, Turkey",
    contact: {
      email: "emirozturk788@gmail.com",
      github: "https://github.com/BombaStudio",
      linkedin: "https://www.linkedin.com/in/emir-ozturk-dev/",
      twitter: "https://x.com/GiantProgrammer",
      youtube: "https://www.youtube.com/@codingyourpain",
      reddit: "https://www.reddit.com/user/itsmethedev/",
      itchio: "https://giantprogrammer.itch.io",
      taikai: "https://taikai.network/emirozturk",
      playstore:
        "https://play.google.com/store/apps/dev?id=9083417276421261563",
      orcid: "https://orcid.org/0009-0006-8181-7320",
      hackquest: "https://www.hackquest.io/user/2443741",
      tryhackme: "https://tryhackme.com/p/R1ch4rd48",
      gdev: "https://g.dev/emirozturkdev",
      gdgames: "https://gd.games/giantprogrammer",
    },
  },
  navigation: navs,
  projects: projects,
  jobs: jobs,
  education: education,
  skills: skills,
  publications: publications,
};
