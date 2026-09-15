export type FaqItem = {
  question: string;
  answer: string;
  showOnHome: boolean;
  pending?: boolean;
};

export const faqSectionHead = {
  heading: "Before you ask",
  label: "The questions every serious buyer raises first",
};

export const faqPageIntro = {
  metaTitle: "FAQ — Working with EFutures",
  metaDescription:
    "Answers to the questions serious buyers ask before hiring an award-winning offshore engineering partner.",
  eyebrow: "FAQ",
  heading: "Before you ask",
  intro: "The questions every serious buyer raises first — answered up front.",
};

export const faqItems: FaqItem[] = [
  {
    question: "You just won a national award sweep in 2025 — what does that actually verify?",
    answer:
      "Gold at every major Sri Lankan technology award ceremony that year, judged by the national tech industry body — independent recognition, not a self-issued badge. The award names and judging bodies will be linked here once EFutures confirms them, for verifiability.",
    showOnHome: false,
    pending: true,
  },
  {
    question: "How do you ensure code quality and security with an offshore team?",
    answer:
      "Every engagement runs through ISO-certified delivery processes, senior code review, and a dedicated QA/security practice — the same standard whether the team sits beside you or across a timezone.",
    showOnHome: true,
  },
  {
    question: "Who owns the IP for what you build?",
    answer:
      "You do. IP ownership terms are set out before work begins, with no ambiguity at handover.",
    showOnHome: true,
  },
  {
    question: "How fast can a dedicated team start?",
    answer:
      "Most engagements assemble a senior team within weeks, following an initial consultation and a transparent proposal — not months of procurement.",
    showOnHome: false,
  },
  {
    question: "What time zones do you cover?",
    answer:
      "Our teams structure working hours around overlap with US, UK, and APAC clients — coordinated explicitly at kickoff.",
    showOnHome: false,
  },
  {
    question: "What happens after launch?",
    answer:
      "Support and maintenance continue post-launch under the same team that built the product — ask Moovparcel or Weekli, both still supported years after their first release.",
    showOnHome: true,
  },
  {
    question: "What industries do you work with?",
    answer:
      "Confirmed so far: health tech (Sinque), logistics (Moovparcel), subscription commerce (Weekli), and enterprise operations (MBT). A full list of verticals is pending confirmation from EFutures before this answer is finalized.",
    showOnHome: false,
    pending: true,
  },
  {
    question: "How do you price engagements?",
    answer:
      "Pricing model (fixed-bid, time & materials, or dedicated-team monthly rate) is pending confirmation from EFutures — buyers use this answer to self-qualify, and leaving it vague costs more leads than a plain answer would.",
    showOnHome: false,
    pending: true,
  },
  {
    question: "Do you work with startups or only enterprise clients?",
    answer:
      "Both — Weekli was built from zero codebase to launch, while MBT and Sinque are multi-year enterprise partnerships. The process scales to the engagement.",
    showOnHome: false,
  },
];
