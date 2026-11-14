/* Brand logos: official devicon "original" SVGs and simple-icons (see public/logos/LICENSE-*). Concepts get thin line icons. */
const BRAND: Record<string, { file: string; tint: string }> = {
  JavaScript: { file: "javascript", tint: "#f7df1e" }, Java: { file: "java", tint: "#e76f00" }, "C#": { file: "csharp", tint: "#9b4f96" },
  Playwright: { file: "playwright", tint: "#2ead33" }, "Selenium WebDriver": { file: "selenium", tint: "#43b02a" },
  Jenkins: { file: "jenkins", tint: "#d33833" }, GitHub: { file: "github", tint: "#181717" }, Maven: { file: "maven", tint: "#c71a36" },
  Postman: { file: "postman", tint: "#ff6c37" }, Jira: { file: "jira", tint: "#0052cc" }, Confluence: { file: "confluence", tint: "#172b4d" },
  MySQL: { file: "mysql", tint: "#00758f" }, "SQL Server": { file: "microsoftsqlserver", tint: "#cc2927" }, Datadog: { file: "datadog", tint: "#632ca6" },
  "GitHub Copilot": { file: "githubcopilot.png", tint: "#181717" }, "Cursor AI": { file: "cursor", tint: "#000000" },
  "Selenium IDE": { file: "selenium", tint: "#43b02a" }, HTML: { file: "html5", tint: "#e34f26" }, XML: { file: "xml", tint: "#8a8a8a" },
  "Oracle 11g": { file: "oracle", tint: "#f80000" }, "Swagger UI": { file: "swagger", tint: "#85ea2d" }, "Atlassian ROVO QA Agent": { file: "atlassian", tint: "#0052cc" },
  "Confluence MCP & DPL Validation Agent": { file: "confluence", tint: "#172b4d" },
  "Model Context Protocol": { file: "modelcontextprotocol", tint: "#000000" }, ANT: { file: "apacheant", tint: "#a81c7d" }, TestRail: { file: "testrail", tint: "#65c179" },
};

const G: Record<string, string> = {
  people: "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.5M18 14.5c1.9.8 3 2.5 3 5.5M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  flow: "M5 5h5v5H5zM14 14h5v5h-5zM10 7.5h4a3 3 0 0 1 3 3V14",
  shield: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4",
  bug: "M9 9h6v8a3 3 0 0 1-6 0zM9 12H4M15 12h5M9 16H5M15 16h4M10 6l1 3M14 6l-1 3",
  gauge: "M4 16a8 8 0 1 1 16 0M12 16l4-5",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12",
  db: "M5 6c0 1.7 3.1 3 7 3s7-1.3 7-3-3.1-3-7-3-7 1.3-7 3zM5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  chart: "M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3",
  list: "M5 6l2 2 3-3M5 14l2 2 3-3M13 7h7M13 15h7",
  cog: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  rocket: "M12 3c3 2 5 5 5 9l-2 3H9l-2-3c0-4 2-7 5-9zM9 15l-2 5 5-2 5 2-2-5",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18",
  chat: "M4 5h16v11H9l-5 4z",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
};
const CONCEPT: Record<string, string> = {
  "QA Team Leadership": "people", "Offshore QA Delivery": "globe", "Test Strategy & Planning": "flow", "Risk-Based Testing": "shield", "Release Management": "rocket",
  "Agile/Scrum": "cal", "Defect Management": "bug", "Stakeholder Coordination": "people", "SpecFlow/ReqnRoll": "list", BDD: "list", TestNG: "list",
  "Page Object Model": "flow", "Cross-Browser Testing": "globe", "UI & Regression Automation": "cog", "AI Self-Healing": "spark", "AI Root Cause Analysis": "bug",
  "OpenAI GPT": "spark", "Prompt Engineering": "chat", SQL: "db", "REST API Testing": "link", "Integration Testing": "link", "Backend Validation": "shield",
  "CI/CD Pipelines": "cog", "Power BI": "chart", "Test Metrics & Reporting": "chart", "Test Strategy": "flow",
};
export const isBrand = (name: string) => name in BRAND;
export const hasIcon = (name: string) => isBrand(name) || name in CONCEPT;

export default function TechLogo({ name, size = 150 }: { name: string; size?: number }) {
  const b = BRAND[name];
  if (b) return (
    <span className="relative grid place-items-center" style={{ width: size, height: size }}>
      {size >= 48 && <span aria-hidden className="absolute inset-[-18%] rounded-full opacity-[.22] blur-2xl" style={{ background: b.tint }} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/logos/${b.file.includes(".") ? b.file : b.file + ".svg"}`} alt={`${name} logo`} width={size} height={size} className={`relative object-contain ${size >= 48 ? "h-[70%] w-[70%]" : "h-full w-full"}`} />
    </span>
  );
  const g = CONCEPT[name];
  return (
    <svg role="img" aria-label={`${name} icon`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" className="p-[18%]"><path d={G[g ?? "spark"]} /></svg>
  );
}
