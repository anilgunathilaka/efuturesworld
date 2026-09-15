export const servicesOverview = {
  metaTitle: "Services — AI, Enterprise Software & Cloud Engineering | EFutures",
  metaDescription:
    "Six practices, one delivery team: AI & data engineering, enterprise software, cloud & DevOps, mobile, QA & security, dedicated teams.",
  eyebrow: "What we do",
  heading: "Six practices. One accountable team.",
  intro:
    "Most engagements touch more than one of these — that's the point. You get a single delivery lead and one contract, not six vendors to coordinate.",
};

export type ServiceDetail = {
  slug: string;
  practiceNumber: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  hook: string;
  intro: string;
  included: string[];
  whyEfutures: string;
  proof?: string;
  relatedCaseStudySlugs?: string[];
};

export const services: ServiceDetail[] = [
  {
    slug: "ai-data-engineering",
    practiceNumber: "01",
    title: "AI & Data Engineering",
    metaTitle: "AI & Data Engineering Services | EFutures",
    metaDescription:
      "Generative AI, ML pipelines, and master data management — built by a 25-year, award-winning enterprise engineering team.",
    heading: "Turn raw data into decisions.",
    hook: "Everyone's bolting AI onto old data. We built the data engineering practice first — the AI works because the pipeline underneath it isn't held together with duct tape.",
    intro:
      "AI is only as good as the data pipeline underneath it. We build both — the generative AI features your product needs, and the master data management that makes them reliable in production, not just in a demo.",
    included: [
      "Generative AI feature design and implementation (copilots, retrieval-augmented search, document automation)",
      "ML pipeline architecture and MLOps",
      "Master data management, data quality, and governance frameworks — unifying fragmented enterprise data into trusted \"golden records\"",
      "Data platform migration and warehousing",
    ],
    whyEfutures:
      'We were doing data engineering and master data management long before "AI-native" was a category — the difference shows up in production, not in the pitch.',
    proof: "Gold at every major Sri Lankan tech award in 2025. 25 years of delivery discipline behind every model we ship.",
    relatedCaseStudySlugs: ["sinque"],
  },
  {
    slug: "enterprise-software",
    practiceNumber: "02",
    title: "Enterprise Software",
    metaTitle: "Enterprise Software Development | EFutures",
    metaDescription:
      "Custom enterprise platforms engineered for scale, from specification through DevOps — 25 years, 10-year client relationships.",
    heading: "Software built to run your business, not just demo well.",
    hook: "MBT has run on software we built for ten years. That's the bar every enterprise build is held to.",
    intro:
      "Enterprise software has to survive contact with real operations — real load, real edge cases, real compliance requirements. We design complex web and enterprise systems to raise performance and cut operational cost, and we're still the team maintaining them years later.",
    included: [
      "Custom platform architecture and development",
      "Legacy system modernization",
      "Warehouse management and operations software",
      "Full lifecycle delivery: strategy → build → DevOps → support",
    ],
    whyEfutures:
      'Reid Stephens, President of Biz Ops at MBT: "MBT has greatly benefited from our partnership with EFutures, which has allowed us to provide world-class software solutions to our Clients." Ten years in, that\'s still true.',
    relatedCaseStudySlugs: ["mbt"],
  },
  {
    slug: "cloud-devops",
    practiceNumber: "03",
    title: "Cloud & DevOps",
    metaTitle: "Cloud & DevOps Services (AWS) | EFutures",
    metaDescription:
      "AWS-native architecture, migration, and managed infrastructure from a certified AWS and Microsoft partner.",
    heading: "Infrastructure that scales with you, not against you.",
    hook: 'AWS and Microsoft certified — verified partner status, not "we use AWS."',
    intro:
      "We architect and deploy cloud solutions built for agility, security, and lower total cost of ownership — sized to the load you'll actually have, not a generic template's assumptions.",
    included: [
      "Cloud migration and architecture (AWS-native)",
      "Managed infrastructure and cost optimization",
      "CI/CD pipeline design",
      "Uptime and incident-response practices",
    ],
    whyEfutures:
      "Certified AWS and Microsoft Silver Partner status, backed by an ISO-certified delivery process — verified, not claimed.",
  },
  {
    slug: "mobile-development",
    practiceNumber: "04",
    title: "Mobile Development",
    metaTitle: "Mobile App Development | EFutures",
    metaDescription:
      "Native and cross-platform mobile apps engineered for performance — trusted with health data at scale.",
    heading: "Apps engineered for performance, not just feature parity.",
    hook: "Sinque's app reaches thousands of users with health data riding on it. Performance isn't optional at that workload.",
    intro:
      'A mobile app is judged on speed and feel before it\'s judged on features. We build for both from day one — because for clients like Sinque, "good enough" performance isn\'t an option when vital health data depends on it.',
    included: [
      "Native iOS and Android development",
      "Cross-platform delivery (React Native / Flutter)",
      "App performance and battery/network optimization",
      "App Store / Play Store launch support",
    ],
    whyEfutures: "Product engineering discipline applied to mobile — not a bolt-on service line.",
    relatedCaseStudySlugs: ["sinque"],
  },
  {
    slug: "qa-security",
    practiceNumber: "05",
    title: "QA & Cybersecurity",
    metaTitle: "Software QA & Cybersecurity Services | EFutures",
    metaDescription:
      "Independent testing and a security practice built for regulated, high-stakes software — ISO certified delivery.",
    heading: "Quality and security aren't a separate desk.",
    hook: "ISO-certified delivery on every engagement — audited, not a badge on a footer.",
    intro:
      "Every engagement — whether we built the software or you did — runs through the same certified QA and security review. It's the same process behind a decade of zero missed releases for MBT.",
    included: [
      "Manual and automated testing",
      "Security audits and penetration testing",
      "ISO-certified delivery process",
      "Compliance support for regulated industries",
    ],
    whyEfutures: "ISO certification is the process every project runs through, not a claim on a slide.",
  },
  {
    slug: "dedicated-teams",
    practiceNumber: "06",
    title: "Dedicated Teams",
    metaTitle: "Dedicated Development Teams | EFutures",
    metaDescription:
      "Senior engineers embedded in your team in weeks — with QA and delivery process built in from day one.",
    heading: "Senior engineers, embedded — in weeks, not months.",
    hook: "Renato Romani hired a dedicated team seven years ago. He never had to re-hire one.",
    intro:
      "Staff augmentation without the staffing-agency feel: an initial consultation to scope the need, a transparent proposal, then a team that shows up with process, QA, and security practice already built in.",
    included: [
      "Rapid team assembly (weeks, not months)",
      "Senior-only talent — no junior-heavy staffing",
      "Flexible scaling up or down with your roadmap",
      "Full transparency: your process, your tools, our engineers",
    ],
    whyEfutures:
      "Renato Romani (Sinque, 7 years) and Reid Stephens (MBT, 10 years) hired a team once and kept it. That's the actual test of a staffing model.",
    relatedCaseStudySlugs: ["sinque", "mbt"],
  },
];
