# EssaiAI - Frontend

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture Overview](#architecture-overview)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Running the Project](#running-the-project)
8. [Backend Integration](#backend-integration)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

## Project Overview
EssaiAI is a stateless, privacy-first academic writing assistant. The frontend provides a sleek, modern, and highly responsive user interface for analyzing grammar, style, and structural alignment instantly. It features a rich text editor and dynamically handles specific document types (like formal letters, theses, and blog posts). To guarantee maximum privacy, absolutely zero data is stored persistently on any server; all drafts and user preferences are safely stored within your browser's `localStorage`.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Library:** React
- **Styling:** Tailwind CSS v4
- **Editor:** TipTap (Rich Text Editor)
- **Icons:** Lucide React
- **Typography:** Plus Jakarta Sans & Lora (Google Fonts)

## Architecture Overview
The frontend strictly handles presentation, state management, and user configurations. 
When an analysis is requested, the Next.js client securely packages the document text, grading criteria, and any user-provided LLM API keys. It then sends this payload directly to the stateless NestJS backend API. The frontend then streams or awaits the structured JSON response, rendering the "Notable Strengths", "Key Suggestions", and individual "Section Evaluations" into a beautiful, readable UI.

## Folder Structure
```text
frontend/
├── public/                # Static assets
├── src/
│   └── app/
│       ├── components/    # Reusable UI components (Sidebar, AnalysisPage, DraftsPage)
│       ├── globals.css    # Tailwind v4 configuration and global styles
│       ├── layout.tsx     # Root Next.js layout and typography setup
│       └── page.tsx       # Main workspace state and routing
├── .env.example           # Example environment variables
├── package.json           # Frontend dependencies
└── README.md              # This documentation
```

## Getting Started
### Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/essai-ai-frontend.git
cd essai-ai-frontend
npm install
```

## Environment Variables
The frontend relies on environment variables to know where to send analysis requests. Copy the `.env.example` file to create your own local configuration:
```bash
cp .env.example .env.local
```
Inside `.env.local`, set your backend API URL:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Running the Project
Start the Next.js development server:
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

## Backend Integration
This frontend is designed to work in tandem with the **EssaiAI Backend**. The backend is a stateless NestJS API that proxies requests to LLM providers. Ensure the backend is running locally on port 3001 for full end-to-end functionality.

## Deployment
This project is optimized for deployment on the [Vercel Platform](https://vercel.com) from the creators of Next.js.
When deploying, make sure to add the `NEXT_PUBLIC_API_BASE_URL` to your Vercel project's Environment Variables, pointing to your live backend domain.

## Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/amazing-ui`).
3. Commit your changes (`git commit -m 'Add some amazing UI'`).
4. Push to the branch (`git push origin feature/amazing-ui`).
5. Open a Pull Request.

## License
Distributed under the MIT License.
