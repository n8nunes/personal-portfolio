export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  body: string;
  tools: string;
  href?: string;
  actionText?: string;
  lead: boolean;
};

export type TimelineEntry = {
  title: string;
  dates: string;
  body: string;
};

export type Certification = {
  name: string;
  status: string;
};

export const site = {
  name: "Nathan Nunes",
  skipLink: "Skip to content",
  menuLabel: "Menu",
  footer: "© 2026 Nathan Nunes",
} as const;

export const navLinks: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "Record", href: "#record" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: "Securing the cloud, minus the fog.",
  paragraphs: [
    "I build cloud systems and the security tooling around them, from least-privilege AWS infrastructure to GRC automation that maps controls across NIST CSF, ISO 27001 and Essential Eight.",
    "I'm a software engineering student at Monash, graduating in 2027. Before that I spent four years in regulated manufacturing, where good systems were the ones with evidence and accountability built in.",
  ],
  primaryCta: {
    label: "See the projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Download resume",
    href: "/resume.pdf",
  },
} as const;

export const selectedWork: {
  heading: string;
  linkLabel: string;
  projects: Project[];
} = {
  heading: "Selected work",
  linkLabel: "View on GitHub",
  projects: [
    {
      title: "GRC Report Automation Agent",
      body: "Maps controls across 3 frameworks (NIST CSF, ISO 27001 and Essential Eight) and generates client-ready risk registers. It runs on local LLMs, so there are no ongoing API costs.",
      tools: "Python, Ollama, NIST CSF, ISO 27001, Essential Eight",
      href: "https://github.com/n8nunes/security-analysis-automation",
      lead: true,
    },
    {
      title: "Secure AWS Serverless Messaging Framework",
      body: "Infrastructure as code with least-privilege IAM and encryption at rest and in transit as first-class concerns. Aligned to NIST SP 800-53 and CIS AWS Foundations.",
      tools: "Terraform, IAM, KMS, Lambda, DynamoDB",
      href: "https://github.com/n8nunes/secure-widget-backend",
      lead: true,
    },
    {
      title: "Unilinq",
      body: "A two-sided marketplace matching university students with small and medium businesses for scoped, project-based work. Live, and currently in trial with 3 SMEs.",
      tools: "Next.js, NestJS, Supabase, Gemini",
      href: "https://unilinq.org",
      actionText: "Visit unilinq.org",
      lead: false,
    },
    {
      title: "nfx // Personal Trading Journal",
      body: "A journal for tracking and reviewing discretionary trades and strategy adherence. Features strict multi-user data isolation and secure authentication via an automated CI/CD pipeline.",
      tools: "React, TypeScript, Firebase, Vercel",
      href: "https://github.com/n8nunes/trading-journal",
      lead: false,
    },
  ],
};

export const record = {
  heading: "Record",
  certificationsHeading: "Certifications",
  entries: [
    {
      title: "GMP Processor, Ensign Laboratories",
      dates: "2022 to 2026",
      body: "Managed risk minimisation and quality control under regulatory compliance frameworks and Standard Operating Procedures.",
    },
    {
      title: "Bachelor of Software Engineering (Honours), Monash University",
      dates: "Expected 2027",
      body: "Specialising in cybersecurity and governance, risk and compliance.",
    },
  ] satisfies TimelineEntry[],
  certifications: [
    { name: "Google Cybersecurity Professional Certificate", status: "Completed" },
    { name: "CompTIA A+ (Coursera)", status: "Completed" },
    { name: "CompTIA Security+", status: "In progress" },
    { name: "AWS Solutions Architect Associate (SAA-C03)", status: "In progress" },
  ] satisfies Certification[],
} as const;

export const contact = {
  heading: "Let's talk.",
  paragraph:
    "Open to graduate roles, internships, and conversations about cloud security, GRC, or the tools in between.",
  email: {
    label: "nfx@nunesfx.com",
    href: "mailto:nfx@nunesfx.com",
  },
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nathan-nunes05" },
    { label: "GitHub", href: "https://github.com/n8nunes" },
  ],
} as const;
