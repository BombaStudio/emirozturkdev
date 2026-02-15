enum ProjectType {
    WEB = "web",
    MOBILE = "mobile",
    GAME = "game",
    AI = "ai",
    OTHER = "other",
}

enum ProjectTag {
  PROJECT = "project",
  JOB = "job",
  DEMO = "demo",
}

interface Project {
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
    avatar: string;
    contact: {
        email: string;
        github: string;
        linkedin: string;
        twitter: string;
    };
}

interface Navigation {
    name: string;
    href: string;
}
interface Job {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Portfolio {
    personal: Personal;
    navigation: Navigation[];
    projects: Project[];
    jobs: Job[];
}



const jobs: Job[] = [
  {
    title: "Game Developer",
    company: "Fizy Game",
    location: "Bornova, İzmir, Turkey",
    startDate: "Oct 2024",
    endDate: "Present",
    description: "Working on multiplayer games and gaming industry projects using Unity.",
  },
  {
    title: "Full Stack Developer",
    company: "EDUJİ R&D SOFTWARE DESIGN AND CONSULTANCY INC.",
    location: "Bornova, İzmir, Turkey",
    startDate: "Nov 2025",
    endDate: "current",
    description: "Developed web applications using JavaScript, MySQL, Laravel, Tailwind CSS, PHP, and React.js.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "EDUJİ R&D SOFTWARE DESIGN AND CONSULTANCY INC.",
    location: "Bornova, İzmir, Turkey",
    startDate: "Aug 2025",
    endDate: "Aug 2025",
    description: "Internship focused on web development with Tailwind CSS, Laravel, and PHP.",
  },
  {
    title: "Game Developer Intern",
    company: "Icarus Interactive Entertainment",
    location: "İzmir, Turkey (Remote)",
    startDate: "May 2024",
    endDate: "May 2024",
    description: "Gained experience in game development, design, and industry practices using Unreal Engine and Unity.",
  },
  {
    title: "Augmented Reality Software Developer",
    company: "TR Animals AR Map",
    location: "İzmir, Turkey",
    startDate: "Aug 2023",
    endDate: "Apr 2024",
    description: "Developed AR applications using Godot and Unity for Teknofest.",
  },
];

const projects: Project[] = [
  {
    title: "Saadet Müge Öztürk",
    description: "A portfolio website for Saadet Müge Öztürk",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    link: "https://saadetmuge.vercel.app/",
    image: "/saadetmuge.png",
    type: ProjectType.WEB,
    tag: ProjectTag.JOB,
  },
  {
    title: "MeowStick: Tarot & AI",
    description: "AI Based Tarot Card Reading Application",
    techStack: ["Flutter", "Deno", "PostgreSQL", "Supabase"],
    link: "https://play.google.com/store/apps/details?id=com.emirozturk.meowstick",
    image: "/meowstick.png",
    type: ProjectType.MOBILE,
    tag: ProjectTag.PROJECT,
  },
  {
    title: "Ethuzzle",
    description: "Buying a part of the image and you can see the all buyed parts like a puzzle",
    techStack: ["React", "Solidity", "Firebase"],
    link: "#",
    image: "/ethuzzle.png",
    type: ProjectType.WEB,
    tag: ProjectTag.PROJECT,
  },
];


const navs: Navigation[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  //{ name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const portfolio: Portfolio = {
  personal: <Personal>{
    name: "Emir Öztürk",
    role: "Software Developer",
    intro: "Emir Öztürk",
    avatar: "/avatar.png", // specific avatar path can be updated later
    contact: {
      email: "emirozturk788@gmail.com",
      github: "https://github.com/bombastudio",
      linkedin: "https://linkedin.com/in/emir-ozturk-dev",
      twitter: "https://twitter.com/GiantProgrammer",
    },
  },
  navigation: navs,
  projects: projects,
  jobs: jobs,
};


