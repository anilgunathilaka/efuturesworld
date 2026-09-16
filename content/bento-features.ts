export type BentoCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Tall left card spans both rows */
  variant: "tall" | "wide";
  /** Large overlay line(s) on the media */
  overlay?: {
    style: "plain" | "mixed";
    plain?: string;
    lead?: string;
    rest?: string;
  };
  /** Floating UI chrome on the tall card */
  prompt?: {
    avatar: string;
    text: string;
    cta: string;
  };
  badge?: {
    mark: string;
    caption: string;
  };
};

export const bentoFeatures = {
  heading: "Build software that looks like your product, not a template",
  /** Section-local accent — punchy red from reference mark */
  accent: "#FF1A1A",
  cards: [
    {
      id: "build",
      label: "Build",
      title: "Ship platforms in weeks.",
      body: "AI-native engineering that turns a brief into production software — without the outsourcing tax.",
      href: "/services/ai-data-engineering",
      image: "/images/bento/build.jpg",
      imageAlt: "Product builder reviewing a launch concept outdoors",
      variant: "tall",
      prompt: {
        avatar: "/images/bento/build.jpg",
        text: "A scalable patient platform for a health-tech product",
        cta: "Build",
      },
    },
    {
      id: "scale",
      label: "Scale",
      title: "Keep systems running.",
      body: "Enterprise software with a decade of uptime behind it — not a demo that dies after launch.",
      href: "/services/enterprise-software",
      image: "/images/bento/scale.jpg",
      imageAlt: "Product detail ready for a polished digital experience",
      variant: "wide",
      overlay: {
        style: "plain",
        plain: "Built to last",
      },
    },
    {
      id: "partner",
      label: "Partner",
      title: "Embed engineers who stick.",
      body: "Dedicated senior teams that join your sprint and stay for years — not a rotating bench.",
      href: "/services/dedicated-teams",
      image: "/images/bento/partner.jpg",
      imageAlt: "Studio conversation capturing a long-term product partnership",
      variant: "wide",
      overlay: {
        style: "mixed",
        lead: "anyone",
        rest: "can scale",
      },
      badge: {
        mark: "EFutures",
        caption: "Partner",
      },
    },
  ] satisfies BentoCard[],
};
