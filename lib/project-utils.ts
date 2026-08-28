export function getLanguageStyle(language: string): string {
  switch (language.toLowerCase()) {
    case "typescript":
      return "border-blue-400/40 bg-blue-500/15 text-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.15)]";
    case "javascript":
      return "border-amber-400/40 bg-amber-500/15 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.15)]";
    case "python":
      return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)]";
    case "java":
      return "border-orange-400/40 bg-orange-500/15 text-orange-300 shadow-[0_0_8px_rgba(251,146,60,0.15)]";
    case "svelte":
      return "border-rose-400/40 bg-rose-500/15 text-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.15)]";
    case "shell":
    case "bash":
      return "border-lime-400/40 bg-lime-500/15 text-lime-300 shadow-[0_0_8px_rgba(163,230,53,0.15)]";
    case "markdown":
      return "border-cyan-400/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.15)]";
    case "json":
      return "border-teal-400/40 bg-teal-500/15 text-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.15)]";
    default:
      return "border-cyan/30 bg-cyan/10 text-cyan-dim";
  }
}
