export enum ProjectType {
  WEB = "web",
  WEB2 = "web2",
  WEB3 = "web3",
  MOBILE = "mobile",
  GAME = "game",
  AI = "ai",
  OTHER = "other",
  SYSTEM = "system",
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
  image: string;
  type: ProjectType;
  tag: ProjectTag;
}

interface Personal {
  name: string;
  role: string;
  intro: string;
  about: string;
  avatar: string;
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

export interface PortfolioLink {
  platform: string;
  url: string;
  description: string;
  icon: string;
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

export interface Portfolio {
  personal: Personal;
  navigation: Navigation[];
  projects: Project[];
  jobs: Job[];
  portfolioLinks: PortfolioLink[];
}

const jobs: Job[] = [
  {
    title: "Game Developer",
    company: "Fizy Game",
    location: "Bornova, İzmir, Turkey",
    startDate: "Oct 2024",
    endDate: "Present",
    description: "Architecting multiplayer systems and high-performance game logic for industry-scale projects.",
  },
  {
    title: "Full Stack Developer",
    company: "EDUJİ R&D SOFTWARE",
    location: "Bornova, İzmir, Turkey",
    startDate: "Nov 2025",
    endDate: "Current",
    description: "Building robust enterprise web solutions with Laravel, React, and MySQL, focusing on scalable architecture.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "EDUJİ R&D SOFTWARE",
    location: "Bornova, İzmir, Turkey",
    startDate: "Aug 2025",
    endDate: "Aug 2025",
    description: "Engineered web features using the TALL stack and optimized database queries.",
  },
  {
    title: "Game Developer Intern",
    company: "Icarus Interactive",
    location: "İzmir, Turkey",
    startDate: "May 2024",
    endDate: "May 2024",
    description: "Deep-dived into engine internals and game design patterns using Unreal Engine and Unity.",
  },
  {
    title: "AR Software Developer",
    company: "TR Animals AR Map",
    location: "İzmir, Turkey",
    startDate: "Aug 2023",
    endDate: "Apr 2024",
    description: "Developed augmented reality mapping solutions for Teknofest using Godot and Unity.",
  },
];

const projects: Project[] = [
  {
    title: "Entropy",
    description: "A lightning-fast, 100% offline-first task and finance manager. Built with React Native and local SQLite for pure, distraction-free productivity.",
    techStack: ["JavaScript", "React Native", "SQLite", "Expo", "tamagui"],
    link: "https://github.com/BombaStudio/entropy",
    image: "/meowstick.png",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Talu Engine",
    description: "A custom high-performance game engine built from scratch. Focuses on low-level memory management and custom shader pipelines.",
    techStack: ["Wolflang", "C++", "OpenGL", "System Design", "Shader Programming"],
    link: "https://github.com/BombaStudio/talu",
    image: "/talu.png",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Monadistan",
    description: "Decentralized Web3 game store and distribution platform built for high-stakes hackathon competition on the Monad EVM blockchain.",
    techStack: ["Next.js", "Solidity", "Web3.js", "EVM", "Smart Contracts"],
    link: "https://github.com/BombaStudio/monadistan",
    image: "/monadistan.png",
    type: ProjectType.WEB3,
    tag: ProjectTag.HACKATHON,
  },
  {
    title: "MeowStick: Tarot & AI",
    description: "AI-powered occult analysis and tarot reading mobile application with custom trained LLM integration.",
    techStack: ["Flutter", "Dart", "Deno", "Supabase", "AI/ML", "Large Language Models"],
    link: "https://play.google.com/store/apps/details?id=com.emirozturk.meowstick",
    image: "/meowstick.png",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Ethuzzle",
    description: "A decentralized puzzle platform implemented on the Ethereum blockchain, focusing on on-chain logic.",
    techStack: ["Solidity", "Web3.js", "Ethers.js", "React", "Ethereum"],
    link: "https://github.com/BombaStudio/ethuzzle",
    image: "/ethuzzle.png",
    type: ProjectType.WEB3,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Bloody Cherry",
    description: "A fast-paced roguelike survival shooter where players collect cherries while battling waves of enemies.",
    techStack: ["GDevelop", "JavaScript", "Game Design", "2D Physics"],
    link: "https://gd.games/giantprogrammer/sutlu-shooter",
    image: "/bloody-cherry.png",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Pike",
    description: "A challenging action-adventure game with solid core mechanics, developed during a game jam.",
    techStack: ["Unity", "C#", "Game Jam", "Gameplay Programming"],
    link: "https://giantprogrammer.itch.io/pike",
    image: "/pike.png",
    type: ProjectType.GAME,
    tag: ProjectTag.DEMO,
  },
  {
    title: "Last Mission for Santa",
    description: "A holiday-themed adventure game featuring custom mechanics and festive level design.",
    techStack: ["Godot", "GDScript", "Action", "Level Design"],
    link: "https://github.com/BombaStudio/last-mission-for-santa",
    image: "/santa.png",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Wolflang",
    description: "A custom lightweight compiled scripting language and compiler designed for low-level performance and scripting inside Talu Engine.",
    techStack: ["C++", "Compiler Design", "Language Specification", "Lexer/Parser"],
    link: "https://github.com/BombaStudio/wolflang",
    image: "/talu.png",
    type: ProjectType.SYSTEM,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Saadet Müge",
    description: "An interactive visual narrative and adventure game featuring hand-drawn custom illustrations and multi-branch story paths.",
    techStack: ["Unity", "C#", "UI/UX Design", "Game Design", "Figma"],
    link: "https://giantprogrammer.itch.io/saadet-muge",
    image: "/saadetmuge.png",
    type: ProjectType.GAME,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "TR Animals AR Map",
    description: "An augmented reality mapping and educational application tracking wildlife distributions in Turkey, developed for the Teknofest competition.",
    techStack: ["Godot", "Unity", "C#", "ARCore", "Mobile Development"],
    link: "https://github.com/BombaStudio",
    image: "/globe.svg",
    type: ProjectType.MOBILE,
    tag: ProjectTag.HACKATHON,
  },
];

const portfolioLinks: PortfolioLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/BombaStudio",
    description: "Raw source code",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/emir-ozturk-dev",
    description: "Professional network",
    icon: "linkedin",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/@GiantProgrammer",
    description: "Devlogs & Engineering",
    icon: "youtube",
  },
  {
    platform: "itch.io",
    url: "https://giantprogrammer.itch.io",
    description: "Indie games",
    icon: "itchio",
  },
  {
    platform: "Taikai",
    url: "https://taikai.network/emirozturk",
    description: "Hackathon achievements",
    icon: "taikai",
  },
  {
    platform: "Google Play Store",
    url: "https://play.google.com/store/apps/dev?id=9083417276421261563",
    description: "Mobile apps",
    icon: "googleplay",
  },
];

const navs: Navigation[] = [
  { name: "MANIFESTO", href: "/" },
  { name: "ENGINEERING", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

export const portfolio: Portfolio = {
  personal: {
    name: "Emir Öztürk",
    role: "Physics Student & Hardcore Developer",
    intro: "I treat coding like writing an underground rap verse—raw, impactful, and built to solve real pain.",
    about: "I'm Emir Öztürk. Physics student by day, full-stack architect and game engine creator by night. I don't build generic solutions; I engineer systems that handle the chaos. Whether it's a custom game engine or a decentralized Web3 platform, I code with a 'raw' philosophy: no bloat, just performance and impact.",
    avatar: "/avatar.png",
    contact: {
      email: "emirozturk788@gmail.com",
      github: "https://github.com/BombaStudio",
      linkedin: "https://www.linkedin.com/in/emir-ozturk-dev/",
      twitter: "https://x.com/GiantProgrammer",
      youtube: "https://youtube.com/@GiantProgrammer",
      reddit: "https://www.reddit.com/user/itsmethedev/",
      itchio: "https://giantprogrammer.itch.io/",
      taikai: "https://taikai.network/emirozturk",
      playstore: "https://play.google.com/store/apps/dev?id=9083417276421261563",
    },
  },
  navigation: navs,
  projects: projects,
  jobs: jobs,
  portfolioLinks: portfolioLinks,
};
