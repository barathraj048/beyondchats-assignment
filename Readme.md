BeyondChats Assignment
A full-stack application that scrapes blog articles, enhances them using AI, and displays them in a clean interface.
What it does
The app scrapes articles from the BeyondChats blog, runs them through an AI enhancement pipeline, and lets you view both versions side-by-side. I built it with separate services because that's how I'd actually build this in production.
How it works
Scraper (Node.js) → Backend API (Laravel) → Database (SQLite) ← Frontend (React)
The scraper pulls articles and sends them to the backend. The AI pipeline grabs unprocessed articles, enhances them, and updates the database. The frontend just reads from the API and shows everything.
Tech used

Laravel for the backend API
React + TypeScript for the frontend
Node.js for scraping and AI processing
SQLite because it's simple and works
Tailwind for styling

Running it locally
Backend:
bashcd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
Runs on http://127.0.0.1:8000
Scraper:
bashcd scraper
npm install
node scraper.js
This pulls the latest articles and saves them.
AI Pipeline:
bashnode aiEnhancer.js
Enhances all articles that haven't been processed yet. Right now it's using mock AI logic but the structure is there to plug in GPT or DeepSeek.
Frontend:
bashcd frontend
npm install
npm run dev
Runs on http://localhost:5173
Project structure
.
├── backend/        # Laravel API
├── scraper/        # Node.js scraper + AI pipeline
├── frontend/       # React app
└── README.md
API endpoints

GET /api/articles - get all articles
POST /api/articles - create article (scraper uses this)
PUT /api/articles/{id} - update enhanced content

Database schema
Articles table:

id
title
content (original)
updated_content (AI-enhanced)
source
timestamps

Why I built it this way
I separated the scraper and AI pipeline from the backend because in real projects you don't want heavy processing blocking your API. The scraper can run independently, fail independently, and scale independently.
I used Laravel because it handles database stuff cleanly and the API layer is straightforward. React for the frontend because it's what I know best and works well for this kind of data display.
SQLite keeps things simple for development. In production I'd probably use PostgreSQL.
What's next

Hook up real AI (DeepSeek or GPT)
Add proper error handling and logging
Deploy it somewhere
Maybe add article versioning
Better content parsing (the scraper is pretty basic right now)