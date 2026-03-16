export const SITE_URL = "https://www.rajaniket.com";
export const SITE_NAME = "Aniket Raj Portfolio";
export const AUTHOR_NAME = "Aniket Raj";
export const AUTHOR_EMAIL = "aniketrajid@gmail.com";
export const AUTHOR_LOCATION = "Indore, Madhya Pradesh, India";

export const NAV_ITEMS = [
  { label: "Home", href: "#home", isRoute: false },
  { label: "About", href: "#about", isRoute: false },
  { label: "Skills", href: "#skills", isRoute: false },
  { label: "Work", href: "#work", isRoute: false },
  { label: "Projects", href: "#projects", isRoute: false },
  { label: "Services", href: "#services", isRoute: false },
  { label: "Education", href: "#education", isRoute: false },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Contact", href: "#contact", isRoute: false },
] as const;

export const NAV_SECTION_IDS = NAV_ITEMS.filter((n) => !n.isRoute).map((n) =>
  n.href.replace("#", ""),
);

export const SOCIAL_LINKS = [
  {
    icon: "fab fa-linkedin",
    href: "https://linkedin.com/in/itsaniketraj",
    label: "LinkedIn Profile",
    handle: "@itsaniketraj",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: "fab fa-github",
    href: "https://github.com/itsrajaniket",
    label: "GitHub Profile",
    handle: "@itsrajaniket",
    color: "text-stone-300",
    bg: "bg-stone-500/10 border-stone-500/20",
  },
  {
    icon: "fas fa-code",
    href: "https://leetcode.com/ANIKET0591",
    label: "LeetCode Profile",
    handle: "ANIKET0591",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: "fab fa-twitter",
    href: "https://twitter.com/Aniket_repo",
    label: "Twitter Profile",
    handle: "@Aniket_repo",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    icon: "fab fa-instagram",
    href: "https://instagram.com/letscodehi",
    label: "Instagram Profile",
    handle: "@letscodehi",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: "fas fa-envelope",
    href: `mailto:${AUTHOR_EMAIL}`,
    label: "Send Email",
    handle: AUTHOR_EMAIL,
    color: "text-accent",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
] as const;

// More personal, less generic AI output
export const TYPEWRITER_WORDS = [
  "React Developer",
  "Next.js Engineer",
  "UI Craftsman",
  "Frontend Obsessive",
] as const;

export const HERO_STATS = [
  { value: "15+", label: "Projects" },
  { value: "25+", label: "Repos" },
  { value: "3+", label: "Clients" },
  { value: "∞", label: "Coffee" },
] as const;
