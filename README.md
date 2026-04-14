# Marvel Trackr — Frontend

A React single-page application for tracking your personal Marvel comic collection. Browse your collection by era, manage purchase status, track spending, upload cover art, and reorder books via drag-and-drop.

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React 18 (Create React App) |
| UI Components | React Bootstrap, Radix UI |
| Styling | Bootstrap 5, styled-components, CSS modules |
| Icons | Font Awesome 6, Radix Icons |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable |
| Animations | @react-spring/web, react-transition-group |
| Auth | JWT (stored in localStorage) |
| Testing | React Testing Library, Jest |

---

## Prerequisites

- Node.js (v16+) and npm
- [MCT-Backend](../MCT-Backend/README.md) running at `http://localhost:5000`

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app opens at **http://localhost:3000**. All `/api/*` requests are proxied to `http://localhost:5000`.

```bash
# Run tests
npm test

# Build for production
npm run build
```

---

## Project Structure

```
MCT/
├── public/
│   └── Images/               # Static image assets
├── src/
│   ├── App.js                # Root component — auth state, login modal
│   ├── components/
│   │   ├── AppHeader/            # Top navigation bar (login/logout, user display)
│   │   ├── ComicListDesktop.js   # Main list — fetches comics, drag-drop reorder
│   │   ├── ComicCardMobile.js    # Individual comic card with detail modal
│   │   ├── AddComic.js           # Create / edit comic form
│   │   ├── EventCard.js          # Full-width card for Marvel events
│   │   ├── EraHeader/            # Section header with per-era statistics
│   │   └── ProgressHeader/       # Global collection statistics bar
│   └── utils/
│       └── utils.js          # Star rendering and status bar helpers
└── package.json
```

---

## Authentication

The app uses JWT Bearer token authentication.

- On load, the stored token (`mct_token`) and user (`mct_user`) are read from `localStorage` and their expiry is validated.
- Login sends `POST /api/users/login` with `{ email, password }` and stores the returned `{ token, username }`.
- Authenticated requests include `Authorization: Bearer <token>` in the header.
- Logout clears both localStorage keys and resets app state.
- Read-only actions (viewing comics) do not require login.

---

## Key Features

### Collection Management
- Add, edit, and delete comics with full metadata
- Drag-and-drop reordering (enable via the **Edit** mode toggle)
- Comics are grouped by **Era** (e.g., Silver Age, Modern Age)

### Metadata Fields

| Field | Description |
|---|---|
| Title | Comic or trade paperback title |
| Year | Publication year |
| Era | Collection era / reading order group |
| Description | Summary or notes |
| Purchase Status | Not Purchased → Ordered → Pre-Ordered → Purchased |
| Format | Hardcover or Paperback |
| Cover Art | Uploaded image (served from the backend) |
| Key Characters | Tagged characters with autocomplete suggestions |
| Issues | Collected issues (e.g., "Collects SERIES #1–14") |
| Rating | 0–5 stars with half-star increments |
| Pages | Page count |
| Cost | Price in USD |
| Link | Amazon or retailer link |
| Event | Marks the book as a Marvel event (full-width card) |

### Statistics
- **ProgressHeader** — overall progress bar, total spent, total pages, average rating
- **EraTitle** — per-era comic count, spending, pages, and average rating

---

## API Integration

The frontend proxies requests to the backend via the `"proxy"` field in `package.json`.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/users/login` | No | Authenticate user |
| GET | `/api/comics` | No | Fetch all comics |
| POST | `/api/comics` | Yes | Create comic |
| PUT | `/api/comics/:id` | Yes | Update comic |
| DELETE | `/api/comics/:id` | Yes | Delete comic |
| POST | `/api/comics/reorder` | Yes | Save drag-drop order |
| POST | `/api/comics/upload` | Yes | Upload cover art image |

Cover art images are served directly from the backend at `http://localhost:5000/images/<filename>`.

---

## Environment Variables

The app currently uses no `.env` file — the backend URL is set via the proxy in `package.json`. For a production deployment, update the proxy target or introduce a `REACT_APP_API_BASE_URL` environment variable.
