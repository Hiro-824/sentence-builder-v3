# Sentence Builder

Sentence Builder is a web-based English learning application designed to teach sentence construction through intuitive, tactile interaction. It moves beyond traditional rote memorization of abstract rules, allowing users to discover the mechanics of English grammar organically by assembling sentences from word blocks and receiving immediate linguistic feedback.

At its core, the application is powered by a custom, client-side, unification-based grammar engine that validates sentence structures in real-time and generates corresponding Japanese translations.

**Live Demo:** [https://sentence-builder.hirodevs.com](https://sentence-builder.hirodevs.com)

---

## Table of Contents

-   [Core Philosophy](#core-philosophy)
-   [Key Features](#key-features)
-   [Technology Stack](#technology-stack)
-   [Architectural Deep Dive](#architectural-deep-dive)
    -   [The Brains: A Unification-Based Grammar Engine](#the-brains-a-unification-based-grammar-engine)
    -   [The Canvas: The D3.js Rendering Engine](#the-canvas-the-d3js-rendering-engine)
    -   [The Backend: Supabase Integration](#the-backend-supabase-integration)
-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)

---

## Core Philosophy

Traditional language learning often relies on students memorizing explicit grammatical rules, which can be abstract and difficult to internalize. Sentence Builder is founded on a different pedagogical principle: **intuitive acquisition through experimentation**.

By providing a sandboxed environment where learners can freely combine linguistic units, the application encourages discovery. The immediate feedback loop—a sentence either "fits" together correctly or it doesn't—allows users to build a subconscious, functional understanding of grammar, much like a native speaker does. The goal is to make the process of learning syntax and morphology feel less like a chore and more like solving a puzzle.

---

## Key Features

*   **Drag-and-Drop Sentence Construction:** A tactile, block-based interface for building English phrases and sentences.
*   **Real-time Grammatical Validation:** A sophisticated linguistic engine validates structures as they are built, providing instant visual feedback on compatibility.
*   **Instant Japanese Translation:** The engine generates grammatically-aware Japanese translations based on the constructed sentence's underlying phrase structure.
*   **User Authentication & Project Saving:** Users can create accounts to save and load their "canvases," allowing for persistent learning sessions.
*   **Detailed Analytics Logging:** User interactions are logged to a database for potential future research into language acquisition patterns.
*   **Dynamic & Scalable Lexicon:** The system uses a "generator" pattern to programmatically create the rich linguistic data for each word block, making it easy to expand the vocabulary.

---

## Technology Stack

The project leverages a modern, robust, and type-safe technology stack.

| Category      | Technology                                                                                                                              |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**  | **Next.js 15** (App Router), **React 19**, **TypeScript**                                                                               |
| **Rendering** | **D3.js** (for SVG rendering, drag-and-drop, and zoom/pan functionality)                                                                  |
| **Backend**   | **Supabase** (Authentication, PostgreSQL Database for logging, Storage for project files)                                               |
| **Styling**   | **CSS Modules** & global CSS                                                                                                            |
| **Deployment**| Vercel (recommended)                                                                                                                    |

---

## Architectural Deep Dive

The application is architected with a clear separation of concerns between state management (React), rendering/interaction (D3.js), and linguistic analysis (the Grammar Engine).

### The Brains: A Unification-Based Grammar Engine

This is the intellectual core of the application. It is not a simple rule-based validator; it implements a formal grammar inspired by linguistic frameworks like **Head-driven Phrase Structure Grammar (HPSG)**. The entire engine runs on the client-side and consists of three main parts:

1.  **`generator.ts` (The Lexicon Factory):** This class programmatically generates the lexicon. Instead of hard-coding every verb form, for instance, it takes a `VerbConfig` object (containing the base form, complement structure, and translation stems) and produces all possible forms (`base`, `-s`, `-ed`, `-ing`, `-en`) along with their rich grammatical feature structures and translation templates. This makes the vocabulary highly maintainable and easily expandable.

2.  **`converter.ts` (The UI-to-Logic Bridge):** This class is the crucial intermediary between the visual D3 blocks and the abstract grammar engine. It traverses the nested visual hierarchy of blocks and converts it into a linearized `SubPhraseInput` that the parser can understand. It also handles post-parsing formatting, such as applying sentence case and adding terminal punctuation.

3.  **`grammar.ts` (The Parser):** This is the heart of the engine. It operates on the principle of **unification**.
    *   **Feature Structures:** Every word and phrase is defined by a set of features (e.g., `{case: "nom", agr: {num: "sing"}}`).
    *   **Constraint Satisfaction:** The `unify` function merges these structures. A combination is grammatically correct only if the feature structures can be unified without conflict (e.g., a subject requiring a singular verb will fail to unify with a plural verb).
    *   **Gap Handling:** The parser correctly handles long-distance dependencies found in questions ("*What* did you see \_\_?") and relative clauses, a notoriously difficult problem in NLP.
    *   **Grammatically-Aware Translation:** The translation engine uses templates that operate on the *parsed grammatical structure*, not the surface-level block order. This allows it to correctly handle word order differences and particle placement between English and Japanese.

### The Canvas: The D3.js Rendering Engine

While React manages the overall application state, all direct rendering and interaction on the SVG canvas are delegated to a powerful, self-contained `renderer.js` class. This was an intentional architectural choice to leverage D3's strengths in dynamic SVG manipulation and complex user interaction. The renderer is responsible for:
*   Calculating the dimensions of each block dynamically based on its content.
*   Managing all drag-and-drop events.
*   Detecting overlaps between blocks and placeholders.
*   Communicating with the Grammar Engine during a drag to provide real-time validation feedback (coloring placeholders yellow for valid drops, red for invalid).
*   Handling canvas zoom and pan functionality.

### The Backend: Supabase Integration

Supabase is used as a comprehensive Backend-as-a-Service (BaaS):
*   **Authentication:** Manages user accounts and sessions.
*   **Storage:** Each user's project (the state of their block canvas) is serialized to a JSON file and stored in a user-specific folder in Supabase Storage.
*   **Database (Postgres):** A sophisticated `LoggingService` captures detailed, sequential event data (session start/end, block creation, deletion, insertion, etc.) and stores it in relational `sessions` and `events` tables for analytics and user research purposes.

---

## Getting Started

To run this project locally, you will need a Supabase account.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sentence-builder.git
    cd sentence-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your Supabase project:**
    *   Create a new project on [supabase.com](https://supabase.com).
    *   In your project's dashboard, go to the **Storage** section and create a new bucket named `projects`.
    *   Go to **Project Settings** > **API**. Find your Project URL and your `anon` public key.

4.  **Configure environment variables:**
    *   Create a file named `.env.local` in the root of the project.
    *   Add your Supabase credentials to this file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

5.  **Set up Supabase Storage Policies:**
    *   For the `projects` bucket to work correctly, you need to set up Row Level Security (RLS) policies. Go to **Storage** > **Policies**.
    *   Create policies that allow authenticated users to `SELECT`, `INSERT`, `UPDATE`, and `DELETE` their own files within a folder named after their `user_id`. (Refer to Supabase documentation for creating storage policies).

6.  **Run the development server:**
    ```bash
    npm run dev
    ```    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Project Structure

The codebase is organized with a clear separation of concerns:

```
/
├── app/                  # Next.js App Router pages and layouts
├── components/           # React components used across the application
├── data/                 # The lexicon: definitions for all word blocks
├── grammar/              # The core linguistic engine (parser, converter, generator)
├── models/               # TypeScript interfaces for core data structures (Block, Project, etc.)
├── renderer/             # The D3.js rendering engine and its constants
└── utils/                # Utility functions, including Supabase client and API helpers
```
