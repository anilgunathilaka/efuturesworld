export type Capability = {
  index: string;
  slug: string;
  title: string;
  description: string;
  showOnHome: boolean;
};

export const capabilitiesSectionHead = {
  heading: "What we build",
  label: "Five practices, one delivery team — not ten disconnected line items",
};

export const capabilities: Capability[] = [
  {
    index: "01",
    slug: "ai-data-engineering",
    title: "AI & Data Engineering",
    description:
      "Everyone's bolting AI onto old data. We built the data engineering practice first — the AI works because the pipeline underneath it isn't held together with duct tape.",
    showOnHome: true,
  },
  {
    index: "02",
    slug: "enterprise-software",
    title: "Enterprise Software",
    description:
      'MBT has run on software we built for ten years. That\'s the bar: not "does it demo well," but "does it still run in 2036."',
    showOnHome: true,
  },
  {
    index: "03",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description:
      'AWS and Microsoft certified — verified partner status, not "we use AWS." Architecture sized to the load you\'ll actually have.',
    showOnHome: true,
  },
  {
    index: "04",
    slug: "mobile-development",
    title: "Mobile Development",
    description:
      "Sinque's app reaches thousands of users with health data riding on it. Performance isn't a nice-to-have at that workload.",
    showOnHome: true,
  },
  {
    index: "05",
    slug: "qa-security",
    title: "QA & Cybersecurity",
    description:
      "ISO-certified delivery on every engagement — audited, not a badge on a footer.",
    showOnHome: false,
  },
  {
    index: "06",
    slug: "dedicated-teams",
    title: "Dedicated Teams",
    description:
      "Renato Romani hired a dedicated team seven years ago. He never had to re-hire one.",
    showOnHome: true,
  },
];
