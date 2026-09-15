export const whyEfutures = {
  metaTitle: "Why EFutures — 25 Years, Gold at Every Major Award, 2025",
  metaDescription:
    "See why Sinque, MBT, Weekli, and Moovparcel have stayed with EFutures for 5 to 10 years each.",
  eyebrow: "Why EFutures",
  heading: "Don't take our word for it. Take Sri Lanka's tech industry's.",
  body: "In 2025, EFutures won gold at every major national technology award ceremony in Sri Lanka. We're not going to pretend that's normal — it isn't. It's what 25 years of the same engineering discipline looks like when it compounds.",
  tenureNote:
    "Tenures below are quoted exactly as currently published on the live site — Sinque at seven years, Weekli at five. Confirm neither has drifted before this goes live.",
};

export type Testimonial = {
  slug: string;
  quote: string;
  attribution: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    slug: "sinque",
    quote:
      "We have been working with EFutures for seven years, developing our software for Sinque. Their expertise and collaboration have been invaluable, helping us reach thousands of users and deliver vital health data. A truly exceptional partnership.",
    attribution: "Renato Romani, Founder & CTO, Sinque",
  },
  {
    slug: "mbt",
    quote:
      "MBT has enjoyed a fruitful 10-year partnership with EFutures, benefiting from their effective and accurate software solution... allowed us to provide world-class software solutions to our clients.",
    attribution: "Reid Stephens, President of Biz Ops, MBT",
    featured: true,
  },
  {
    slug: "weekli",
    quote:
      "I've worked with EFutures for 5 years as the product owner. They helped us build the entire system from scratch, including architecture, development, testing, and maintenance. I'm incredibly happy and satisfied with our collaboration.",
    attribution: "Ludvig Odin, Product Owner, Weekli",
  },
  {
    slug: "moovparcel",
    quote:
      "Our software was built and is currently maintained by EFutures. It has been a great pleasure working with them and they have been responsive, supportive, and always on time.",
    attribution: "Ross Jermy, Founder & CTO, Moovparcel",
  },
];
