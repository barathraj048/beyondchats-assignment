# BeyondChats Assignment

![Architecture](readmeassert/architecture.png)

Full-stack app that scrapes blog articles, enhances them with AI, and shows both versions in a clean interface.

## What it does

Scrapes articles from BeyondChats blog, runs them through an AI enhancement pipeline, and lets you compare the original vs enhanced content. Built with separate services because that's how you'd do it in production.

## System architecture

```
Scraper (Node.js) → Backend API (Laravel) → SQLite Database
                                      ↑
                                AI Enhancer (Node.js)
                                      ↑
                              Frontend (React)
```

The scraper pulls articles and sends them to the backend. AI pipeline grabs unprocessed articles, enhances them, and updates the database. Frontend just reads from the API and displays everything.

## Tech stack

- Laravel - backend API and persistence
- React + TypeScript - frontend
- Node.js - scraping and AI processing
- SQLite - database (simple enough for this)
- Tailwind CSS - styling

## Running locally

**Backend:**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
Runs at `http://127.0.0.1:8000`

**Scraper:**
```bash
cd scraper
npm install
node scraper.js
```
Pulls the latest 5 articles and saves them with full HTML content.

**AI Pipeline:**
```bash
node aiEnhancer.js
```
Enhances all articles without `updated_content`. Using mock AI right now but the structure is ready for DeepSeek or GPT.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

## Project structure

```
.
├── backend/           # Laravel API
├── scraper/          # Node.js scraper + AI enhancer
├── frontend/         # React app
├── readmeassert/
│   └── architecture.png
└── README.md
```

## API endpoints

- `GET /api/articles` - get all articles
- `POST /api/articles` - create article (scraper uses this)
- `PUT /api/articles/{id}/enhance` - update enhanced content
- `GET /api/articles/count` - count scraped articles
- `GET /api/articles/exists?title=...` - check for duplicates

## Database schema

**articles table:**
- id
- title
- content (original HTML)
- updated_content (AI-enhanced HTML)
- source
- timestamps

## Design decisions

**Separate scraper and AI pipeline**  
Heavy processing shouldn't block your API. These can fail, scale, and deploy independently.

**HTML content storage**  
Keeps headings, lists, and formatting intact. Better for display and AI processing.

**Laravel backend**  
Clean migrations, validation, and API structure out of the box.

**React frontend**  
Good for data display, easy to extend.

**SQLite for now**  
Keeps development simple. Would use PostgreSQL in production.

## What's left to do

- Hook up real AI (DeepSeek or GPT)
- Add proper retry logic and error handling
- Deploy it somewhere
- Maybe add article versioning
- Better content parsing

## Notes

The assignment said partial completion was fine, so I focused on getting the core architecture right and making sure everything works end-to-end. The AI enhancement is currently mocked but the pipeline is ready to plug in a real model.

---

Built by Bharath