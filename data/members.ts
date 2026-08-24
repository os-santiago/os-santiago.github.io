export type Member = {
  userId: string;
  displayName: string;
  github: string;
  role: string;
  profileUrl: string;
  avatarUrl: string;
  joinedAt: string;
};

export const members: Member[] = [
  {
    userId: "scanalesespinoza",
    displayName: "Sergio Canales",
    github: "scanalesespinoza",
    role: "admin",
    profileUrl: "https://github.com/scanalesespinoza",
    avatarUrl: "https://avatars.githubusercontent.com/u/11546953?v=4",
    joinedAt: "2025-12-15T00:10:12.303720Z",
  },
  {
    userId: "axel-damage",
    displayName: "Axel (D4MAG3)",
    github: "axel-damage",
    role: "admin",
    profileUrl: "https://github.com/axel-damage",
    avatarUrl: "https://avatars.githubusercontent.com/u/178504369?v=4",
    joinedAt: "2025-12-17T21:21:01.742Z",
  },
];
