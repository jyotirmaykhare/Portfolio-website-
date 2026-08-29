export const site = {
  name: "Jyotirmay Khare",
  role: "Full Stack Developer",
  email: "jyotirmaykhare@gmail.com",
  /** User-provided contact number (from the resume / previous portfolio source). */
  phone: "+91-9685032985",
  github: "https://github.com/jyotirmaykhare",
  linkedin: "https://www.linkedin.com/in/jyotirmay-khare",
  /** Future-ready: a resume may be added later. Keep empty until a real file exists. */
  resume: "",
  url: "https://jyotirmaykhare.vercel.app",
} as const;

export const socialLinks = [
  { label: "GitHub", handle: "jyotirmaykhare", href: site.github },
  { label: "LinkedIn", handle: "in/jyotirmay-khare", href: site.linkedin },
  { label: "Email", handle: "jyotirmaykhare@gmail.com", href: `mailto:${site.email}` },
];
