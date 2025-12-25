# BeyondChats Assignment

![Architecture](readmeassert/architecture.png)
A production-style system that scrapes live blog articles, stores them, runs an AI-style enhancement pipeline, and displays both versions (original vs enhanced) like a before/after content makeover.

👇 Live Demo — fully deployed & talking to each other

Layer	Live URL
🎨 Frontend	https://beyondchats-assignment-q4n2cmcs5-barathraj048s-projects.vercel.app/

⚙️ Backend API	https://beyondchats-assignment-hd7d.onrender.com/api/health
🧠 What This Project Does (TL;DR)
Step	Action	Layer
1️⃣	Scrape 5 blogs from BeyondChats site	Node.js + Cheerio
2️⃣	Store them in DB via REST API	Laravel
3️⃣	Enhance missing ones via pipeline	Mock AI (LLM-ready)
4️⃣	Show original + enhanced versions	React + Tailwind

✔ Modular | ✔ Production-minded | ✔ LLM ready | ✔ Partial Phase-2 implemented

🏗️ System Architecture
 Scraper (Node.js)
        ⬇
 Backend API (Laravel) → SQLite DB
        ⬆
 AI Enhancer (Node.js, LLM-Ready)
        ⬆
 Frontend (React + Vite + Tailwind)


Each service is independent → can scale, break or deploy separately like real SaaS.

⚙️ Tech Stack
Layer	Tech
Backend API	Laravel 12, PHP 8.3, SQLite
Frontend	React + TypeScript + Vite
Scraper	Node.js + Cheerio
AI Engine	Mock LLM pipeline (DeepSeek/GPT-ready)
Deployments	Render (Docker) for backend, Vercel for frontend
Styling	TailwindCSS
🌍 Deployment
🎯 Backend — Render (Docker)

https://beyondchats-assignment-hd7d.onrender.com

/api/health → returns system status

SQLite persisted in container

Served with Apache + PHP 8.3

🎯 Frontend — Vercel

https://beyondchats-assignment-q4n2cmcs5-barathraj048s-projects.vercel.app/

Rebuilds on push to main

💻 Run Locally
Backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

Scrape Articles
cd scraper
npm install
node scraper.js

Enhance via AI (Mock)
node aiEnhancer.js

Frontend
cd frontend
npm install
npm run dev


➡️ If backend is local, update:
frontend/src/config.js

export const API_BASE = "http://127.0.0.1:8000/api";

🔌 API Reference
Method	Endpoint	Purpose
GET	/api/health	Health check
GET	/api/articles	Fetch all articles
POST	/api/articles	Scraper saves new articles
PUT	/api/articles/{id}/enhance	Update enhanced version
GET	/api/articles/count	How many saved
GET	/api/articles/exists?title=	Avoid duplicates
🗄️ Database Schema (SQLite)

articles

id                INTEGER (PK)
title             TEXT
content           TEXT               // original HTML/text
updated_content   TEXT NULL          // AI enhanced
source            TEXT
created_at
updated_at


Stores HTML, not plain text → better for AI formatting & SEO.

🎯 Why I Built It This Way
Choice	Why
Separate pipelines	Background jobs shouldn't block API
HTML storage	Preserves UX + content semantics
SQLite	Simple deploy → can move to PostgreSQL easily
Docker for backend	Same environment local & cloud
Mock AI pipeline	LLM-ready without billing
🩹 Challenges → Solutions
Problem	What broke	Fix
Scraper missing content	inconsistent markup	Selector fallback & multi-pass parsing
CORS blocking frontend	API rejected requests	Configured Laravel CORS middleware
Render wiping DB	Ephemeral FS issue	Moved to container SQLite path
🧠 Phase-2 Scope Status (Assignment Requirement)
Requirement	Status
Fetch latest article	✔ Done
Google search for competitors	❌ (Skipped - would need paid API & scraping risk)
Scrape 2 competitor articles	❌ (Prepped infra, not executed)
Call LLM API for enhancement	⚠️ Mocked (LLM-ready)
Save enhanced version	✔ Done
Cite reference links	❌ (LLM step pending)

📌 Summary:
➡️ Architecture + pipeline ready.
➡️ LLM and Google step intentionally skipped to avoid cost / TOS issues.
➡️ This is acceptable as per assignment’s “partial OK” rule.

🧱 Repo Structure
beyondchats-assignment/
├── backend/           # Laravel API
├── frontend/          # React + Vite UI
├── scraper/           # Scraper + AI pipeline
├── readmeassert/      # Architecture diagram
└── README.md

🚀 Future Enhancements

Plug real GPT / Claude / DeepSeek

Add cron jobs / queue workers

Retry & backoff logic for scraping

Article versioning → history of enhancements

PostgreSQL migration

👋 Author

Bharath Raj
Full-stack engineer → end-to-end ownership, debugging real systems, shipping to production.

💼 GitHub: https://github.com/barathraj048

🧠 LinkedIn: pending update with case study