---
title: "Token Tracker for Claude"
description: "A deep dive into how I built a privacy-first token tracker for Claude.ai"
date: "2024-03-20"
tech: "JavaScript, Manifest V3, Web APIs"
---

# Token Tracker for Claude

Building a browser extension that interacts with a modern AI platform like Claude.ai comes with unique challenges, especially when you prioritize **privacy** and **performance**.

## The Problem
Claude.ai provides an amazing interface, but users often find it difficult to track their token usage or know exactly when their context cache will expire. I wanted to build a tool that solves this without ever touching user data.

## Key Features
- **Real-time Tracking**: Monitors token consumption as you type.
- **Context Cache Countdown**: A visual 5-minute timer for cache expiration.
- **Seamless Injection**: The UI looks like it belongs to Claude.ai.

## Technical Implementation
The extension uses **Manifest V3** for modern security standards. I implemented a mutation observer to watch for DOM changes in Claude's UI and inject the tracking bars dynamically.

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      injectTokenTracker();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
```

## Challenges Faced
One of the biggest hurdles was ensuring the extension didn't slow down the browser. By using efficient DOM manipulation and debouncing our update functions, I kept the overhead to a minimum.

## Conclusion
This project taught me a lot about browser extension architecture and the importance of "privacy-first" design in the age of AI.
