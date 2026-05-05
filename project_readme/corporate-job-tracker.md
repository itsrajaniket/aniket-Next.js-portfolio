# 🏢 Corporate Job Search Tracker

[![React](https://img.shields.io/badge/React-19.2.4-blue.svg?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.9.0-FFCA28.svg?style=flat&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.1-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## 1. Project Overview
- **What is this project?** A high-performance React application designed to act as a centralized command center for job seekers targeting Indian corporate and IT sectors.
- **What real problem does it solve and who is it built for?** Tracking applications across hundreds of companies manually (via spreadsheets) is tedious and error-prone. This app provides a pre-built, searchable database of 550+ companies with vital stats (Notice Period, Buyout policy), allowing job seekers to instantly track their status, compute realistic take-home salaries, and safely sync their journey to the cloud. 
- **Value Proposition:** Track 550+ companies, compare realtime market metrics, and cloud-sync your corporate job search journey—all in one secure, high-performance dashboard.

---

## 2. Live Demo & Visuals
- **Live Demo Link:** [https://corporate-job-tracker.vercel.app/]

### Screenshots
- ![Dashboard View](/images/projects/job-dashboard.png)
- ![Market Analytics Charts](/images/projects/job-analytics.png)
- ![Salary & Career Tools](/images/projects/job-calculators.png)

---

## 3. Tech Stack & Choices

| Technology | Version | Category | Why Chosen |
|------------|---------|----------|------------|
| **React** | `^19.2.4` | Core | Component-based UI architecture enabling reusable pieces like `ToolCard` and highly reactive interfaces for live-filtering the massive company list. |
| **Vite** | `^7.3.1` | Dev Tools | Lightning-fast build times and Hot Module Replacement (HMR) significantly outperforming Create React App for rapid development. |
| **Tailwind CSS** | `^4.2.1` | Styling | Utility-first framework used for rapid, inline styling, creating complex layouts (glassmorphism in `HeroStats`) without context switching between CSS files. |
| **Firebase** | `^12.9.0` | Storage & APIs | Provides effortless authentication (`GoogleAuthProvider`) and real-time NoSQL cloud synchronization (`Firestore`) for user data. |
| **Chart.js / React-Chartjs-2** | `^4.5.1` / `^5.3.1` | Data Viz | Robust and responsive rendering engine used in `MarketCharts.jsx` to visualize complex notice period and buyout aggregations elegantly. |
| **Custom Hooks** `useLocalStorage` | N/A | State Management | Guarantees an offline-first experience; user states are immediately saved locally before being pushed to the cloud. |

---

## 4. Core Features

- ⭐ **Cloud-Synced Master Tracker:**  
  *What it does:* A dynamic table loading a base of 550+ companies, allowing users to search, filter by industry/policy, and update their application status.  
  *User Experience:* Users click a row, change the dropdown to "Applied" or "Interview", and the data instantly updates locally and securely syncs to their Firebase account. The UI updates the progress bars globally.

- ⭐ **Live Market Data Dashboard:**  
  *What it does:* Aggregates the static `companyData` database to render interactive Doughnut and Bar charts mapping out Industry Distributions, Buyout Availability, and Notice Periods.  
  *User Experience:* Users see at a glance what percentage of service-based companies actually offer buyouts, aiding in negotiation strategies.

- **Comprehensive Career Calculators Suite:**  
  *What it does:* A suite of 6 precise tools (`CareerTools.jsx`) powered by a central utility (`salaryUtils.js`) to help users plan their career finances and timelines:
  - **Tenure Calculator:** Calculates exact time (Years/Months/Days) spent at a company and highlights Gratuity Eligibility (5+ Years).
  - **Exit Date Calculator:** Calculates the exact Last Working Day (LWD) given a resignation date and notice period (30/45/60/90 days).
  - **In-Hand Calculator:** Computes approximate monthly take-home salaries based on annual CTC factoring in the New Tax Regime.
  - **Tax Breakup Calculator:** Breaks down the exact Monthly EPF, Monthly Tax deductions, and Take Home Pay.
  - **Hourly Value Tool:** Calculates true hourly take-home pay based on annual CTC and adjustable hours worked per week (slider from 20 to 80 hrs).
  - **Compare Offers:** Compares current CTC vs a New Offer CTC side-by-side, detailing the exact monthly in-hand difference and yearly tax implications.
  *User Experience:* Each tool is presented as an interactive, beautifully styled `ToolCard` that auto-calculates instantly as users adjust inputs and sliders.

- **Local Backup & Restore Engine:**  
  *What it does:* Allows users to export their current application states and custom-added companies directly into a JSON file, and restore from it later.  
  *User Experience:* Accessible via the `Navbar`, clicking "Backup" securely downloads a local JSON file directly to their hardware without server interaction.

- **Custom Company Integrations:**  
  *What it does:* Facilitates merging user-defined companies with the static 550+ list using duplicate-blocking logic.  
  *User Experience:* Using the `CustomCompanyForm`, users add local startups. These merge seamlessly into the main tracking table. 

---

## 5. Project Structure

```text
Corporate-Job-Search/
├── index.html                   # Entry point for Vite
├── package.json                 # Project metadata & NPM dependencies
├── vite.config.js               # Vite bundler configuration
├── eslint.config.js             # ESLint linting configuration
├── public/                      # Static uncompiled assets
└── src/                         # Main source directory
    ├── App.jsx                  # Main wrapper, Auth Logic & Data Sync
    ├── main.jsx                 # React DOM root rendering
    ├── firebase.js              # SDK Config: Authentication & Firestore
    ├── index.css                # Global Tailwind CSS entry
    ├── assets/                  # Compiled assets & images
    │   └── bg.jpeg 
    ├── data/
    │   └── companyData.jsx      # Core Database: Array of 550+ companies
    ├── hooks/
    │   └── useLocalStorage.js   # Custom hook for resilient local offline storage
    └── components/              
        ├── layout/
        │   ├── Navbar.jsx       # Top navigation, Auth State & JSON Export
        │   └── Footer.jsx       # Global footer
        ├── hero/
        │   └── HeroStats.jsx    # Banner processing and displaying live statistics
        ├── tracker/
        │   ├── Tracker.jsx      # Master container bridging filters & data table
        │   ├── CompanyTable.jsx # Row-mapping core datatable
        │   ├── FilterBar.jsx    # Clickable tag-based filtering rules
        │   └── CustomCompanyForm.jsx # Addition of unlisted startups
        ├── dashboard/
        │   └── MarketCharts.jsx # Chart.js wrapper for notice / sector rendering
        ├── checkout/
        │   └── PremiumUpgrade.jsx # Gateway scaffolding using Razorpay
        └── calculators/         # Suite of mathematical utilities
            ├── CareerTools.jsx      # Grid wrapper for all below calculators
            ├── SalaryCalculator.jsx # In-Hand calculation engine
            ├── TaxCalculator.jsx    # Exact EPF and Tax splits
            ├── ExitDateCalculator.jsx # LWD & notice period math
            ├── TenureCalculator.jsx # Date-object manipulation for time-at-job
            ├── FutureTool.jsx       # Dynamic hourly value projections
            ├── CompareOffers.jsx    # Side-by-Side CTC state tracking
            ├── ToolCard.jsx         # Isolated UI card layout component
            └── salaryUtils.js       # The mathematical core for the Tax Regime
```

---

## 6. State Management & Data Flow

### State Architecture
The global truth in this application is anchored in `src/App.jsx`. It utilizes hybrid state integration:
1. **`user` (`useState`)**: Retains the Firebase active session context resolving rendering gates (Tracker visibility).
2. **`trackerData` (`useLocalStorage`)**: A map tying Company Names (Keys) to Status Objects (Values: `{ status: "Applied", notes: "" }`).
3. **`customCompanies` (`useLocalStorage`)**: An array capturing companies added manually by the user.

### Data Flow Walkthrough: Updating a Job Status
When a user marks "Accenture" as "Interviewing":
1. The user action triggers `onUpdateTracker` localized inside `CompanyTable.jsx`.
2. This event bubbles up through `Tracker.jsx` into the root method `handleUpdateTracker` in `App.jsx`.
3. `App.jsx` executes a functional state update on `trackerData`, mutating the key for "Accenture" to hold `{ status: "Interview" }`.
4. The `useLocalStorage` hook inherently captures this mutation and fires a `window.localStorage.setItem` call to persist it locally.
5. In parallel, `App.jsx` executes the asynchronous `saveToCloud` function.
6. `saveToCloud` references `doc(db, "users", auth.currentUser.uid)` and pushes the absolute state snapshot to Firebase Firestore.
7. Below the state tree: `Tracker.jsx` recalculates its `useMemo` filter constraints, and `HeroStats.jsx` recalculates its aggregation counters, dynamically re-rendering the UI immediately across the board.

---

## 7. Browser APIs & Technical Highlights

### Native Browser APIs Utilized
- **`window.localStorage`**: Used heavily inside `src/hooks/useLocalStorage.js` to parse (`getItem`) and serialize (`setItem`) the core `trackerData` ensuring instantaneous app load states before remote network resolutions.
- **`FileReader API`**: Implemented in `src/components/layout/Navbar.jsx` (`handleFileChange`). When a user restores data, it leverages `readAsText` coupled with `onload` to stream and parse local JSON configurations securely into the component state.
- **Blob & Anchor Protocol `document.createElement('a')`**: Utilized in `Navbar.jsx` (`exportJSON`) to execute a local file export. It encodes the `localStorage` payload into a data URI (`data:text/json`) and triggers a programmatic `.click()` to save it offline bypassng a web server.
- **`window.confirm`**: Deployed in `App.jsx` (`handleResetData` & `handleDeleteCustomCompany`) as a rapid, native interruption pattern preventing accidental destructive state erasures.

### External Libraries Integration
- **Firebase Auth (`signInWithPopup`, `onAuthStateChanged`)**: Used in `App.jsx` and injected tightly with React's `useEffect`. Upon mount, it establishes an observer detecting auth context switches, enabling/disabling the core tracking interface instantly.
- **Firebase Firestore (`getDoc`, `setDoc`)**: Facilitates the BaaS (Backend as a Service) layer. Merges remote cloud states seamlessly into the local application state to enforce multi-device parity.
- **Chart.js via `react-chartjs-2`**: Mounted inside `src/components/dashboard/MarketCharts.jsx`. Accepts specifically formatted objects (`labels`, `datasets`) synthesized from the massive `companyData` layout array to construct mathematically representative `Doughnut` and `Bar` charts.

### Performance Optimizations
- **Memoized Filtering (`useMemo` in `Tracker.jsx`)**: The raw iteration over ~550 companies across complex cross-filters (Text Strings, Enum Checks, Custom Boolean flags) is wrapped in `useMemo`. This prevents standard React re-frames from running O(n) computations relentlessly on keystrokes in the search bar.
- **Component Sub-structuring**: Granular separation is enforced. Entering numbers into `SalaryCalculator.jsx` only triggers re-renders explicitly confined within `ToolCard.jsx` margins, utterly bypassing the heavy Virtual DOM load generated by `CompanyTable.jsx` and `MarketCharts.jsx`.
- **Deduplication Matrix**: Implemented inside `Tracker.jsx` utilizing `Array.from(new Map())` to intercept identically named entries in `companyData`, preventing React key collision errors seamlessly prior to render mapping.

---

## 8. Getting Started & Installation

To run this project locally, follow these steps:

### Prerequisites
- **Node.js**: v18 or higher recommended.
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd Corporate-Job-Search
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Firebase Configuration:**
   The Firebase Auth and Firestore database configuration is located in `src/firebase.js`. If you wish to use your own database instance, replace the `firebaseConfig` object in that file with your own credentials retrieved from the Firebase Console.

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will boot up and be accessible locally at `http://localhost:5173`.*

---

## 9. Roadmap (Upcoming Features)
- [ ] **Full Razorpay Integration:** Transition `PremiumUpgrade.jsx` from a gateway mockup to evaluating live webhook events for unlocking premium components in production.
- [ ] **PWA Support:** Convert the app into a Progressive Web App for true native-like desktop and mobile installation.
- [ ] **AI Cover Letter Generator:** Utilize an LLM API to generate customized cover letters based on the metadata saved in the tracker.

## 10. License & Contributing
This project is licensed under the **ISC License**. 

Contributions, issues, and feature requests are highly encouraged! If you'd like to contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
*Built intricately for job-seekers scaling the corporate ladder.*
