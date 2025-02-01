This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
npm run dev

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

## Architectural Decisions:

1. Why Next.js? Utilized Next.js for its modern routing system, server components, which improve SEO and initial load performance.
2. State Management: Used Zustand for managing assets and currency conversions in a centralized store.
3. Components Architecture: Adopted the atomic design methodology, with reusable UI components under Common and page-specific components under Dashboard.
4. Type Safety: Leveraged TypeScript for API responses, props, interfaces, and enums to ensure type safety across the application.
5. Custom Hooks: Created the useAssets custom hook, which is used across multiple pages for managing and updating the state store.
6. API Fetch: Integrated Axios for API requests, with a utility function apiRequest for consistent API calls.
7. Real-time Prices: Used WebSockets to fetch real-time price data and update the dashboard with the latest values.
8. Utility Functions: Moved reusable functions to the utils folder to improve testability and optimize memory usage.
