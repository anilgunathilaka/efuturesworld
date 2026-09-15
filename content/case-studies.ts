export type CaseStudy = {
  slug: string;
  client: string;
  subtitle: string;
  challenge: string;
  build: string;
  outcome: string;
  tags: [string, string];
  cover: {
    from: string;
    to: string;
    accent: string;
  };
  metricPendingNote?: string;
};

export const workSectionHead = {
  eyebrow: "Our Work",
  headingLead: "The embedded engineering team for founders who are",
  headingAccent: "serious about product.",
  description:
    "We don't take briefs and disappear. We get inside your product, your users, and your stack — and we build with you for the long term.",
  ctaLabel: "Case Studies",
  ctaHref: "/work",
  viewMoreLabel: "View More",
  label: "Selected engagements — challenge, build, outcome",
};

export const workPageIntro = {
  metaTitle: "Our Work — Client Case Studies | EFutures",
  metaDescription:
    "Gold-award-winning engineering, proven over 5–10 year partnerships with Sinque, MBT, Weekli, and Moovparcel.",
  eyebrow: "Selected engagements",
  heading: "Proof of work, not adjectives.",
  intro:
    "Four relationships, one pattern: we're still the engineering team years — sometimes a decade — after the first release shipped.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sinque",
    client: "Sinque",
    subtitle: "Health platform · 7-year partnership",
    challenge:
      "A health platform where the software isn't just a product — it's the pipe vital health data runs through, for thousands of users.",
    build:
      "The engineering partnership behind Sinque's platform for seven years — architecture, development, and the trust that comes with not touching health data carelessly.",
    outcome:
      "\"Helping us reach thousands of users and deliver vital health data. A truly exceptional partnership.\" — Renato Romani, Founder & CTO",
    tags: ["Health Platform", "Product Build"],
    cover: { from: "#0B1F33", to: "#1B6CB5", accent: "#0093FD" },
    metricPendingNote:
      "Pending confirmation from EFutures: one hard number — active users, uptime, or data volume — to sit alongside \"thousands of users.\"",
  },
  {
    slug: "mbt",
    client: "MBT",
    subtitle: "10-year enterprise partnership",
    challenge:
      "Long-running enterprise software that has to stay accurate under sustained regulatory and operational scrutiny.",
    build:
      "A decade of continuous delivery on the same platform — the kind of relationship that ends fast if the software isn't right.",
    outcome:
      "\"MBT has greatly benefited from our partnership with EFutures which has allowed us to provide world-class software solutions to our Clients.\" — Reid Stephens, President of Biz Ops",
    tags: ["Enterprise", "Web Development"],
    cover: { from: "#10141A", to: "#0F4C82", accent: "#5BA8E0" },
  },
  {
    slug: "weekli",
    client: "Weekli",
    subtitle: "Zero-to-launch build · 5-year partnership",
    challenge: "A subscription product with no existing codebase and a hard launch date.",
    build:
      "The entire system from scratch — architecture, development, testing, and maintenance — and five years of continued ownership since.",
    outcome:
      '"They helped us build the entire system from scratch... I\'m incredibly happy and satisfied with our collaboration." — Ludvig Odin, Product Owner',
    tags: ["Digital Product", "Zero-to-Launch"],
    cover: { from: "#0D1B2A", to: "#245B8A", accent: "#7EC8FF" },
  },
  {
    slug: "moovparcel",
    client: "Moovparcel",
    subtitle: "Logistics platform · ongoing partnership",
    challenge:
      "A logistics operation that needs an engineering partner as responsive as the deliveries it's tracking.",
    build:
      "The platform, built and currently maintained — responsive turnaround on operational requests, not a quarterly release cycle.",
    outcome:
      '"Responsive, supportive, and always on time. It\'s been a wonderful experience." — Ross Jermy, Founder & CTO',
    tags: ["Logistics", "Ongoing Support"],
    cover: { from: "#111827", to: "#1E3A5F", accent: "#0093FD" },
  },
];
