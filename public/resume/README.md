# Resume Folder

**CRITICAL: You MUST name your file exactly `resume.pdf` inside this folder.**

Because Next.js needs a static link to point to, your code is always looking for `/resume/resume.pdf`. 

However, you don't need to worry about what visitors see! I have configured the server's HTTP Headers (`next.config.mjs`) so that whenever someone clicks download, the server forces the browser to save it as **`Aniket_Raj_AI_MERN_Full_Stack.pdf`**.

## How to update your resume:
1. Delete the old `resume.pdf` in this folder.
2. Drag your new PDF into this folder.
3. Rename your new file to exactly `resume.pdf`.

That's it! The portfolio handles the rest and ensures visitors download it with the professional, SEO-friendly filename.
