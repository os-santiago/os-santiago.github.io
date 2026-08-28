import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const ORG = "os-santiago";
let GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

if (!GITHUB_TOKEN) {
  try {
    GITHUB_TOKEN = execSync("gh auth token", { encoding: "utf-8" }).trim();
  } catch {
    // ignore if gh is not installed or logged in
  }
}

const headers = {
  "User-Agent": "os-santiago-member-sync",
  Accept: "application/vnd.github.v3+json",
};

if (GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

const KNOWN_ROLES = {
  scanalesespinoza: "admin",
  "axel-damage": "admin",
  d4mag3: "admin",
  "noxtope-git": "moderator",
  noxtope: "moderator",
};

async function fetchOrgMembers() {
  console.log(`Fetching members for org: ${ORG}...`);
  const res = await fetch(`https://api.github.com/orgs/${ORG}/members?per_page=100`, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch members: ${res.status} ${res.statusText}`);
  }
  const membersList = await res.json();
  console.log(`Found ${membersList.length} members.`);

  const detailedMembers = [];

  for (const m of membersList) {
    try {
      console.log(`Fetching profile for ${m.login}...`);
      const userRes = await fetch(`https://api.github.com/users/${m.login}`, { headers });
      if (userRes.ok) {
        const u = await userRes.json();
        detailedMembers.push({
          userId: u.login.toLowerCase(),
          displayName: u.name || u.login,
          github: u.login,
          role: KNOWN_ROLES[u.login.toLowerCase()] || "member",
          profileUrl: u.html_url,
          avatarUrl: u.avatar_url,
          bio: u.bio || undefined,
          joinedAt: u.created_at || new Date().toISOString(),
        });
      } else {
        detailedMembers.push({
          userId: m.login.toLowerCase(),
          displayName: m.login,
          github: m.login,
          role: KNOWN_ROLES[m.login.toLowerCase()] || "member",
          profileUrl: m.html_url,
          avatarUrl: m.avatar_url,
          joinedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn(`Error fetching ${m.login}:`, err);
      detailedMembers.push({
        userId: m.login.toLowerCase(),
        displayName: m.login,
        github: m.login,
        role: KNOWN_ROLES[m.login.toLowerCase()] || "member",
        profileUrl: m.html_url,
        avatarUrl: m.avatar_url,
        joinedAt: new Date().toISOString(),
      });
    }
  }

  const rolePriority = { admin: 1, moderator: 2, member: 3 };
  detailedMembers.sort((a, b) => {
    const pA = rolePriority[a.role] || 99;
    const pB = rolePriority[b.role] || 99;
    if (pA !== pB) return pA - pB;
    return a.displayName.localeCompare(b.displayName);
  });

  const fileContent = `export type Member = {
  userId: string;
  displayName: string;
  github: string;
  role: string;
  profileUrl: string;
  avatarUrl: string;
  bio?: string;
  joinedAt: string;
};

export const members: Member[] = ${JSON.stringify(detailedMembers, null, 2)};
`;

  const outputPath = path.join(ROOT_DIR, "data", "members.ts");
  fs.writeFileSync(outputPath, fileContent, "utf-8");
  console.log(`Successfully wrote ${detailedMembers.length} members to ${outputPath}`);
}

fetchOrgMembers().catch((err) => {
  console.error("Member sync failed:", err);
  process.exit(1);
});
