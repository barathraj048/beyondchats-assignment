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

## Future Enhancements (Intentionally Scoped Out)

The following enhancements were deliberately kept out of scope for this assignment to maintain focus on system design, data flow, and reliability within the given time constraints. The current architecture fully supports adding these features with minimal changes.

- **LLM Integration (DeepSeek / GPT / Claude)**  
  The AI enhancement pipeline is intentionally LLM-agnostic. A mock enhancer is used to demonstrate the full workflow. Replacing it with a real LLM requires only swapping the enhancement function and providing API credentials.

- **Retry & Fault Tolerance**  
  Production-grade retry logic (exponential backoff, partial failures, dead-letter handling) can be added to the Node.js pipeline for large-scale scraping and enhancement jobs.

- **Deployment & Scheduling**  
  The system is designed to be deployable as independent services (Laravel API, Node worker, React frontend). A cron job or queue worker (BullMQ / Laravel Queues) can be added to automate enhancements.

- **Article Versioning**  
  Currently, each article stores one enhanced version. This can be extended to support multiple enhancement versions with a separate versions table.

- **Improved Content Extraction**  
  Content parsing currently prioritizes reliability over perfection. A DOM-aware parser or readability-based extraction can be added for cleaner article bodies.


## Notes

The assignment said partial completion was fine, so I focused on getting the core architecture right and making sure everything works end-to-end. The AI enhancement is currently mocked but the pipeline is ready to plug in a real model.

---

Built by Bharath
