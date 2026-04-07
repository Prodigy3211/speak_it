# speak_it (Web)
"A New Social Website Meant to Act as a Public Square"

Speak-It is a production web application that serves as the browser-based interface for a cross-platform social platform, alongside a React Native mobile app available on the Apple App Store.

🌐 Live App: https://speak-it-three.vercel.app/

Overview

Speak-It is designed as a simple, public-facing platform where users can create and interact with short-form content. The web app shares a backend with the mobile application, demonstrating a unified full-stack architecture across platforms.

This project focuses on building a scalable React frontend that integrates with a shared API layer powered by Supabase.

Features
Create and view user-generated posts
Shared data layer between web and mobile apps
Responsive UI for desktop and mobile browsers
Real-time or near real-time data updates via Supabase
Consistent design and functionality across platforms
Tech Stack
React
JavaScript (ES6+)
Supabase (PostgreSQL + REST API)
Vercel (deployment)
Architecture
Frontend built in React (web)
Mobile app built in React Native (separate repo)
Shared backend powered by Supabase
RESTful API used by both web and mobile clients

This structure allows both platforms to operate on the same data model while maintaining platform-specific UI implementations.

Key Focus Areas
Cross-platform consistency (web + mobile)
API integration and data synchronization
Component-based frontend architecture
Deployment and production readiness

Getting Started
npm install
npm run start

Related Project

📱 Speak-It Mobile (React Native) – Available on the Apple App Store

Author

Amir Nasser