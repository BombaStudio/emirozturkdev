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
}

interface Personal {
  name: string;
  role: string;
  intro: string;
  about: string;
  location: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    youtube?: string;
    reddit?: string;
    itchio?: string;
    taikai?: string;
    playstore?: string;
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

export interface Portfolio {
  personal: Personal;
  navigation: Navigation[];
  projects: Project[];
  jobs: Job[];
  education: Education[];
  skills: SkillCategory[];
}

const jobs: Job[] = [
  {
    title: "Full Stack Developer",
    company: "EDUJİ R&D SOFTWARE",
    location: "İzmir, Turkey",
    startDate: "Nov 2025",
    endDate: "Present",
    description:
      "Building enterprise web solutions with Laravel, React, and MySQL. Architecting scalable backend systems and optimizing database performance.",
  },
  {
    title: "Game Developer",
    company: "Fizy Game",
    location: "İzmir, Turkey",
    startDate: "Oct 2024",
    endDate: "Present",
    description:
      "Designing multiplayer systems and high-performance game logic for production-scale projects.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "EDUJİ R&D SOFTWARE",
    location: "İzmir, Turkey",
    startDate: "Aug 2025",
    endDate: "Aug 2025",
    description:
      "Developed web features using the TALL stack (Tailwind, Alpine.js, Laravel, Livewire) and optimized SQL queries.",
  },
  {
    title: "Game Developer Intern",
    company: "Icarus Interactive",
    location: "İzmir, Turkey",
    startDate: "May 2024",
    endDate: "May 2024",
    description:
      "Explored engine internals and game design patterns using Unreal Engine and Unity.",
  },
  {
    title: "AR Software Developer",
    company: "TR Animals AR Map",
    location: "İzmir, Turkey",
    startDate: "Aug 2023",
    endDate: "Apr 2024",
    description:
      "Developed augmented reality mapping solutions for Teknofest competition using Godot and Unity.",
  },
];

export const projects: Project[] = [
  {
    title: "Talu Engine",
    description:
      "A professional-grade 2D game engine built with Rust, scripted using WolfLang. Features modular architecture, built-in physics, and real-time error handling.",
    techStack: ["Rust", "WolfLang"],
    link: "https://github.com/BombaStudio/Talu",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Entropy",
    description:
      "Offline-first task and finance manager built with React Native and local SQLite for distraction-free productivity.",
    techStack: ["TypeScript", "React Native", "SQLite"],
    link: "https://github.com/BombaStudio/Entropy",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Cozy UI",
    description:
      "A friendly and accessible component library with a hand-drawn feel for the modern web.",
    techStack: ["TypeScript", "React"],
    link: "https://github.com/BombaStudio/cozy-ui",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "AgentFlow",
    description: "AI-powered agent workflow automation platform.",
    techStack: ["TypeScript", "Next.js"],
    link: "https://github.com/BombaStudio/agentflow",
    type: ProjectType.AI,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "FocusFlow",
    description: "Productivity-focused web application for deep work sessions.",
    techStack: ["TypeScript", "React"],
    link: "https://github.com/BombaStudio/focusflow",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Monadistan",
    description: "Web3 decentralized platform built on blockchain technology.",
    techStack: ["TypeScript", "Solidity"],
    link: "https://github.com/BombaStudio/monadistan",
    type: ProjectType.WEB3,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Ethuzzle",
    description: "Ethereum-based smart contract puzzle game.",
    techStack: ["Solidity", "Web3"],
    link: "https://github.com/BombaStudio/ethuzzle",
    type: ProjectType.WEB3,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "ABUGAT NFT",
    description: "Smart contract for NFT minting on the Move blockchain.",
    techStack: ["Move", "Web3"],
    link: "https://github.com/BombaStudio/ABUGAT_NFT",
    type: ProjectType.WEB3,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Acil Eczane Bul",
    description:
      "Emergency pharmacy finder for late-night medical needs in Turkey.",
    techStack: ["PHP", "Laravel", "Blade"],
    link: "https://github.com/BombaStudio/acileczanebul",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Çiçek Terapi",
    description: "Full-stack web application for a flower therapy business.",
    techStack: ["TypeScript", "Next.js"],
    link: "https://github.com/BombaStudio/cicekterapi",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Note2Me",
    description: "A simple personal mood/emotion diary application.",
    techStack: ["TypeScript", "React"],
    link: "https://github.com/BombaStudio/note2me",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Lorenz Attractor",
    description:
      "Lorenz Attractor chaos simulation built in both Unity and Godot.",
    techStack: ["C#", "GDScript", "Unity", "Godot"],
    link: "https://github.com/BombaStudio/Lorenz-Attractor",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "RealityIsDream",
    description: "WebGL-based first-person shooter game built with Unity.",
    techStack: ["C#", "Unity", "WebGL"],
    link: "https://github.com/BombaStudio/RealityIsDream",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Only Car",
    description: "A casual car derby game.",
    techStack: ["C#", "Unity"],
    link: "https://github.com/BombaStudio/Only-Car",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Pike",
    description: "Action game project built with Unity.",
    techStack: ["C#", "Unity"],
    link: "https://github.com/BombaStudio/Pike",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Last Mission for Santa",
    description: "Holiday-themed game built with Godot engine.",
    techStack: ["GDScript", "Godot"],
    link: "https://github.com/BombaStudio/last-mission-for-santa",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Geveze Engine",
    description: "Custom engine for Android Studio applications.",
    techStack: ["Java", "Android"],
    link: "https://github.com/BombaStudio/Geveze-Engine",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Koruma",
    description: "Mobile security application built with Dart/Flutter.",
    techStack: ["Dart", "Flutter"],
    link: "https://github.com/BombaStudio/koruma",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Multicamp",
    description: "Mobile application built with Kotlin.",
    techStack: ["Kotlin", "Android"],
    link: "https://github.com/BombaStudio/Multicamp",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Dose Search",
    description: "Google dork scanner tool for security research.",
    techStack: ["Python"],
    link: "https://github.com/BombaStudio/dose-search--dork-scanner-",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "RabbitPress",
    description: "WordPress vulnerability scanner tool.",
    techStack: ["Python"],
    link: "https://github.com/BombaStudio/rabbitpress",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Hürrem Bot",
    description: "Automated bot built with Python.",
    techStack: ["Python"],
    link: "https://github.com/BombaStudio/hyrrem-bot",
    type: ProjectType.OTHER,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "FChan",
    description: "System-level project built with C++.",
    techStack: ["C++"],
    link: "https://github.com/BombaStudio/FChan",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "WorkflowTest",
    description: "Go-based workflow testing tool.",
    techStack: ["Go"],
    link: "https://github.com/BombaStudio/workflowtest",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
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
    ],
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
      youtube: "https://youtube.com/@GiantProgrammer",
      reddit: "https://www.reddit.com/user/itsmethedev/",
      itchio: "https://giantprogrammer.itch.io/",
      taikai: "https://taikai.network/emirozturk",
      playstore:
        "https://play.google.com/store/apps/dev?id=9083417276421261563",
    },
  },
  navigation: navs,
  projects: projects,
  jobs: jobs,
  education: education,
  skills: skills,
};
