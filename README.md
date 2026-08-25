# 📄 Docx — Collaborative Document Editor (Google Docs Clone)

A full-featured, real-time collaborative document editor built with the latest web technologies. Users can create, edit, and share documents inside organization workspaces, with full support for comments, notifications, and multi-format export.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![Convex](https://img.shields.io/badge/Convex-DB-orange)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6c47ff)
![Liveblocks](https://img.shields.io/badge/Realtime-Liveblocks-000000)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

**🔗 Live Demo:** [docs-app-rust-three.vercel.app](https://docs-app-rust-three.vercel.app/)
**💻 Repository:** [github.com/Abdelrahman968/docs-app](https://github.com/Abdelrahman968/docs-app/)

---

## ✨ Key Features

| Feature                               | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| 📝 Rich Text Editor                   | Powerful rich text editing powered by Tiptap            |
| 🤝 Real-time Collaboration & Database | Multi-user real-time collaboration with a live database |
| 💭 Comments and Mentions              | In-document comments and user mentions                  |
| 🔔 Notifications System               | Complete notifications system                           |
| 📑 Document Templates                 | Ready-made document templates                           |
| 📋 Copy and Paste Formatting          | Paste content while preserving formatting               |
| ↩️ Undo/Redo History                  | Full edit history with undo/redo                        |
| 📊 Table Support                      | Insert and manage tables                                |
| 🖼️ Image Uploads                      | Upload images directly into documents                   |
| 📏 Margin Controls                    | Interactive ruler for margin control                    |
| ⬇️ Export                             | Export to PDF, HTML, TXT, and JSON                      |
| 👥 User Profiles                      | User profile management                                 |
| 🏢 Organization Workspaces            | Dedicated workspaces for organizations                  |
| ✉️ Organization Invites               | Invite members to join an organization                  |
| 🔒 Authentication                     | Secure authentication via Clerk                         |
| 📱 Responsive Design                  | Fully responsive across all devices                     |
| 🎯 Cursor Tracking                    | Real-time tracking of other users' cursors              |
| 🎨 Text Formatting Tools              | Font, color, size, and style tools                      |
| 📝 Lists and Checklists               | Bulleted, numbered, and task lists                      |
| 🔗 Link Embedding                     | Insert and manage links                                 |

---

## 🧱 Tech Stack

- **⚛️ Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **🎨 UI:** [Shadcn UI](https://ui.shadcn.com) + [Tailwind CSS 4](https://tailwindcss.com)
- **📝 Editor:** [Tiptap 3](https://tiptap.dev) (with custom extensions: Font Size, Line Height...)
- **🤝 Real-time Collaboration:** [Liveblocks](https://liveblocks.io) (`@liveblocks/react-tiptap`)
- **🗄️ Database:** [Convex](https://convex.dev)
- **🔐 Authentication:** [Clerk](https://clerk.com)
- **🗂️ State Management:** [Zustand](https://zustand-demo.pmnd.rs)
- **📦 Other libraries:** `docx`, `date-fns`, `nuqs`, `react-icons`, `recharts`, `embla-carousel`
- **🚀 Hosting:** [Vercel](https://vercel.com)

---

## 📂 Project Structure

```
docx-app/
├── convex/                    # Backend & database (Convex functions & schema)
├── public/                    # Public assets (logos, icons)
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login pages
│   │   ├── (protected)/       # Protected pages (documents, editor)
│   │   │   └── documents/[documentId]/  # Collaborative editor page
│   │   ├── (root)/            # Home page and documents list
│   │   └── api/                # Route Handlers (export-docx, liveblocks-auth)
│   ├── components/ui/          # Shadcn UI components
│   ├── constants/              # Constants (fonts, margins, templates...)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility/helper functions
│   └── store/                  # Zustand editor store
├── liveblocks.config.ts        # Liveblocks configuration
└── package.json
```

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/Abdelrahman968/docs-app.git
cd docs-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root and add the following keys:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
CLERK_JWT_ISSUER_DOMAIN=

# Liveblocks
LIVEBLOCKS_SECRET_KEY=
```

### 4. Start Convex (in a separate terminal)

```bash
npx convex dev
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the production bundle  |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint checks            |

---

## GitHub Commit History

1. Project structure
2. Tiptap editor
3. Tiptap extensions
4. Editor store
5. Editor tools
6. Font family & headings tools
7. Color tools (text & highlight)
8. Link and image tools
9. Align and list tools
10. Font size tool (custom extension)
11. Line height tool (custom extension)
12. Margin ruler component
13. Navigation bar component
14. Navigation bar tools
15. Search input component
16. Template gallery component
17. Database setup (Convex)
18. Authentication setup (Clerk)
19. Create and list documents
20. Update and delete documents
21. Search documents
22. Organizations feature
23. Collaboration setup (Liveblocks)
24. Room permissions
25. Populate user information
26. Notifications feature
27. Collaborative margin ruler
28. Document information
29. Templates initial content & app optimization & SEO
30. Deploying the website

---

## 🚀 Deployment

The project is ready to deploy directly on [Vercel](https://vercel.com):

```bash
vercel deploy
```

Make sure to add the same environment variables in your Vercel project settings.

Live version: **[docs-app-rust-three.vercel.app](https://docs-app-rust-three.vercel.app/)**

---

## 👤 Author

**Abdelrahman Ayman**
📧 se.abdelrahman968@gmail.com
💻 [github.com/Abdelrahman968](https://github.com/Abdelrahman968/)

---

## 📄 License

This project is available for educational and demonstration purposes. Feel free to fork, modify, and use it.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Tiptap](https://tiptap.dev)
- [Liveblocks](https://liveblocks.io)
- [Convex](https://convex.dev)
- [Clerk](https://clerk.com)
- [Shadcn UI](https://ui.shadcn.com)
