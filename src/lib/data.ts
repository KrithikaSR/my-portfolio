// Single source of truth. Every string below comes from resume.pdf.
export const PROFILE = {
  name: "Krithika SR",
  first: "Krithika",
  initials: "KS",
  role: "Senior QA Engineer",
  email: "krithikaramprasad03@gmail.com",
  phone: "+91 9789757289",
  phoneHref: "tel:+919789757289",
  location: "Chennai, Tamil Nadu",
  linkedin: "https://www.linkedin.com/in/srkrithika",
  resume: "/resume.pdf",
  resumeSummary:
    "Results-driven Senior QA Engineer with 9+ years of experience in test automation, QA strategy, and offshore QA team leadership. Expertise in Playwright, Selenium, BDD, API testing, and CI/CD integration, with ownership of test planning, stakeholder coordination, and release sign-off.",
  moreSummary:
    "Designed and developed AI-assisted testing tools for self-healing automation, root cause analysis, and test-case generation using Cursor AI, GitHub Copilot, and MCP integrations, with selected tools adopted by other teams.",
  company: "IRIS KPO Resourcing India Pvt.Ltd.",
  years: "9.5 Years",
  degree: "B.E. Computer Science Engineering",
  cgpa: "7.8",
  graduated: "2016",
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const SKILL_GROUPS: { family: string; skills: string[] }[] = [
  { family: "Leadership", skills: ["QA Team Leadership", "Offshore QA Delivery", "Test Strategy & Planning", "Risk-Based Testing", "Release Management", "Agile/Scrum", "Defect Management", "Stakeholder Coordination"] },
  { family: "Automation", skills: ["Playwright", "Selenium WebDriver", "Selenium IDE", "TestNG", "SpecFlow", "ReqnRoll", "BDD"] },
  { family: "AI Agents", skills: ["AI Self-Healing", "AI Root Cause Analysis", "AI Jira–TestRail Generation", "Atlassian ROVO QA Agent", "Confluence MCP & DPL Validation Agent"] },
  { family: "AI Tools", skills: ["Cursor AI", "GitHub Copilot", "OpenAI GPT"] },
  { family: "AI Techniques", skills: ["Model Context Protocol", "Prompt Engineering"] },
  { family: "Languages", skills: ["Java", "JavaScript", "C#", "XML", "HTML"] },
  { family: "API Testing", skills: ["REST Assured", "Postman", "Swagger UI", "SoapUI"] },
  { family: "CI/CD", skills: ["Jenkins", "GitHub"] },
  { family: "Management", skills: ["Jira", "TestRail", "Confluence", "Power BI", "Test Metrics & Reporting"] },
  { family: "Reporting", skills: ["QA Dashboards", "Automated Test-Result Reporting"] },
  { family: "Data", skills: ["SQL Server", "MySQL", "Sybase", "Oracle 11g", "Datadog"] },
];

export const PROJECTS = [
  { id: "heal", company: "IRIS KPO", period: "Aug 2023 – Present", title: "AI-Powered Playwright Self-Healing Automation Framework", description: "Designed and implemented a semi-automated self-healing framework to capture locator failures, DOM snapshots, execution logs, screenshots, and structured failure artifacts. Integrated AI-assisted locator analysis and human-validated correction workflows to improve automation maintainability and reduce repetitive troubleshooting.", features: ["Locator failure capture", "DOM snapshots and logs", "AI-assisted locator analysis", "Human-validated corrections"], tech: ["Playwright", "Cursor AI"] },
  { id: "rca", company: "IRIS KPO", period: "Aug 2023 – Present", title: "AI Root Cause Analysis Agent", description: "Developed a custom AI agent to analyze Playwright test failures using execution logs, DOM evidence, and screenshots, identifying probable root causes and recommending corrective actions. Enabled structured failure analysis to streamline debugging and support faster defect investigation.", features: ["Execution log analysis", "DOM evidence", "Screenshot analysis", "Recommended corrective actions"], tech: ["Playwright", "GitHub Copilot"] },
  { id: "testgen", company: "IRIS KPO", period: "Aug 2023 – Present", title: "AI-Powered Test Case Generation with Jira & TestRail", description: "Designed and implemented an LLM-powered POC to generate structured functional test cases from Jira user stories and acceptance criteria, supporting TestRail integration. Reduced manual test-case creation effort by 65% during the POC, improving test design efficiency.", features: ["Jira user stories in", "Acceptance criteria", "Structured functional test cases", "TestRail integration"], tech: ["OpenAI GPT", "Jira", "TestRail"] },
  { id: "tax", company: "IRIS KPO", period: "Aug 2023 – Present", title: "IRIS Elements – Tax Calculation", description: "Cloud-based UK tax preparation and filing software for accounting professionals, supporting tax calculations, return preparation, validation, and electronic submission to HMRC.", features: ["Tax calculations", "Return preparation", "Validation", "Electronic submission to HMRC", "Integrates with accounts production", "Reduces duplicate entry"], tech: ["Playwright", "Jira", "TestRail"] },
  { id: "accounts", company: "IRIS KPO", period: "Aug 2023 – Present", title: "IRIS Elements – Accounts Production", description: "Cloud-based accounts production software enabling accounting professionals to prepare financial statements and statutory accounts for UK businesses.", features: ["Trial balance processing", "Financial reporting", "Accounts preparation workflows", "Integration with IRIS Elements Tax"], tech: ["Playwright", "Jira", "TestRail"] },
  { id: "lease", company: "IRIS KPO", period: "Aug 2023 – Present", title: "Innervision – Lease Accounting", description: "Cloud-based lease accounting software designed to support IFRS 16 reporting requirements.", features: ["Centralises lease data", "Automates lease calculations", "Disclosure preparation", "Audit process support"], tech: ["Playwright", "Jira", "TestRail"] },
  { id: "aim", company: "Carelon & Cognizant", period: "Mar 2019 – Aug 2023", title: "AIM Health Specialty", description: "Healthcare pre-authorization and claims portal supporting insurance eligibility verification, provider authorization, and claim approval workflows.", features: ["Functional testing", "Regression testing", "Automation testing", "Eligibility and claims flows"], tech: ["Selenium WebDriver", "TestNG", "Postman", "Jira"] },
  { id: "ism", company: "Amtex", period: "Jan 2017 – Jan 2019", title: "iWay Service Manager (ISM)", description: "Enterprise integration platform enabling communication and data exchange between applications and services.", features: ["Functional testing", "Integration testing", "Adapter and messaging workflows", "Automation testing"], tech: ["Selenium WebDriver", "ANT"] },
  { id: "iit", company: "Amtex", period: "Jan 2017 – Jan 2019", title: "iWay Integration Tool (IIT)", description: "Eclipse-based integration development tool supporting data discovery, process-flow design, and application deployment.", features: ["Application functionality checks", "Integration workflow validation", "Data discovery", "Process-flow design"], tech: ["Selenium WebDriver", "ANT"] },
];

export const CERTIFICATIONS = [
  { title: "Diploma in Automation Testing (DST)", issuer: "Amity Soft Technologies Pvt. Ltd., Chennai", date: "Mar 2018 – Jun 2018" },
  { title: "Fundamentals of Python", issuer: "Iris India Pvt. Ltd., Chennai", date: "June 2025" },
  { title: "Basics of Prompt Engineering", issuer: "Iris India Pvt. Ltd., Chennai", date: "June 2025" },
];

export const EDUCATION = [
  { year: "2011 – 2012", title: "Higher Secondary Certificate", place: "National matriculation higher Secondary School, Chennai, Tamil Nadu", detail: "", chip: "Score 75%", badge: "" },
  { year: "2012 – 2016", title: "B.E. Computer Science Engineering", place: "Prince Shri Venkateshwara Padmavathy College of Engineering, Chennai, Tamil Nadu", detail: "", chip: "CGPA 7.8", badge: "" },
];

export const EXPERIENCE = [
  { year: "Jan 2017 – Jan 2019", title: "Associate Consultant Test Engineer", place: "Amtex Software Solution Pvt.Ltd., Chennai", detail: "Installation and uninstallation testing for ISM across Windows and Unix-based platforms; adapter validation (CICS, IMS, Siebel, RDBMS); Selenium WebDriver and ANT automation in a Page Object Model structure.", chip: "Jan 2017 – Jan 2019", badge: "" },
  { year: "Mar 2019 – Dec 2021", title: "Programmer Analyst", place: "Cognizant Technology solutions, Chennai", detail: "End-to-end functional and regression testing; hybrid manual and automation work; Selenium scripts with Maven and TestNG integrated with CI/CD pipelines.", chip: "Mar 2019 – Dec 2021", badge: "" },
  { year: "Dec 2021 – Aug 2023", title: "Senior Quality Engineer", place: "Carelon Global Solutions India (Legato), Bangalore", detail: "Offshore QA Lead owning end-to-end QA delivery across the SDLC: test planning, execution, release coordination, stakeholder communication, and formal test sign-off.", chip: "Dec 2021 – Aug 2023", badge: "" },
  { year: "Aug 2023 – Present", title: "Senior QA Engineer", place: "IRIS KPO Resourcing India Pvt.Ltd., Chennai", detail: "QA planning and release quality for IRIS Elements and TaxCalc Cloud Connect; Playwright (JavaScript) cross-browser coverage; Power BI dashboards and a Confluence QA Knowledge Hub; Impact Award for Excellence Performer.", chip: "Aug 2023 – Present", badge: "★ Impact Award" },
];

// `value` counts up; `suffix` follows it. Award cards have no number in the résumé, so none is shown.
export const ACHIEVEMENTS: { label: string; caption: string; detail: string; value?: number; suffix?: string; award?: boolean }[] = [
  { label: "Impact Award", caption: "Excellence Performer (IRIS)", detail: "Recognized for outstanding contributions to QA excellence, automation innovation, and delivery quality.", award: true },
  { label: "Automation Excellence", caption: "Automated test cases", detail: "70% coverage of critical business scenarios; regression execution time reduced by 6 hours.", value: 1000, suffix: "+" },
  { label: "AI-Driven QA Innovation", caption: "Less manual test-case effort", detail: "Led an OpenAI GPT-powered test case generation POC.", value: 65, suffix: "%" },
  { label: "Test Process Optimization", caption: "Less manual result tracking", detail: "Automated TestRail–SpecFlow/ReqnRoll BDD result reporting.", value: 70, suffix: "%" },
  { label: "Engineering Recognition", caption: "Collaboration & Passion in Automation Award", detail: "Delivered Engineering Talks on Power BI-based Jira QA analytics.", award: true },
  { label: "Excellent Performer Award", caption: "Client recognition · Cognizant", detail: "Recognised by the client for delivering requirements on schedule with no reported defects at Cognizant", award: true },
  { label: "Passion in Automation Award", caption: "AIM Health Specialty · Cognizant", detail: "Recognised for individual excellence and automation contributions to the AIM Health Specialty project at Cognizant", award: true },
];
