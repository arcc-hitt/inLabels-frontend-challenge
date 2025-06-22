## Svelte Notes App

A simple, responsive note-taking web application built with **Svelte**, **TypeScript**, **Vite**, and **Tailwind CSS**. It interacts with a MockAPI backend to **view**, **create**, **update**, and **delete** notes. Additional features include:

* **Pagination** (10 notes per page)
* **Sorting** (by creation date or title, ascending/descending)
* **Search** (filter notes by title)
* **Confirmation modal** for deletes
* **Light/Dark theme toggle** (system default, manual override)
* **Form validation** with inline error messages
* **Backdrop blur** modals
* **Responsive layout** (mobile→desktop)

✅ **Deployed at:** https://in-labels-frontend-challenge.vercel.app/

---


### 🚀 Features

1. **Display Notes**

   * Fetches from `GET /notes` on load and on any filter/sort/page change.
2. **Create Note**

   * Validated form (`title`, `content`) with inline errors.
   * Sends `POST /notes` with client-generated `createdAt`.
3. **Edit Note**

   * “Edit” button opens a blurred-backdrop modal.
   * Validated inline, sends `PUT /notes/:id` with `updatedAt`.
4. **Delete Note**

   * “Delete” button opens a confirmation modal.
   * Sends `DELETE /notes/:id`, handles missing IDs gracefully.
5. **Pagination**

   * 10 notes per page; shows “Page X of Y.”
6. **Sorting & Search**

   * Sort by `createdAt` or `title`, asc/desc.
   * Fuzzy search via MockAPI’s `search` param.
7. **Theme Toggle**

   * System preference by default; cycles between “System ⇄ Dark ⇄ Light.”
   * Persists in `localStorage`.
8. **Responsive Design**

   * Single-column mobile layout; two-column grid on `md+`.
   * Adaptive padding/margins across breakpoints.

---

### 🛠 Tech Stack

* **Svelte** + **TypeScript**
* **Vite** (dev server & bundler)
* **Tailwind CSS v4** (utility-first styling, dark-mode via media + class)
* **Fetch API** for HTTP
* **MockAPI.io** for fake REST endpoints

---

### 🔧 Prerequisites

* Node.js ≥ 16
* NPM or Yarn

---

### 💻 Getting Started

1. **Clone & install**

   ```bash
   git clone https://github.com/arcc-hitt/inLabels-frontend-challenge.git
   cd inLabels-frontend-challenge
   npm install
   ```

2. **Configure your MockAPI endpoint**

   * Sign up at [https://mockapi.io](https://mockapi.io)
   * Create a “notes” resource with fields:

     * `title` (String)
     * `content` (String)
     * `createdAt` (Date Time)
     * `updatedAt` (Date Time)
   * Copy your base URL and update `BASE_URL` in `src/lib/api.ts`.

3. **Run dev server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:5173](http://localhost:5173).

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

### 🎯 Trade-offs & Assumptions

* **Client-generated timestamps** ensure accurate creation/edit times, rather than Faker’s random dates.
* **Synchronous reload** after each mutation (no optimistic UI) for simplicity and correctness.
* **Single-component state** in `App.svelte` rather than external stores, to keep it approachable.
* **Error handling** centralized via a small helper to avoid repetition.

---

### 📊 Future Improvements

* **Optimistic updates** with rollback on failure for snappier UX.
* **Infinite scroll** in place of pagination.
* **Debounced search** to reduce network calls.
* **User authentication** and per-user note ownership.
* **Tagging/Categorization** and bulk-delete actions.
* **Unit/Integration tests** (e.g. with Vitest & Playwright).

---
