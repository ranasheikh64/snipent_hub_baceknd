export interface CommunityItem {
  id: string;
  name: string;
  slug: string;
  hashtag: string;
  description: string;
  icon: string;
  creatorName: string;
  membersCount: number;
  members?: string[];
  snippetsCount: number;
}

export const initialCommunities: CommunityItem[] = [
  {
    id: "comm-flutter-devs",
    name: "Flutter Artisans & Mobile",
    slug: "flutter-artisans",
    hashtag: "#flutter-artisans",
    description: "The community for clean Flutter widgets, Bloc/GetX patterns, and native iOS/Android bridge code.",
    icon: "💙",
    creatorName: "Rana Sheikh",
    membersCount: 42,
    members: ["rana@devvault.com"],
    snippetsCount: 18,
  },
  {
    id: "comm-backend-ninjas",
    name: "Fullstack & Backend Ninjas",
    slug: "backend-ninjas",
    hashtag: "#backend-ninjas",
    description: "Production Node.js, Express, Go, Python, and MongoDB database architecture snippets.",
    icon: "⚡",
    creatorName: "Dev Team",
    membersCount: 29,
    members: ["rana@devvault.com"],
    snippetsCount: 12,
  },
  {
    id: "comm-web-masters",
    name: "Next.js & React Masters",
    slug: "nextjs-react-masters",
    hashtag: "#nextjs-react-masters",
    description: "Custom hooks, modern Tailwind designs, server actions, and frontend UI components.",
    icon: "⚛️",
    creatorName: "Dev Team",
    membersCount: 35,
    members: ["rana@devvault.com"],
    snippetsCount: 15,
  },
  {
    id: "comm-python-hub",
    name: "Python & Machine Learning Hub",
    slug: "python-ml-hub",
    hashtag: "#python-ml-hub",
    description: "FastAPI endpoints, PyTorch utilities, data preprocessing pipelines, and clean scripts.",
    icon: "🐍",
    creatorName: "Rana Sheikh",
    membersCount: 24,
    members: ["rana@devvault.com"],
    snippetsCount: 9,
  },
];
