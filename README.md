# Aniket Raj — Portfolio (Next.js 14 · App Router · TypeScript)

A production-grade portfolio migrated from a static HTML/JS/Tailwind CDN file to a full **Next.js 14 App Router** project with TypeScript, Tailwind CSS, Framer Motion, and a real blog.

---

## 🚀 Quick Start

```bash
# 1. Enter the project folder
cd aniket-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# → Edit .env.local and add your RESEND_API_KEY

# 4. Copy your images (see Image Setup below)

# 5. Run the dev server
npm run dev
# → http://localhost:3000
```

---

## 📁 Complete File Structure

```
aniket-portfolio/
│
├── app/                            ← Next.js App Router
│   ├── layout.tsx                  ← Root layout: fonts, metadata, MouseTrail, MotionWrapper
│   ├── page.tsx                    ← Home page (all sections composed)
│   ├── globals.css                 ← Tailwind base + custom utilities
│   ├── not-found.tsx               ← Custom 404 page
│   ├── sitemap.ts                  ← Auto-generated sitemap.xml
│   ├── robots.ts                   ← robots.txt
│   ├── actions/
│   │   └── contact.ts              ← Server Action: validate + send email via Resend
│   └── blog/
│       ├── page.tsx                ← Blog list page
│       └── [slug]/
│           └── page.tsx            ← Blog post (generateMetadata + generateStaticParams)
│
├── components/
│   ├── index.ts                    ← Barrel export (all components)
│   ├── Navbar.tsx                  ← Server Component shell
│   ├── NavLinks.tsx                ← "use client" · useActiveSection scroll tracking
│   ├── MobileNav.tsx               ← "use client" · hamburger + focus trap
│   ├── MotionWrapper.tsx           ← "use client" · AnimatePresence page transitions
│   ├── MouseTrailCanvas.tsx        ← "use client" · global sparkle trail canvas
│   ├── SpiderCanvas.tsx            ← "use client" · hero spider-network canvas
│   ├── Typewriter.tsx              ← "use client" · typewriter effect
│   ├── Hero.tsx                    ← Server Component
│   ├── About.tsx                   ← Server Component
│   ├── Skills.tsx                  ← Server Component
│   ├── Experience.tsx              ← Server Component
│   ├── Projects.tsx                ← "use client" · filter pills + AnimatePresence grid
│   ├── ProjectCard.tsx             ← "use client" · Framer Motion hover + whileInView
│   ├── SectionReveal.tsx           ← "use client" · reusable scroll-reveal wrapper
│   ├── Services.tsx                ← Server Component
│   ├── Education.tsx               ← Server Component
│   ├── Contact.tsx                 ← Server Component (uses CopyButton client child)
│   ├── ContactForm.tsx             ← "use client" · react-hook-form + zod + Server Action
│   ├── Footer.tsx                  ← Server Component
│   └── ui/
│       ├── index.ts                ← Barrel export (ui components)
│       ├── CopyButton.tsx          ← "use client" · clipboard copy with feedback
│       ├── ScrollToTop.tsx         ← "use client" · FAB scroll-to-top button
│       └── Toast.tsx               ← "use client" · toast notification with auto-dismiss
│
├── lib/
│   ├── constants.ts                ← Single source of truth: nav, social, stats, typewriter
│   ├── projects.ts                 ← All 9 projects with typed Project[] array
│   ├── skills.ts                   ← Tech stack: 3 categories, 15 skills
│   ├── experience.ts               ← Experience, education, services data
│   └── blog.ts                     ← MDX file reader: getAllPosts, getPostBySlug, getAllSlugs
│
├── types/
│   └── index.ts                    ← TypeScript interfaces: Project, Skill, Experience, etc.
│
├── hooks/
│   └── index.ts                    ← useReducedMotion, useActiveSection
│
├── content/
│   └── blog/
│       └── vanilla-js-to-nextjs.mdx  ← Sample blog post (800 words, real content)
│
├── public/
│   └── images/
│       └── IMAGES_README.md        ← Instructions for which images to copy here
│
├── .env.local.example              ← Environment variable template
├── .eslintrc.json                  ← ESLint config (next/core-web-vitals)
├── .gitignore
├── next.config.ts                  ← Image optimization + security headers
├── package.json                    ← All dependencies
├── postcss.config.mjs              ← PostCSS (ESM format)
├── tailwind.config.ts              ← Custom colors + glass plugin + font vars
└── tsconfig.json                   ← TypeScript with @/* path aliases
```

---

## 🖼️ Image Setup

Copy these from your old `resource/` folder into `public/images/`:

| Put here                    | From                              |
|-----------------------------|-----------------------------------|
| `head.png`                  | `resource/head.png`               |
| `3D-avatar.png`             | `resource/3D-avatar.png`          |
| `selfphoto.png`             | `resource/selfphoto.png`          |
| `project-markdown.png`      | `resource/project-markdown.png`   |
| `project-beatreactor.jpg`   | `resource/project-beatreactor.jpg`|
| `project-speech.jpg`        | `resource/project-speech.jpg`     |
| `project-dog.jpg`           | `resource/project-dog.jpg`        |

Also copy:
- `resource/Aniket-Resume.pdf` → `public/Aniket-Resume.pdf`
- Create a 1200×630 `public/og-image.png` for social sharing previews

Missing project images (`project-habit.jpg`, `project-maharani.jpg`, `project-color.jpg`, `project-todo.jpg`, `project-weather.jpg`) can be any placeholder image for now — Next.js `<Image>` will handle sizing automatically.

---

## 📧 Enable Real Email

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Create an API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
4. Open `app/actions/contact.ts` — uncomment the Resend block and set your email address

---

## ✍️ Blog Posts

Add `.mdx` files to `content/blog/`:

```md
---
title: "Your Post Title"
description: "Brief description for SEO."
date: "2025-06-01"
readingTime: "4 min read"
tags: "React, Next.js"
---

Your content here. Markdown is fully supported.
```

For full MDX (React components inside posts), install `next-mdx-remote`:
```bash
npm install next-mdx-remote
```

---

## 🎨 Customisation

| What                 | File                          |
|----------------------|-------------------------------|
| Colors               | `tailwind.config.ts`          |
| Fonts                | `app/layout.tsx`              |
| Projects             | `lib/projects.ts`             |
| Skills               | `lib/skills.ts`               |
| Experience/Education | `lib/experience.ts`           |
| Nav items/Social     | `lib/constants.ts`            |

---

## 🚢 Deploy

```bash
# Vercel (recommended — zero config)
npx vercel

# Or push to GitHub → import at vercel.com/new
# Add RESEND_API_KEY under Settings → Environment Variables
```

---

## 🛠️ Tech Stack

| Layer         | Tech                              |
|---------------|-----------------------------------|
| Framework     | Next.js 14 (App Router)           |
| Language      | TypeScript (strict)               |
| Styling       | Tailwind CSS + glass utility plugin |
| Animations    | Framer Motion 11                  |
| Forms         | react-hook-form + Zod             |
| Email         | Resend (stub by default)          |
| Fonts         | next/font/google (Orbitron + Rajdhani) |
| Canvas        | Vanilla JS via useRef + useEffect |
| Blog          | MDX files + frontmatter parser    |
| SEO           | Next.js Metadata API + sitemap    |
| Deploy        | Vercel                            |

---

Built by **Aniket Raj** © 2025 · [itsrajaniket.github.io](https://itsrajaniket.github.io)
