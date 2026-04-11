# Aniket Raj — Professional Portfolio & Blog

A high-performance, production-grade digital hub built with the latest Next.js 15 features. This project serves as a comprehensive showcase of technical expertise, featuring a modular blog system, interactive canvas-based visuals, and a futuristic design language.

## 1. Project Overview

**What is this project?**
This is a modern, full-stack personal portfolio and technical blog built using Next.js 15. It integrates a sleek, cyberpunk-inspired UI with high-performance animations, a project gallery, and an automated blog system that supports both MDX and PDF content.

**What real problem does it solve and who is it built for?**
It provides a centralized, professional platform for developers and tech professionals to showcase their work, share technical knowledge through detailed articles, and enable secure communication with potential clients or employers. It solves the fragmentation of digital presence by combining a portfolio, resume, and blog into one optimized experience.

**Value Proposition**
"A futuristic, performance-optimized digital ecosystem designed to maximize professional visibility and technical storytelling."

---

## 2. Live Demo & Visuals

**Live Demo:** [https://www.rajaniket.com/](https://www.rajaniket.com/)

*(Screenshots coming soon)*

---

## 3. Tech Stack & Choices

| Technology | Version | Why Chosen |
|------------|---------|------------|
| **Core** | | |
| Next.js | ^15.2.4 | Primary framework for its SSR/Static Generation capabilities and robust App Router for SEO. |
| React | ^19.0.0 | Latest UI library for component-based architecture and experimental performance hooks. |
| TypeScript | ^5.8.3 | Enforces strict type-safety across the entire repository, reducing runtime errors. |
| **Styling** | | |
| Tailwind CSS | ^3.4.17 | Utility-first styling for rapid, responsive design and consistent theme variables. |
| Framer Motion| ^12.6.5 | Orchestrates complex UI transitions, spring-physics, and scroll-linked animations. |
| **Data & State**| | |
| Next-Themes | ^0.4.6 | Manages the global theme state (`cyberpunk`, `midnight`) with SSR support. |
| Zod | ^3.24.2 | Validates both client-side form inputs and server-side environment variables. |
| React Hook Form| ^7.55.0 | Handles complex form state and validation logic for the Contact section. |
| **Communications**| | |
| Resend | ^4.5.1 | Reliable API-based email delivery for secure server-to-user communication. |
| Prism.js | ^1.30.0 | Lightweight code highlighter for technical blog summaries and code blocks. |

---

## 4. Exhaustive Feature Catalog

### 🎨 Immersive Visuals & UX Engine
- **3D Interactive Tilt Cards** ⭐
  - **Function:** Uses advanced spring-based physics to calculate mouse position and apply a realistic perspective tilt to featured project cards.
  - **Experience:** Cards react subtly to every mouse movement, creating a "physical" depth effect.
- **Stacked Scroll Experience** ⭐
  - **Function:** A sophisticated sticky-positioning system where cards stack on top of each other and scale down dynamically as the user scrolls.
  - **Experience:** Provides a high-end "presentation" feel to the Work Experience section.
- **Spider Network Particle Canvas** ⭐
  - **Function:** A custom background engine rendering 100+ particles that connect via dynamic lines when in proximity. 
  - **Experience:** Interactive background that follows the mouse and pauses when off-screen to save battery and performance.
- **Dynamic Theme Customizer**
  - **Function:** A real-time UI menu to switch between "Cyberpunk", "Light", and "Midnight" themes, modifying global CSS variables instantly.
  - **Experience:** Users can tailor the entire website aesthetic to their preference with a single click.
- **Grayscale-to-Color Personal Photo**
  - **Function:** Applies an image-processing transition to the profile photo on hover.
  - **Experience:** Subtle professional touch that adds personality to the About section.

### ✍️ Content & Blog Logic
- **Hybrid MDX/PDF Blog Engine** ⭐
  - **Function:** Scans the local filesystem for both MDX files and PDF documents, merging them into a unified list with formatted metadata.
  - **Experience:** Allows for hosting traditional articles and formal technical documents side-by-side.
- **Reading Progress Navigation**
  - **Function:** A dynamic bar that tracks the vertical scroll percentage of an article and displays it at the top of the viewport.
  - **Experience:** Readers can easily gauge the length of technical articles.
- **Automated Metadata Generator**
  - **Function:** Extracts frontmatter (title, date, tags) from MDX files to generate dynamic SEO titles and social sharing tags.
  - **Experience:** Improved search engine visibility for every technical post without manual configuration.
- **Related Posts Algorithm**
  - **Function:** Analyzes the current post's index to provide "Previous" and "Next" navigation links at the foot of each post.
  - **Experience:** Encourages continuous reading and exploration of blog content.

### 🛡️ Technical & Performance Highlights
- **Device-Aware Performance Scaling** ⭐
  - **Function:** Detects mobile devices and automatically reduces particle density and animation complexity to ensure a smooth 60FPS experience.
  - **Experience:** The site feels fast and responsive even on low-powered mobile devices.
- **Intersection-Linked Reveals**
  - **Function:** Uses the IntersectionObserver API to trigger entrance animations (reveal, fade-in, slide) only when sections enter the user's viewport.
  - **Experience:** Prevents hidden animations from consuming resources and creates a "revealing" scroll effect.
- **Type-Safe Server Actions**
  - **Function:** Securely handles message submissions by passing data through a Zod-validated server-side execution pipeline.
  - **Experience:** Robust, fast feedback on contact forms with zero client-side exposed API keys.
- **Dynamic Component Deferral**
  - **Function:** Uses Next.js Dynamic Imports with `ssr: false` for heavy canvas components.
  - **Experience:** Drastically reduces the "Time to Interactive" (TTI) by loading decorative elements after critical content.

### 💼 Career & Productivity Tools
- **Career Timeline Tracker**
  - **Function:** A vertical visual history of professional roles with pulsing "Active" status indicators and holographic tech tags.
  - **Experience:** Provides an at-a-glance view of career progression and current Availability.
- **Project Metrics Strip**
  - **Function:** Visual counters for "Delivery Time", "Revisions", and "Status" on freelance projects.
  - **Experience:** Transparently showcases project management and delivery capabilities.

---

## 5. Project Structure

```text
aniket-portfolio/
├── app/                            # Next.js App Router (entry points & actions)
│   ├── actions/                    # Server Actions
│   │   └── contact.ts              # Zod validation + Resend API logic
│   ├── blog/                       # Dynamic blog pages
│   │   ├── page.tsx                # Blog archive / listing
│   │   └── [slug]/                 # Individual post template
│   │       └── page.tsx            # generateMetadata + generateStaticParams
│   ├── globals.css                 # Base Tailwind + Custom UI Utilities
│   ├── layout.tsx                  # Root layout (fonts, providers, global animations)
│   ├── not-found.tsx               # Custom 404 experience
│   ├── page.tsx                    # Homepage (Composition of sections)
│   ├── robots.ts                   # Search engine instructions
│   └── sitemap.ts                  # Auto-generated XML sitemap
├── components/                     # Modular component library
│   ├── analytics/                  # Vercel, Google, & Umami scripts
│   │   ├── AnalyticsEvents.tsx     # Custom event tracking
│   │   ├── GoogleAnalytics.tsx     # G-tag integration
│   │   └── UmamiAnalytics.tsx      # Umami self-hosted script
│   ├── animations/                 # Reusable Framer Motion components
│   │   ├── AnimatedTitle.tsx       # Staggered letter animations
│   │   ├── MotionWrapper.tsx       # Page transition logic
│   │   ├── SectionReveal.tsx       # Scroll-into-view revealing
│   │   ├── SpotlightReveal.tsx     # Cursor-gradient revealing
│   │   ├── SpotlightText.tsx       # High-contrast text reveals
│   │   └── Typewriter.tsx          # Dynamic hero typing simulation
│   ├── blog/                       # Post-level UI components
│   │   ├── CodeHighlighter.tsx     # Prism.js implementation
│   │   ├── PdfViewer.tsx           # Embedded document renderer
│   │   └── ReadingProgress.tsx     # Dynamic scroll depth bar
│   ├── layout/                     # Persistent shell components
│   │   ├── ClientLayoutProviders.ts# Context & Theme wrapper
│   │   ├── Footer.tsx              # Modular footer with links
│   │   ├── MobileNav.tsx           # Responsive hamburger + focus trap
│   │   ├── Navbar.tsx              # Sticky header shell
│   │   └── NavLinks.tsx            # Scroll-active tracking links
│   ├── sections/                   # Singular page view components
│   │   ├── About.tsx               # Interactive profile & stats
│   │   ├── BlogPreview.tsx         # Latest articles listing
│   │   ├── Contact.tsx             # Contact shell & link logic
│   │   ├── Education.tsx           # Academic history & highlights
│   │   ├── Hero.tsx                # Interactive landing experience
│   │   ├── Projects.tsx            # Filterable project grid
│   │   ├── Services.tsx            # Professional offerings
│   │   ├── Skills.tsx              # Categorized tech arsenal
│   │   └── WorkExperience.tsx      # Stacked card scroll experience
│   ├── shared/                     # Cross-component primitives
│   │   ├── ContactForm.tsx         # Zod + React Hook Form component
│   │   └── ProjectCard.tsx         # Responsive grid card logic
│   ├── theme/                      # Dynamic styling logic
│   │   ├── ThemeCustomizer.tsx     # Real-time UI theme switcher
│   │   ├── ThemeProvider.tsx       # Next-themes implementation
│   │   └── ThemeToggle.tsx         # Mode switching trigger
│   └── ui/                         # Atomic interface elements
│       ├── CopyButton.tsx          # Clipboard interaction
│       ├── index.ts                # UI barrel export
│       ├── ScrollToTop.tsx         # Floating action button
│       └── Toast.tsx               # Auto-dismissing notifications
├── content/                        # Content Management
│   └── blog/                       # Article source files (.mdx)
├── hooks/                          # Custom logic abstractions
│   └── index.ts                    # useActiveSection, useReducedMotion
├── lib/                            # Data & Utility Layer
│   ├── blog.ts                     # MDX/PDF file system parsers
│   ├── constants.ts                # Global strings & config
│   ├── experience.ts               # Timeline data & career records
│   ├── projects.ts                 # Project portfolio descriptions
│   └── skills.ts                   # Technical proficiency mapping
├── public/                         # Static assets & public storage
│   ├── Aniket_Raj_Resume.pdf       # Downloadable resume asset
│   ├── og-image.png                # Meta social share image
│   ├── content/                    # Large public files
│   │   └── pdfs/                   # Technical documents for blog
│   └── images/                     # Project screenshots & personal photos
├── scripts/                        # Automation & maintenance
│   ├── migrations/                 # Data structure update scripts
│   └── utils/                      # Internal codebase tools
├── types/                          # Shared TypeScript definitions
│   └── index.ts                    # Core interfaces (Post, Project, Experience)
├── next.config.mjs                 # Framework configuration
├── package.json                    # Dependencies & scripts
├── tailwind.config.ts              # Design system tokens & colors
└── tsconfig.json                   # TypeScript compiler configuration
```


---

## 6. State Management & Data Flow

### Global State Strategy
The project utilizes **Next-Themes** and standard **React State** for UI-specific flows.
- **Theme State:** Managed globally to persist user preference (`cyberpunk`, `midnight`, etc.) across visits.
- **Interaction State:** Tracks active sections on scroll to highlight the corresponding item in the Navbar.
- **Form State:** `react-hook-form` manages the complex lifecycle of the Contact section, from input focus to server-side submission feedback.

### Data Walkthrough: "Sending a Contact Message"
1. **Validation:** User inputs are validated in real-time on the client using a Zod schema.
2. **Transmission:** The data is passed to a **Server Action**, ensuring the Resend API key is never exposed to the browser.
3. **Execution:** The server re-validates the payload, prepares a HTML template, and calls the Resend API.
4. **Feedback:** A success or error result is returned, triggering a global `Toast` notification and resetting the form on success.

---

## 7. Browser APIs & Technical Highlights

### Native Browser APIs Used
- **Canvas API**: Powers the high-performance Spider Network and Mouse Trail.
- **IntersectionObserver API**: Controls section reveal animations and pauses background processes when off-screen.
- **MatchMedia API**: Detects "Prefers Reduced Motion" OS settings to automatically disable intensive animations for accessibility.
- **Clipboard API**: Powers the one-click copy functionality in the Contact section.
- **requestAnimationFrame**: Orchestrates the rendering loops for canvases to match the user's screen refresh rate.

---
Built with ⚡ by **Aniket Raj**
