# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Tech Stack

### Core Framework & Library

- **React** (v19.2.0) - UI framework
- **React DOM** (v19.2.0) - React rendering for web
- **React Router DOM** (v7.9.6) - Client-side routing

### Build Tool & Development

- **Vite** (v7.2.4) - Build tool and development server
- **@vitejs/plugin-react** (v5.1.1) - React plugin for Vite

### Styling

- **Tailwind CSS** (v4.1.17) - Utility-first CSS framework
- **@tailwindcss/vite** (v4.1.17) - Tailwind CSS plugin for Vite

### UI Components & Icons

- **@heroicons/react** (v2.2.0) - Icon library

### Form Handling

- **React Hook Form** (v7.66.1) - Form state management

### Code Quality & Linting

- **ESLint** (v9.39.1) - JavaScript linter
- **@eslint/js** (v9.39.1) - ESLint configuration
- **eslint-plugin-react-hooks** (v7.0.1) - Rules for React hooks
- **eslint-plugin-react-refresh** (v0.4.24) - React Fast Refresh support

### TypeScript Support

- **@types/react** (v19.2.5)
- **@types/react-dom** (v19.2.3)

**Summary:** This project uses React 19 with Vite as the build tool, Tailwind CSS for styling, React Router for routing, React Hook Form for form management, and Heroicons for icons.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:

```bash
cd cnpm/frontend
```

2. Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To check code quality with ESLint:

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
