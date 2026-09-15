export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
];

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { href: "/services", label: "Services" },
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    heading: "Practices",
    links: [
      { href: "/services/ai-data-engineering", label: "AI & Data Engineering" },
      { href: "/services/enterprise-software", label: "Enterprise Software" },
      { href: "/services/cloud-devops", label: "Cloud & DevOps" },
      { href: "/services/mobile-development", label: "Mobile" },
      { href: "/services/qa-security", label: "QA & Security" },
      { href: "/services/dedicated-teams", label: "Dedicated Teams" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "Facebook" },
      { href: "mailto:hello@efuturesworld.com", label: "hello@efuturesworld.com" },
    ],
  },
];

export const footerLegalLinks: NavLink[] = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Quality Policy" },
];

export const footerCopyrightSuffix = "All Rights Reserved EFutures (Pvt) Ltd.";
export const footerCertificationsLine =
  "AWS Partner · Microsoft Silver Partner · ISO Certified · SLASSCOM Member";

export const notFound = {
  eyebrow: "Fig. 404",
  heading: "This page didn't ship.",
  body: "The page you're looking for doesn't exist, or it moved. Try the homepage, or tell us about the broken link.",
  primaryCtaLabel: "Back to Home",
  secondaryCtaLabel: "Report a Broken Link",
};
